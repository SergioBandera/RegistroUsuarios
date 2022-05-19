import {
  actualizarProducto,
  buscarPorNombre,
  cogerListaProductos,
  eliminarProducto,
  newProduct,
} from "../../services/CrudService";
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
  const listaProductos = await cogerListaProductos();
  dispatch(doReadAllProducts(listaProductos));
};
//mostrar los productos con stock
export const showStockProducts = () => async (dispatch) => {
  const listaProductos = await cogerListaProductos();
  dispatch(doReadStockProducts(listaProductos));
};
//buscar por nombre
export const showByNameProducts = (busqueda) => async (dispatch) => {
  const resultadoBusqueda = await buscarPorNombre(busqueda);
  dispatch(doReadByNameProducts(resultadoBusqueda));
};

//borrar producto
export const deleteProduct = (id) => (dispatch) => {
  try {
    eliminarProducto(id);
    dispatch(doDeleteProduct(id));
  } catch (error) {
    console.log(error);
  }
};

//añadir producto
export const addProduct = (datosProducto) => async (dispatch) => {
  try {
    newProduct(datosProducto);
    dispatch(doAddProduct());
    //volvemos a hacer la llamada a la lista, ya que no tenemos el id, hasta ver la base de datos
    dispatch(showAllProducts());
  } catch (error) {
    console.log(error);
  }
};

//editar producto
export const updateProduct = (datosProducto) => async (dispatch) => {
  try {
    actualizarProducto(datosProducto)
    dispatch(doUpdateProduct(datosProducto));
  } catch (error) {
    console.log(error);
  }
};

export const doAddProduct = () => {
  return { type: ADD_PRODUCT };
};

export const doDeleteProduct = (payload) => {
  return { type: DELETE_PRODUCT, payload };
};

export const doUpdateProduct = (payload) => {
  return { type: UPDATE_PRODUCT, payload };
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
