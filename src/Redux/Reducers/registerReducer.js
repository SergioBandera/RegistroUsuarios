import {
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCES,
} from "../Types/types";

const initialState = {
  //objeto datos usuario
  datosUsuario: null,
  error: null,
  hasRegistered: false,
  isLoadingRegister: false,
};
const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isLoadingRegister: true,
      };
    case REGISTER_SUCCES:
      return {
        ...state,
        datosUsuario: action.payload,
        hasRegistered: true,
        isLoadingRegister: false,
      };

    case REGISTER_FAILED:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default registerReducer;
