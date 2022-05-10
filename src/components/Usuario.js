import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showAllProducts,
  showByNameProducts,
  showStockProducts,
} from "../Redux/Actions/crudAction";

export const Usuario = () => {
  const [datos, setDatos] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const cogerBusqueda = (e) => setBusqueda(e.target.value);
  const dispatch = useDispatch();
  const selectorDatos = useSelector((state) => state.crudReducer);
  //cuando cambien los datos en el store.data, cambiaremos el state datos
  useEffect(() => {
    setDatos(selectorDatos.data)
  },[selectorDatos.data]);

  //pulsar el boton para mostrar todo y ocultar el resto
  const botonTodo = () => {
    dispatch(showAllProducts());
    todosProductos();
  };
  //mostrar solo stock disponible
  const botonDisponibles = () => {
    dispatch(showStockProducts());
    stockProductos();
  };
  //mostrar busqueda por nombre
  const botonBusqueda = () => {
    dispatch(showByNameProducts(busqueda));
    productosBuscados();
  };
  //pintar productos buscados por nombre
  const productosBuscados = () => {
    //si busqueda tiene datos y mostrar busqueda ha recibido fetch
    if (selectorDatos.showByName ===true) {
      return datos.map(({ id, name, stock, price, description }) => {
        return (
          <li key={id}>
            <p>id: {id}</p>
            <p>nombre:{name} </p>
            <p>stock: {stock}</p>
            <p>precio: {price}</p>
            <p>descripción: {description}</p>
          </li>
        );
      });
    }
  };
  //pintar todos los productos 
  const todosProductos = () => {
    //si los datos no estan vacios mapeamos
    if (selectorDatos.showAll === true) {
      return datos.map(({ id, name, stock, price, description }) => {
        //si queremos mostrar todo
        return (
          <li key={id}>
            <p>id: {id}</p>
            <p>nombre:{name} </p>
            <p>stock: {stock}</p>
            <p>precio: {price}</p>
            <p>descripción: {description}</p>
          </li>
        );
      });
    }
  };
  //solo queremos mostrar el stock disponible
  const stockProductos = () => {
    if (selectorDatos.showStock === true) {
      return datos.map(({ id, name, stock, price, description }) => {
        if (stock > 0)
          return (
            <li key={id}>
              <p>id: {id}</p>
              <p>nombre:{name} </p>
              <p>stock: {stock}</p>
              <p>precio: {price}</p>
              <p>descripción: {description}</p>
            </li>
          );
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
        {todosProductos()}
        {stockProductos()}
        {productosBuscados()}
      </div>
    </>
  );
};
