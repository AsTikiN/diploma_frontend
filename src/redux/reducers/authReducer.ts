import { ActionType } from "./saunterReducerTypes";
import { ActionsTypes } from "../actions/ActionsTypes";
import { Rights, Saunter } from "../../types";

interface initalState {
  rigths: Rights;
  isAuthorizated: boolean;
}

const inital: initalState = {
  rigths: "passanger",
  isAuthorizated: false,
};

export const authReducer = (state = inital, action: ActionType) => {
  switch (action.type) {
    case ActionsTypes.SET_RIGHTS: {
      return { ...state, rigths: action.payload, isAuthorizated: true };
    }
    default:
      return state;
  }
};

export const getRights = (state: any) => state.authReducer.rigths;
export const getIsAuthorized = (state: any) => state.authReducer.isAuthorizated;
