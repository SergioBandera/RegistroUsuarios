import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCES } from "../Types/types";

const initialState = {
  user: null,
  role: null,
  error: null,
  isLoading: false,
  isLoggedIn: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCES:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload.user,
        role: action.payload.role,
      };

    case LOGIN_FAILED:
      return { ...state, 
        isLoading: false, 
        error: action.payload 
      };
    default:
      return state;
  }
};
export default loginReducer;
