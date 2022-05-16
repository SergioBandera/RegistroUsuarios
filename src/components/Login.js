import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserContext from "../context/UserContext";
import { loginAction } from "../Redux/Actions/loginAction";

export const Login = () => {
  const context = useContext(UserContext);

  const [user, setUser] = useState(null);
  const [pass, setPass] = useState(null);

  const cogerUser = (e) => setUser(e.target.value);
  const cogerPass = (e) => setPass(e.target.value);

  const dispatch = useDispatch();
  const datosStorage = useSelector((state) => state.loginReducer);

  const login = (e) => {
    e.preventDefault();
    dispatch(loginAction(user, pass));
  };

  useEffect(() => {
    if (datosStorage.isLoggedIn === true) {
      sessionStorage.setItem("datosUsuario", JSON.stringify(datosStorage));
      context.setRole(datosStorage.role);
      context.setIsLoggedIn(true);
    }
  },[]);

  return (
    <form onSubmit={login}>
      <p>
        Usuario
        <input
          type='text'
          name='username'
          placeholder='usuario'
          onChange={cogerUser}
          data-testid='usernameInput'
        ></input>
      </p>
      <p>
        Contraseña
        <input
          type='password'
          name='password'
          placeholder='contraseña'
          onChange={cogerPass}
        ></input>
      </p>
      <button  data-testid='submitBtn' type='submit'>Login</button>
    </form>
  );
};
