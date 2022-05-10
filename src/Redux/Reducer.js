import {combineReducers} from 'redux';
import loginReducer from './Reducers/loginReducer';
import registerReducer from './Reducers/registerReducer';
import crudReducer from './Reducers/crudReducer'

export default combineReducers({
    //metemos todos los reducers aqui
    loginReducer,
    registerReducer,
    crudReducer,
});