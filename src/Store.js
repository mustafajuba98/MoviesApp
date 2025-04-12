import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from "redux";
import CombineReducers from "./Redux/Reducers/CombinedReducxers";
const myStore = createStore(CombineReducers, composeWithDevTools());

export default myStore;
