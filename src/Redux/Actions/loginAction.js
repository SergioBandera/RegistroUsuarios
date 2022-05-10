import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCES } from "../Types/types";

export const loginAction = (user, pass) => async (dispatch) => {
  dispatch(doLoginRequest());
  try {
    const resp = await fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: new URLSearchParams({
        username: user,
        password: pass,
      }),
    });

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
