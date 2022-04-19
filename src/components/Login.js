import React from 'react'
import { useState } from 'react';

export const Login = () => {
  const [user, setUser] = useState(null);
  const [pass, setPass] = useState(null);  
  
  const cogerUser = (e) =>setUser(e.target.value);
  const cogerPass = (e) =>setPass(e.target.value);

  const login = () =>{

    fetch ("http://localhost:8080/user/login",{
        method: "POST",
        headers:{
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams ({
          "username": user,
          "password": pass,
        })

      }).then((respuesta) => respuesta.json())
      .then(data => {
        if(data != null)console.log(data)
      })
      .catch("usuario no encontrado")

              // if(respuesta.status===200){
        //   console.log("Te has logeado correctamente")
      
        // }
        // else{
        //   console.log("Usuario no encontrado")
          
        // }
    }
   
  return (
    <>
     {/* <form onSubmit={login}> */}
      <p>
        Usuario
        <input type="text" name="username" placeholder="usuario" onChange={cogerUser}></input>
      </p>
      <p>
        Contraseña<input type="password" name="password" placeholder="contraseña" onChange={cogerPass}></input>
      </p>
      <button onClick={login}>Login</button>
      {/* </form> */}
    </>
  )
}
