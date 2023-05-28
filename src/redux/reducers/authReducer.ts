import { ActionType } from "./saunterReducerTypes";
import { ActionsTypes } from "../actions/ActionsTypes";
import { Rights, Saunter } from "../../types";

interface initalState {
  rigths: Rights | null;
  isAuthorizated: boolean;
  id: number | null;
  loginData: any;
}

const inital: initalState = {
  rigths: "passanger",
  isAuthorizated: false,
  id: null,
  loginData: {
    email: "",
    password: "",
    avatar: "",
    name: "",
  },
};

export const authReducer = (state = inital, action: ActionType) => {
  console.log("action", action);
  switch (action.type) {
    case ActionsTypes.SET_RIGHTS: {
      return {
        ...state,
        rigths: action.payload.rights,
        id: action.payload._id,
        isAuthorizated: action.payload.isAuthorizated,
      };
    }
    case ActionsTypes.SET_USER_DATA: {
      return {
        ...state,
        loginData: {
          email: action.payload.email,
          password: action.payload.password,
          avatar: action.payload.avatar,
          name: action.payload.name,
        },
      };
    }
    default:
      return state;
  }
};

export const getRights = (state: any) => state.authReducer.rigths;
export const getIsAuthorized = (state: any) => state.authReducer.isAuthorizated;
export const getUserId = (state: any) => state.authReducer.id;
export const getLoginData = (state: any) => state.authReducer.loginData;
