import React from 'react'
import { Admin } from '../components/Admin'
import { Usuario } from '../components/Usuario'

export const UsuarioLogeado = () => {
  const localUser = JSON.parse(sessionStorage.getItem("datosUsuario"));

  const mostrar =()=>{
      if (localUser != null){
      if(localUser.role === 'USER') {
        return <Usuario />
      }
      else if (localUser.role === 'ADMIN'){
        return <Admin />
      } 
    }
      else return <p>No hay datos</p>
  }

  return (
    <>
    <h2>Bienvenido {localUser.username}</h2>
    <div className='container'>
    {mostrar()}
    </div>   
    </>
  )
}
