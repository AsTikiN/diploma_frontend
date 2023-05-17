import { ActionType } from "./saunterReducerTypes";
import { ActionsTypes } from "../actions/ActionsTypes";
import { Rights, Saunter } from "../../types";

interface initalState {
  rigths: Rights;
}

const inital: initalState = {
  rigths: "passanger",
};

export const authReducer = (state = inital, action: ActionType) => {
  switch (action.type) {
    case ActionsTypes.SET_RIGHTS: {
      return { ...state, rigths: action.payload };
    }
    default:
      return state;
  }
};

export const getRights = (state: any) => state.authReducer.rigths;
