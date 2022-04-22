import React, { useState, useEffect } from "react";

export const Registrar = () => {
  const [usuario, setUsuario] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [apellido, setApellido] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [datos, setDatos] = useState(null);
  const [estado, setEstado] = useState(null);

  useEffect(() => {
    if (datos) {
      llamada();
    }
  }, [datos]);

  const cogerUsuario = (e) => setUsuario(e.target.value);
  const cogerNombre = (e) => setNombre(e.target.value);
  const cogerApellido = (e) => setApellido(e.target.value);
  const cogerEmail = (e) => setEmail(e.target.value);
  const cogerPassword = (e) => setPassword(e.target.value);
  const cogerPassword2 = (e) => setPassword2(e.target.value);

  const llamada = async () => {
    if (password !== password2) {
      console.log("las contraseñas no coinciden");
    } else if (
      usuario == null ||
      nombre == null ||
      apellido == null ||
      email == null ||
      password == null ||
      password2 == null
    ) {
      console.log("los campos no pueden estar vacios");
    } else {
      try {
        const peticion = await fetch("http://localhost:8080/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: new URLSearchParams(datos),
        });

        setEstado(peticion.status);
      } catch (err) {
        console.log("error en el fetch");
        setEstado(1);
      }
    }
  };
  const registrarse = () => {
    setDatos({
      username: usuario,
      name: nombre,
      surname: apellido,
      email: email,
      password: password,
      passwordRepeated: password2,
    });
  };
  const estadoRegistro = () => {
    if (estado != null) {
      if (estado === 200) return <p>Usuario creado correctamente</p>;
      else return <p>Error al crear el usuario</p>;
    }
  };

  return (
    <>
      <h2>Datos de usuario</h2>
      <form>
        <p>
          usuario
          <input
            type="text"
            name="username"
            placeholder=" nombre de usuario"
            onChange={cogerUsuario}
          ></input>
        </p>
        <p>
          nombre
          <input
            type="text"
            placeholder="su nombre"
            onChange={cogerNombre}
          ></input>
        </p>
        <p>
          apellido
          <input
            type="text"
            placeholder="su apellido"
            onChange={cogerApellido}
          ></input>
        </p>
        <p>
          email
          <input
            type="text"
            placeholder="ponga su email"
            onChange={cogerEmail}
          ></input>
        </p>
        <p>
          contraseña
          <input
            type="password"
            placeholder="una contraseña segura"
            onChange={cogerPassword}
          ></input>
        </p>
        <p>
          repita contraseña
          <input
            type="password"
            placeholder="repita su contraseña"
            onChange={cogerPassword2}
          ></input>
        </p>
      </form>
      <button onClick={registrarse}>Registrarse</button>
      {estadoRegistro()}
    </>
  );
};
