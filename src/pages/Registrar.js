import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerAction,
} from "../Redux/Actions/registerAction";

export const Registrar = () => {
  //datos del registro
  const [user, setUser] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    passwordRepeated: "",
  });

  //recibir parametros en los campos
  const onChange = ({ target }) => {
    const { value, name } = target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  //redux
  const dispatch = useDispatch();
  const datosRegistro = useSelector((state) => state.registerReducer);

  const formulario = () => {
    if (
      user.surname.length === 0 ||
      user.name.length === 0 ||
      user.email.length === 0 ||
      user.password.length === 0 ||
      user.username.length === 0
    ) {
      console.log("los campos no pueden estar vacios")
      return
    }
    if(user.password !== user.passwordRepeated){
     console.log("las contraseñas no son iguales")
     return
    }
    dispatch(registerAction(user));
  };

  //dependiendo de el estado de la peticion de registro se pondra un texto u otro
  const estadoRegistro = () => {
    if (datosRegistro.hasRegistered) {
      return <p>Usuario registrado correctamente</p>;
    } else if (datosRegistro.error != null) {
      return <p>Error al intentar registrarse, intentelo de nuevo</p>;
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
            onChange={onChange}
            value={user.username}
          ></input>
        </p>
        <p>
          nombre
          <input
            type="text"
            name="name"
            placeholder="su nombre"
            onChange={onChange}
            value={user.name}
          ></input>
        </p>
        <p>
          apellido
          <input
            type="text"
            name="surname"
            placeholder="su apellido"
            onChange={onChange}
            value={user.surname}
          ></input>
        </p>
        <p>
          email
          <input
            type="text"
            name="email"
            placeholder="ponga su email"
            onChange={onChange}
            value={user.email}
          ></input>
        </p>
        <p>
          contraseña
          <input
            type="password"
            name="password"
            placeholder="una contraseña segura"
            onChange={onChange}
            value={user.password}
          ></input>
        </p>
        <p>
          repita contraseña
          <input
            type="password"
            name="passwordRepeated"
            placeholder="repita su contraseña"
            onChange={onChange}
            value={user.passwordRepeated}
          ></input>
        </p>
      </form>
      <button onClick={formulario}>Registrarse</button>
      {estadoRegistro()}
    </>
  );
};
