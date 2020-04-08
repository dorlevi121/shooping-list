import { initialIngredientsState } from "./ingredients.state";
import {
  addIngredientActionType,
  IngredientsActionsEnum,
  initialIngredientsActionType,
  ingredientsErrorActionType,
} from "./ingredients.types";
import deepClone from 'lodash';
import { Ingredient } from "../../models/system/ingredient.modal";

type AllActionType =
  | addIngredientActionType
  | initialIngredientsActionType
  | ingredientsErrorActionType;
export const ingredientsReducer = (
  state = initialIngredientsState,
  action: AllActionType
) => {
  switch (action.type) {
    case IngredientsActionsEnum.ADD_INGREDIENT:
      const allIng: any = deepClone(state.ingredients);
      allIng[action.ingredient.titleHeb] = action.ingredient;
      return { ...state, ingredients: deepClone(allIng) };

    case IngredientsActionsEnum.INITIAL_INGREDIENTS:
      console.log(action.ingredients);
      return {
        ...state,
        ingredients: action.ingredients,
      };

    case IngredientsActionsEnum.INGREDIENTS_ERROR:
      console.log(action.error);
      return state;
  }
  return state;
};
