import { LOGIN, LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCES } from "../Types/types";

export const login = async (usuario) => (dispatch) => {
    dispatch(doLoginRequest())
    try {
        //llamada fetch
        const respuestaFetch= {
            n:'nombre',
            p:'pass'
        }
        dispatch(doLoginSucces(respuestaFetch))
    } catch (error) {
        dispatch(doLoginFailed("error de login"))
    }
};

export const doLoginRequest = () => {
  return { type: LOGIN_REQUEST };
};

export const doLoginSucces = (payload) => {
    return { type: LOGIN_SUCCES,
    payload };
  };

  export const doLoginFailed = (payload) => {
    return { type: LOGIN_FAILED,
    payload };
  };
  


