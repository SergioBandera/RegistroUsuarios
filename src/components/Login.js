import React, { useContext } from "react";
import { useState } from "react";
import UserContext from "./context/UserContext";

export const Login = () => {
  const context = useContext(UserContext);

  const [user, setUser] = useState(null);
  const [pass, setPass] = useState(null);

  const cogerUser = (e) => setUser(e.target.value);
  const cogerPass = (e) => setPass(e.target.value);

  const llamada = async () => {
    const resp = await fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: new URLSearchParams({
        username: user,
        password: pass,
      }),
    });
    try {
      const datos = await resp.json();
      const { role } = datos;
      context.setRole(role);
      context.setIsLoggedIn(true);

      sessionStorage.setItem("datosUsuario", JSON.stringify(datos));
    } catch (err) {
      console.log("el usuario no existe");
    }
  };

  const login = () => {
    llamada();
  };

  return (
    <>
      {/* <form onSubmit={login}> */}
      <p>
        Usuario
        <input
          type="text"
          name="username"
          placeholder="usuario"
          onChange={cogerUser}
        ></input>
      </p>
      <p>
        Contraseña
        <input
          type="password"
          name="password"
          placeholder="contraseña"
          onChange={cogerPass}
        ></input>
      </p>
      <button onClick={login}>Login</button>
      {/* </form> */}
    </>
  );
};
