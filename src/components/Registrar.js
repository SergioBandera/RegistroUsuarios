import React from "react";
import { useNavigate } from "react-router-dom";

export const Registrar = () => {

    const panelUsuario = useNavigate();
    
    const registarse = () =>{

        console.log("te has registrado!!!")
        panelUsuario("/PanelUsuario");
    }

  return (
    <>
      <h2>Datos de usuario</h2>
      <form onSubmit={registarse}>
      <p>
        usuario
        <input type="text" name="username" placeholder=" nombre de usuario"></input>
      </p>
      <p>
        nombre<input type="text" placeholder="su nombre"></input>
      </p>
      <p>
        apellido<input type="text" placeholder="su apellido"></input>
      </p>
      <p>
        email<input type="email" placeholder="ponga su email"></input>
      </p>
      <p>
        contraseña<input type="password" placeholder="una contraseña segura"></input>
      </p>
      <button type="submit">Registrarse</button>
      </form>
    </>
  );
};
