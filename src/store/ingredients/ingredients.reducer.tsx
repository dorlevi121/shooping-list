import { initialIngredientsState } from "./ingredients.state";
import {
  addIngredientActionType,
  IngredientsActionsEnum,
  initialIngredientsActionType,
  ingredientsErrorActionType,
} from "./ingredients.types";

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
      console.log(action.ingredient);
      return { ...state };

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
