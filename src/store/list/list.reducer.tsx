import {
  newProductActionType,
  productErrorActionType,
  ListActionsEnum,
  changeProductActionType
} from "./list.types";
import { initialListState } from "./list.state";
import { cloneDeep } from "lodash";

type allListActionTypes =
  | newProductActionType
  | productErrorActionType
  | changeProductActionType

export const listReducer = (
  state = initialListState,
  action: allListActionTypes
) => {
  switch (action.type) {
    case ListActionsEnum.NEW_PRODUCT:
      console.log("new product");
      return {
        ...state,
        allProducts: cloneDeep(action.allProducts)
      };
    case ListActionsEnum.CHANGE_PRODUCT:
      console.log("product change");
      return {
        ...state,
        allProducts: cloneDeep(action.allProducts)
      };
    case ListActionsEnum.PRODUCT_ERROR:
      console.log("error");
      return state;
  }
  return state;
};
