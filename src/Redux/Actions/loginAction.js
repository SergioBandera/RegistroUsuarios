import { LOGIN, LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCES } from "../Types/types";

export const loginAction =  (usuario) => (dispatch) => {
    dispatch(doLoginRequest())
    try {
      throw new Error("error")
      usuario = "Nuevo usuario";
        //llamada fetch
        // const respuestaFetch= {
        //     n:'nombre',
        //     p:'pass'
        // }
        dispatch(doLoginSucces(usuario))
    } catch (error) {
      console.log(error.message)
        dispatch(doLoginFailed("error de login"))
    }
};

export const doLoginRequest = () => {
  return { type: LOGIN_REQUEST };
};

export const doLoginSucces = (payload) => {
    return { 
    type: LOGIN_SUCCES,
    payload };
  };

  export const doLoginFailed = (payload) => {
    return { 
    type: LOGIN_FAILED,
    payload };
  };
  


