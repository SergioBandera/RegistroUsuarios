import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCES } from "../Types/types";
import * as LoginService from "../../services/AuthService";

export const loginAction = (user, pass) => async (dispatch) => {
  dispatch(doLoginRequest());
  try {
    const data = {
      username: user,
      password: pass,
    };
    const resp = await LoginService.login(data);

    const datos = await resp.json();

    dispatch(doLoginSucces(datos));
  } catch (error) {
    console.log(error.message);
    dispatch(doLoginFailed("error de login"));
  }
};

export const doLoginRequest = () => {
  return { type: LOGIN_REQUEST };
};

export const doLoginSucces = (payload) => {
  return {
    type: LOGIN_SUCCES,
    payload,
  };
};

export const doLoginFailed = (payload) => {
  return {
    type: LOGIN_FAILED,
    payload,
  };
};
