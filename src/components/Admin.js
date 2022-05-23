import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  showAllProducts,
  updateProduct,
} from "../Redux/Actions/crudAction";
import "./usuarioLogeado.css";

export const Admin = () => {
  const [datos, setDatos] = useState(null);
  const [anadir, setAnadir] = useState(false);
  const [datosProducto, setDatosProducto] = useState({
    idProducto: "",
    nombreProducto: "",
    stockProducto: "",
    priceProducto: "",
    descriptionProducto: "",
  });

  const [editar, setEditar] = useState(false);

  const onChange = ({ target }) => {
    const { value, name } = target;
    setDatosProducto({
      ...datosProducto,
      [name]: value,
    });
  };
  const dispatch = useDispatch();
  const recogerDatos = useSelector((state) => state.crudReducer);
  //inicio los datos
  useEffect(() => {
    dispatch(showAllProducts());
  }, []);

  useEffect(() => {
    setDatos(recogerDatos.data);
  }, [recogerDatos.data]);

  // botones
  const bProducto = () => {
    setAnadir(!anadir);
    nuevoProducto();
  };
  //añadir producto
  const nuevoProducto = () => {
    if (anadir) {
      return (
        <div className="nuevo-producto">
          <input
            className="nNProducto"
            type="text"
            name="nombreProducto"
            placeholder="name"
            onChange={onChange}
            value={datosProducto.nombreProducto}
          />
          <input
            type="text"
            name="stockProducto"
            placeholder="stock"
            onChange={onChange}
            value={datosProducto.stockProducto}
          />
          <input
            type="text"
            name="priceProducto"
            placeholder="price"
            onChange={onChange}
            value={datosProducto.priceProducto}
          />
          <input
            type="text"
            name="descriptionProducto"
            placeholder="description"
            onChange={onChange}
            value={datosProducto.descriptionProducto}
          />
          <button onClick={() => dispatch(addProduct(datosProducto))}>
            Guardar producto
          </button>
        </div>
      );
    }
  };

  //editar producto
  const bEditarProducto = (p) => {
    setDatosProducto({
      idProducto: p.id,
      nombreProducto: p.name,
      stockProducto: p.stock,
      priceProducto: p.price,
      descriptionProducto: p.description,
    });
    setEditar(!editar);
  };

  const editarProducto = () => {
    const {
      idProducto,
      nombreProducto,
      stockProducto,
      priceProducto,
      descriptionProducto,
    } = datosProducto;
    if (editar) {
      return (
        <div>
          <p>Id del producto:{idProducto}</p>
          <p>Nuevo nombre del producto:</p>
          <input
            type="text"
            name="nombreProducto"
            placeholder={nombreProducto}
            onChange={onChange}
          />
          <p>Nuevo stock: </p>
          <input
            type="text"
            name="stockProducto"
            placeholder={stockProducto}
            onChange={onChange}
          />
          <p>Nuevo precio</p>
          <input
            type="text"
            name="priceProducto"
            placeholder={priceProducto}
            onChange={onChange}
          />
          <p>Nueva descripción</p>
          <input
            type="text"
            name="descriptionProducto"
            placeholder={descriptionProducto}
            onChange={onChange}
          />
          <button onClick={() => dispatch(updateProduct(datosProducto))}>
            Guardar producto
          </button>
        </div>
      );
    }
  };

  // mostrar lista productos
  const productos = () => {
    if (datos != null) {
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
            <div className="acciones-producto">
              <button
                className="button-borrar"
                onClick={() => dispatch(deleteProduct(id))}
              >
                Borrar
              </button>
              <button
                className="button-editar"
                onClick={() => {
                  bEditarProducto({ id, name, stock, price, description });

                  // bEditarProducto(id, name, stock, price, description)
                }}
              >
                Editar
              </button>
            </div>
          </li>
        );
      });
    }
  };

  return (
    <>
      <div className="div-new">
        <button className="button-new" onClick={bProducto}>
          Añadir nuevo producto
        </button>
      </div>
      <div>{nuevoProducto()}</div>
      {editarProducto()}
      {productos()}
    </>
  );
};
