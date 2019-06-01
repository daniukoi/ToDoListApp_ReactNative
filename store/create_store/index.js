import { createStore } from 'redux';
import reducers from '../reducers';
import {applyMiddleware} from 'redux';
import { middleware } from "../../navigation/main_navigation";
import thunk from "redux-thunk";

const store = createStore(reducers, applyMiddleware(middleware,thunk));

export default store;