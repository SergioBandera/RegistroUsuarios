import React, { useEffect, useState } from "react";

export const Admin = () => {
  const [datos, setDatos] = useState([]);
  const [anadir, setAnadir] = useState(false);
  const [nombreProducto, setNombreProducto] = useState(null);
  const [stockProducto, setStockProducto] = useState(null);
  const [priceProducto, setPriceProducto] = useState(null);
  const [idProducto, setIdProducto] = useState(null);
  const [descriptionProducto, setDescriptionProducto] = useState(null);
  const [editar, setEditar] = useState(false);

  // const cogerId = (e) => setId(e.target.value);
  const cogerName = (e) => setNombreProducto(e.target.value);
  const cogerStock = (e) => setStockProducto(e.target.value);
  const cogerPrice = (e) => setPriceProducto(e.target.value);
  const cogerDescription = (e) => setDescriptionProducto(e.target.value);

  useEffect(() => {
    peticion();
  }, [idProducto]);

  // botones
  const bProducto = () => {
    setAnadir(!anadir);
    nuevoProducto();
  };

  const bEditarProducto = (id, name, stock, price, description) => {
    setEditar(!editar);
    editarProducto(id, name, stock, price, description);
  };

  const nuevoProducto = () => {
    if (anadir) {
      return (
        <div>
          <input type="text" placeholder="name" onChange={cogerName} />
          <input type="text" placeholder="stock" onChange={cogerStock} />
          <input type="text" placeholder="price" onChange={cogerPrice} />
          <input
            type="text"
            placeholder="description"
            onChange={cogerDescription}
          />
          <button onClick={guardarProducto}>Guardar producto</button>
        </div>
      );
    }
  };

  const borrarProducto = (id) => {
    peticionBorrar(id);
  };
  //editar producto

  const editarProducto = (id, name, stock, price, description) => {
   
      if (id !== undefined) {
        setIdProducto(id);
        setNombreProducto(name);
        setStockProducto(stock);
        setPriceProducto(price);
        setDescriptionProducto(description);
        
      }
      if(editar){
        return (
          <div>
        <p>Id del producto: {idProducto}</p>
        <p>Nuevo nombre del producto:</p>
        <input type="text" placeholder={nombreProducto} onChange={cogerName} />
        <p>Nuevo stock: </p>
        <input type="text" placeholder={stockProducto} onChange={cogerStock}/>
        <p>Nuevo precio</p>
        <input type="text" placeholder={priceProducto} onChange={cogerPrice}/>
        <p>Nueva descripción</p>
        <input type="text" placeholder={descriptionProducto} onChange={cogerDescription}/>
        <button onClick={() => peticionEditar()}>Guardar producto</button>
      </div>
    );
    }
  };
  //peticiones
  const peticion = async () => {
    const llamada = await fetch("http://localhost:8080/product/list");
    const respuesta = await llamada.json();
    setDatos(respuesta);
  };
  const guardarProducto = async () => {
    const llamada = await fetch(
      `http://localhost:8080/product/add?name=${nombreProducto}&stock=${stockProducto}&price=${priceProducto}&description=${descriptionProducto}`
    );
    console.log(llamada);
  };
  const peticionEditar = async () => {
    await fetch(
      `http://localhost:8080/product/modify?id=${idProducto}&name=${nombreProducto}&stock=${stockProducto}&price=${priceProducto}&description=${descriptionProducto}`
    );
    console.log("Producto editado");
  };
  const peticionBorrar = async (id) => {
    await fetch(`http://localhost:8080/product/remove?id=${id}`);
    console.log("Producto borrado");
  };
  // mostrar lista productos
  const productos = () => {
    return datos.map(({ id, name, stock, price, description }) => {
      return (
        <li key={id}>
          <p>id: {id}</p>
          <p>nombre:{name} </p>
          <p>stock: {stock}</p>
          <p>precio: {price}</p>
          <p>descripción: {description}</p>
          <button onClick={() => borrarProducto(id)}>Borrar</button>
          <button
            onClick={() => bEditarProducto(id, name, stock, price, description)}
          >
            Editar
          </button>
        </li>
      );
    });
  };

  return (
    <>
      <button onClick={bProducto}>Añadir nuevo producto</button>
      <div>{nuevoProducto()}</div>
      {editarProducto()}
      <div>{productos()}</div>
    </>
  );
};
