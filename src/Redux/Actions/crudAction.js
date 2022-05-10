import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  READ_ALL_PRODUCTS,
  READ_BYNAME_PRODUCTS,
  READ_STOCK_PRODUCTS,
  UPDATE_PRODUCT,
} from "../Types/types";

//mostrar todos los productos
export const showAllProducts = () => async (dispatch) => {
  const peticion = await fetch("http://localhost:8080/product/list");
  const respuesta = await peticion.json();
  dispatch(doReadAllProducts(respuesta));
};
//mostrar los productos con stock
export const showStockProducts = () => async (dispatch) => {
  const peticion = await fetch("http://localhost:8080/product/list");
  const respuesta = await peticion.json();
  dispatch(doReadStockProducts(respuesta));
};
//buscar por nombre
export const showByNameProducts = (busqueda) => async (dispatch) => {
  const peticion = await fetch(
    `http://localhost:8080/product/search?text=${busqueda}`
  );
  const respuesta = await peticion.json();
  dispatch(doReadByNameProducts(respuesta));
};
//borrar producto
export const deleteProduct = (id) => async (dispatch) => {
  try {
    await fetch(`http://localhost:8080/product/remove?id=${id}`);
    dispatch(doDeleteProduct(id));
  } catch (error) {
    console.log(error);
  }
};
//añadir producto
export const addProduct =
  (datosProducto) =>
  async (dispatch) => {
    try {
      const {nombreProducto, stockProducto, priceProducto, descriptionProducto} = datosProducto
      await fetch(`http://localhost:8080/product/add?name=${nombreProducto}&stock=${stockProducto}&price=${priceProducto}&description=${descriptionProducto}`);
      dispatch(doAddProduct(datosProducto));
      dispatch(showAllProducts());
    } catch (error) {
      console.log(error);
    }
  };
  //editar producto
  export const updateProduct = (datosProducto) => async (dispatch) => {
    try {
    const {idProducto,nombreProducto, stockProducto, priceProducto, descriptionProducto} = datosProducto
    await fetch(`http://localhost:8080/product/modify?id=${idProducto}&name=${nombreProducto}&stock=${stockProducto}&price=${priceProducto}&description=${descriptionProducto}`);
    dispatch(doUpdateProduct(datosProducto));
    } catch (error) {
      console.log(error)
    }
  }

export const doAddProduct = (payload) => {
  return { type: ADD_PRODUCT,
  payload };
};

export const doDeleteProduct = (payload) => {
  return { type: DELETE_PRODUCT,
  payload };
};

export const doUpdateProduct = (payload) => {
  return { type: UPDATE_PRODUCT,
  payload };
};

export const doReadAllProducts = (payload) => {
  return {
    type: READ_ALL_PRODUCTS,
    payload,
  };
};

export const doReadStockProducts = (payload) => {
  return {
    type: READ_STOCK_PRODUCTS,
    payload,
  };
};

export const doReadByNameProducts = (payload) => {
  return { type: READ_BYNAME_PRODUCTS, payload };
};
