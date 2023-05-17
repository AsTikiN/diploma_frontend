import { combineReducers } from "redux";
import { saunterReducer } from "./saunterReducer";
import { authReducer } from "./authReducer";

export const reducers = combineReducers({
  saunterReducer,
  authReducer,
});
