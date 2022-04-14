import React from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import { UsuarioLogeado } from './UsuarioLogeado'
import { Login } from './Login'
import { Registrar } from './Registrar'



export const Navegacion = () => {
  return (
    <>
    <header>
      <nav>
        <ul>
          <li><Link to="/">Iniciar Sesion</Link></li>
          <li><Link to="/Registrar">Registrarse</Link></li>
        </ul>
      </nav>
    </header>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/Registrar' element={<Registrar />}/>
        <Route path='/PanelUsuario' element={<UsuarioLogeado />}/>
      </Routes>
    </>
  )
}
