import React from 'react'
import { useState } from 'react';

export const Login = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState(null);  
  
  const cogerUser = (e) =>setUser(e.target.value);
  const cogerPass = (e) =>setPass(e.target.value);

  const login = () =>{
  
    console.log(user);

    }
   
  return (
    <>
     {/* <form onSubmit={login}> */}
      <p>
        Usuario
        <input type="text" name="username" placeholder="usuario" onChange={cogerUser}></input>
      </p>
      <p>
        Contraseña<input type="password" placeholder="contraseña"></input>
      </p>
      <button onClick={login}>Login</button>
      {/* </form> */}
    </>
  )
}
