import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Registrar = () => {
  const panelUsuario = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [apellido, setApellido] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);

  const cogerUsuario = (e) => setUsuario(e.target.value);
  const cogerNombre = (e) => setNombre (e.target.value);
  const cogerApellido = (e) => setApellido(e.target.value);
  const cogerEmail = (e) => setEmail(e.target.value);
  const cogerPassword = (e) => setPassword (e.target.value);
  const cogerPassword2 = (e) => setPassword2 (e.target.value);


  const registrarse = () => {
    if (password != password2 ){
      console.log("contraseña incorrecta")
    }else if(usuario == null || nombre == null ||apellido == null ||
       email == null || password == null || password2 == null){
        console.log("los campos no pueden estar vacios")
    }
    else{
      fetch ("http://localhost:8080/user/signup",{
        method: "POST",
        headers:{
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams ({
          "username": usuario,
          "name": nombre,
          "surname": apellido,
          "email": email,
          "password": password,
          "passwordRepeated": password2
        })

      }).then(respuesta => console.log(respuesta))
      .catch(function (err){
        console.log(err);
      })
    }
  };

  return (
    <>
      <h2>Datos de usuario</h2>
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
          <input type="text" 
          placeholder="su nombre"
          onChange={cogerNombre}
          ></input>
        </p>
        <p>
          apellido
          <input type="text" 
          placeholder="su apellido"
          onChange={cogerApellido}
          ></input>
        </p>
        <p>
          email
          <input type="text" 
          placeholder="ponga su email"
          onChange={cogerEmail}
          ></input>
        </p>
        <p>
          contraseña
          <input type="password" 
          placeholder="una contraseña segura"
          onChange={cogerPassword}
          ></input>
          repita contraseña
          <input type="password" 
          placeholder="repita su contraseña"
          onChange={cogerPassword2}
          ></input>
        </p>
        <button onClick={registrarse}>Registrarse</button>
  
    </>
  );
};
