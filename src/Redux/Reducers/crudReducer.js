import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  READ_ALL_PRODUCTS,
  READ_BYNAME_PRODUCTS,
  READ_STOCK_PRODUCTS,
  UPDATE_PRODUCT,
} from "../Types/types";

const initialState = {
  data:[],
  showAll:false,
  showStock: false,
  showByName: false,
  
}
const crudReducer = (state= initialState, action) => {
  switch (action.type) {
    
    case ADD_PRODUCT:
      return {
        ...state
      };

    case DELETE_PRODUCT:
      return ({
        ...state,
        data:state.data.filter( d=> d.id !== action.payload)
      });

    case UPDATE_PRODUCT:
      const index = state.data.findIndex(data => (data.id === action.payload.idProducto))
      return { 
        ...state,
        data:[...state.data.slice(0,index), 
           {
            id: action.payload.idProducto,
            name: action.payload.nombreProducto, 
            stock: action.payload.stockProducto,
            price: action.payload.priceProducto,
            description: action.payload.descriptionProducto
          },
           ...state.data.slice(index + 1)]
       };

    case READ_ALL_PRODUCTS:
      return{
        data:[...action.payload],
        showAll:true,
        showStock: false,
        showByName: false,
      };

    case READ_STOCK_PRODUCTS:
      return {
        data:[...action.payload],
        showAll:false,
        showStock: true,
        showByName: false,
      };

    case READ_BYNAME_PRODUCTS:
      return {
        data:[...action.payload],
        showAll:false,
        showStock: false,
        showByName: true,
      };

    default:
      return state;
  }
};
export default crudReducer;
