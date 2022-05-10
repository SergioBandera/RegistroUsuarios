import {
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCES,
} from "../Types/types";

export const registerAction = (registroUsuario) => async (dispatch) => {
  dispatch(doRegisterRequest());
  try {
    // console.log("hola desde el action" + username + name)
    await fetch("http://localhost:8080/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: new URLSearchParams(registroUsuario),
    });
    // if (peticion.status === 200) {
    const { username, name, surname, email } = registroUsuario;
    dispatch(doRegisterSucces({ username, name, surname, email }));
    console.log(`Te has registrado con los datos:
     nombre usuario: ${username},
     nombre: ${name},
     apellido: ${surname}
     email: ${email}`);
    // }
  } catch (error) {
    console.log(error.message);
    dispatch(doRegisterFailed("error en el registro"));
  }
};

export const doRegisterRequest = () => {
  return { type: REGISTER_REQUEST };
};
export const doRegisterSucces = (payload) => {
  return { type: REGISTER_SUCCES, payload };
};
export const doRegisterFailed = (payload) => {
  return { type: REGISTER_FAILED, payload };
};
