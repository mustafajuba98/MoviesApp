
import { combineReducers } from "redux";
import Favourite_Reducer from "./FavouriteSet_Reducer"; 

export default combineReducers({
  isfavourite: Favourite_Reducer,
});
