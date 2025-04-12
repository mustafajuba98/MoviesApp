
import { createStore, compose } from "redux";
import CombineReducers from "./Redux/Reducers/CombinedReducxers"; // Verify path

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const myStore = createStore(CombineReducers, composeEnhancers());

export default myStore;
