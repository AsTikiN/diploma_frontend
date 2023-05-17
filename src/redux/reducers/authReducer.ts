import { ActionType } from "./saunterReducerTypes";
import { ActionsTypes } from "../actions/ActionsTypes";
import { Rights, Saunter } from "../../types";

interface initalState {
  rigths: Rights | null;
  isAuthorizated: boolean;
  id: number | null;
}

const inital: initalState = {
  rigths: "passanger",
  isAuthorizated: false,
  id: null,
};

export const authReducer = (state = inital, action: ActionType) => {
  switch (action.type) {
    case ActionsTypes.SET_RIGHTS: {
      return {
        ...state,
        rigths: action.payload.rights,
        id: action.payload._id,
        isAuthorizated: action.payload.isAuthorizated,
      };
    }
    default:
      return state;
  }
};

export const getRights = (state: any) => state.authReducer.rigths;
export const getIsAuthorized = (state: any) => state.authReducer.isAuthorizated;
export const getUserId = (state: any) => state.authReducer.id;
