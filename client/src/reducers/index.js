import { combineReducers } from "redux";
import { plantReducer } from "./plantReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  plantReducer,
  userReducer
})