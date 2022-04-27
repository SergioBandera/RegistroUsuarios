import React, { useEffect, useState } from "react";

export const Usuario = () => {
  const [datos, setDatos] = useState([]);
  const [mostrarTodo, setMostrarTodo] = useState(true);
  const [mostrarBusqueda, setMostrarBusqueda] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [datosBusqueda, setDatosBusqueda] = useState([]);

  const cogerBusqueda = (e) => setBusqueda(e.target.value);

  //peticion para lista completa
  const peticion = async () => {
    const llamada = await fetch("http://localhost:8080/product/list");
    const respuesta = await llamada.json();
    setDatos(respuesta);
  };
  //peticion por nombre
  const peticionPorNombre = async () => {
    try {
      const llamada = await fetch(
        `http://localhost:8080/product/search?text=${busqueda}`
      );
      const respuesta = await llamada.json();
      setDatosBusqueda(respuesta);
    } catch (err) {
      console.log(err);
    }
  };
  //pulsar el boton para mostrar todo y ocultar el resto
  const botonTodo = () => {
    setMostrarBusqueda(false);
    peticion();
    setMostrarTodo(true);
    productos();
  };
  //mostrar solo stock disponible
  const botonDisponibles = () => {
    setMostrarBusqueda(false);
    peticion();
    setMostrarTodo(false);
    productos();
  };
  //mostrar busqueda por nombre
  const botonBusqueda = () => {
    setMostrarBusqueda(true);
    peticionPorNombre();
  };

  const productosBuscados = () => {
    //si busqueda tiene datos y mostrar busqueda ha recibido fetch
    if (busqueda !== "") {
      if (mostrarBusqueda) {
        return datosBusqueda.map(({ id, name, stock, price, description }) => {
          return (
            <React.Fragment key={id}>
              <li>
                <p>id: {id}</p>
                <p>nombre:{name} </p>
                <p>stock: {stock}</p>
                <p>precio: {price}</p>
                <p>descripción: {description}</p>
              </li>
            </React.Fragment>
          );
        });
      }
    }
  };

  const productos = () => {
    //si los datos no estan vacios mapeamos
    if (datos !== null && mostrarBusqueda !== true) {
      return datos.map(({ id, name, stock, price, description }) => {
        //si queremos mostrar todo
        if (mostrarTodo === true) {
          return (
              <li key={id}>
                <p>id: {id}</p>
                <p>nombre:{name} </p>
                <p>stock: {stock}</p>
                <p>precio: {price}</p>
                <p>descripción: {description}</p>
              </li>
          
          );
        } else {
          //solo queremos mostrar el stock disponible
          if (stock > 0)
            return (
              <div key={id}>
                <li>
                  <p>id: {id}</p>
                  <p>nombre:{name} </p>
                  <p>stock: {stock}</p>
                  <p>precio: {price}</p>
                  <p>descripción: {description}</p>
                </li>
              </div>
            );
        }
      });
    }
  };

  return (
    <>
      <div className="container">
        <input
          type="text"
          placeholder="Buscar por nombre"
          onClick={productosBuscados}
          onChange={cogerBusqueda}
        />
        <button onClick={botonBusqueda}>Buscar</button>
        <button onClick={botonTodo}>Mostrar todos los productos</button>
        <button onClick={botonDisponibles}>Mostrar solo disponibles</button>
        <div className="lista-producto">{productos()}</div>
        <div>{productosBuscados()}</div>
      </div>
    </>
  );
};
