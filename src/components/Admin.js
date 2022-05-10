import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  showAllProducts,
  updateProduct,
} from "../Redux/Actions/crudAction";

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
  const selectorDatos = useSelector((state) => state.crudReducer);
  //inicio los datos
  useEffect(() => {
    dispatch(showAllProducts());
  }, []);

  useEffect(() => {
    setDatos(selectorDatos.data);
  }, [selectorDatos.data]);

  // botones
  const bProducto = () => {
    setAnadir(!anadir);
    nuevoProducto();
  };
  //añadir producto
  const nuevoProducto = () => {
    if (anadir) {
      return (
        <div>
          <input
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
          <button onClick={() => dispatch(updateProduct(datosProducto))}>Guardar producto</button>
        </div>
      );
    }
  };

  // mostrar lista productos
  const productos = () => {
    if (datos != null) {
      return datos.map(({ id, name, stock, price, description }) => {
        return (
          <li key={id}>
            <p>id: {id}</p>
            <p>nombre:{name} </p>
            <p>stock: {stock}</p>
            <p>precio: {price}</p>
            <p>descripción: {description}</p>
            <button onClick={() => dispatch(deleteProduct(id))}>Borrar</button>
            <button
              onClick={() => {
                bEditarProducto({ id, name, stock, price, description });

                // bEditarProducto(id, name, stock, price, description)
              }}
            >
              Editar
            </button>
          </li>
        );
      });
    }
  };

  return (
    <>
      <button onClick={bProducto}>Añadir nuevo producto</button>
      <div>{nuevoProducto()}</div>
      {editarProducto()}
      {productos()}
    </>
  );
};
