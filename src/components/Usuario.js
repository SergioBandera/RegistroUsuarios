import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showAllProducts,
  showByNameProducts,
  showStockProducts,
} from "../Redux/Actions/crudAction";
import "./usuarioLogeado.css";

export const Usuario = () => {
  const [datos, setDatos] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const cogerBusqueda = (e) => setBusqueda(e.target.value);
  const dispatch = useDispatch();
  const selectorDatos = useSelector((state) => state.crudReducer);
  //cuando cambien los datos en el store.data, cambiaremos el state datos
  useEffect(() => {
    setDatos(selectorDatos.data);
  }, [selectorDatos.data]);

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
    if (selectorDatos.showByName === true) {
      return datos.map(({ id, name, stock, price, description }) => {
        return (
          <li key={id} className="lista-productos">
            <p className="p-productos">id: {id}</p>
            <div className="div-producto">
              <p className="p-div-usuario">nombre: {name} </p>
              <p className="p-div-usuario">stock: {stock}</p>
              <p className="p-div-usuario">precio: {price}</p>
            </div>
            <p className="p-productos">descripción: {description}</p>
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
          <li key={id} className="lista-productos">
            <p className="p-productos">id: {id}</p>
            <div className="div-producto">
              <p className="p-div-usuario">nombre: {name} </p>
              <p className="p-div-usuario">stock: {stock}</p>
              <p className="p-div-usuario">precio: {price}</p>
            </div>
            <p className="p-productos">descripción: {description}</p>
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
            <li key={id} className="lista-productos">
              <p className="p-productos">id: {id}</p>
              <div className="div-producto">
                <p className="p-div-usuario">nombre: {name} </p>
                <p className="p-div-usuario">stock: {stock}</p>
                <p className="p-div-usuario">precio: {price}</p>
              </div>
              <p className="p-productos">descripción: {description}</p>
            </li>
          );
      });
    }
  };
  return (
    <div className="container">
      <div className="productos-usuario">
        <button onClick={botonTodo} className="button-usuario">
          Mostrar todos los productos
        </button>
        <button onClick={botonDisponibles} className="button-usuario">
          Mostrar solo disponibles
        </button>
      </div>
      <div className="buscar">
        <input
          className="input-usuario"
          type="text"
          placeholder="Buscar por nombre"
          onClick={productosBuscados}
          onChange={cogerBusqueda}
        />
        <button onClick={botonBusqueda} className="button-usuario">
          Buscar
        </button>
      </div>
      {todosProductos()}
      {stockProductos()}
      {productosBuscados()}
    </div>
  );
};
