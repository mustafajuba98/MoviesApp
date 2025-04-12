import { combineReducers } from "redux";
import Favourite_Reducer from "../Reducers/FavouriteSet_Reducer";


export default combineReducers({
  isfavourite: Favourite_Reducer,
});
