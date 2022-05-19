//mostrar lista productos
export const cogerListaProductos = async () => {
  const peticion = await fetch("http://localhost:8080/product/list");
  const respuesta = await peticion.json();
  return respuesta;
};
//busqueda por nombre
export const buscarPorNombre = async (busqueda) => {
  const peticion = await fetch(
    `http://localhost:8080/product/search?text=${busqueda}`
  );
  const respuesta = await peticion.json();
  return respuesta;
};
// eliminar producto
export const eliminarProducto = (id) => {
  fetch(`http://localhost:8080/product/remove?id=${id}`);
};

//añadir producto
export const newProduct = async (datosProducto) => {
  const { nombreProducto, stockProducto, priceProducto, descriptionProducto } =
    datosProducto;
  await fetch(
    `http://localhost:8080/product/add?name=${nombreProducto}&stock=${stockProducto}&price=${priceProducto}&description=${descriptionProducto}`
  );
};

//actualizar producto
export const actualizarProducto = async (datosProducto) => {
  const {
    idProducto,
    nombreProducto,
    stockProducto,
    priceProducto,
    descriptionProducto,
  } = datosProducto;
  await fetch(
    `http://localhost:8080/product/modify?id=${idProducto}&name=${nombreProducto}&stock=${stockProducto}&price=${priceProducto}&description=${descriptionProducto}`
  );
};
