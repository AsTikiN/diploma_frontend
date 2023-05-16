import { combineReducers } from "redux";
import { saunterReducer } from "./saunterReducer";

export const reducers = combineReducers({
  saunterReducer: saunterReducer,
});
