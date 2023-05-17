import { Rights, Saunter } from "../../types";

import { ActionsTypes } from "../actions/ActionsTypes";

export const addSaunter = (item: Saunter) => ({
  type: ActionsTypes.ADD_SAUNTER,
  payload: item,
});

export const removeSaunter = (id: number) => ({
  type: ActionsTypes.REMOVE_SAUNTER,
  payload: id,
});

export const addToFavorites = (id: number) => ({
  type: ActionsTypes.ADD_TO_FAVORITES_SAUNTER,
  payload: id,
});

export const selectSaunter = (id: number) => ({
  type: ActionsTypes.SELECT_SAUNTER,
  payload: id,
});

export const InitSaunterList = (list: Saunter[]) => ({
  type: ActionsTypes.INIT_SAUNTER_LIST,
  payload: list,
});

export const setRights = (rights: Rights) => ({
  type: ActionsTypes.SET_RIGHTS,
  payload: rights,
});
