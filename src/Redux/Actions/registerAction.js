import { registro } from "../../services/RegisterService";
import {
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCES,
} from "../Types/types";

export const registerAction = (registroUsuario) => async (dispatch) => {
  dispatch(doRegisterRequest());
  try {
    await registro(registroUsuario);
    const { username, name, surname, email } = registroUsuario;
    dispatch(doRegisterSucces({ username, name, surname, email }));
    console.log(`Te has registrado con los datos:
     nombre usuario: ${username},
     nombre: ${name},
     apellido: ${surname}
     email: ${email}`);
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
