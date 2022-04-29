import {applyMiddleware} from 'redux';
import { legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootreducer from './Reducer';


const initialstate={};

const middleware = [thunk];

const store = createStore(rootreducer,initialstate,composeWithDevTools(applyMiddleware(...middleware)))

export default store;