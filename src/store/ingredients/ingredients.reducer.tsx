import { initialIngredientsState } from "./ingredients.state";
import {
  addIngredientActionType,
  IngredientsActionsEnum,
  initialIngredientsActionType,
  ingredientsErrorActionType,
} from "./ingredients.types";
import {cloneDeep} from "lodash";
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
      const allIng:  { [title: string]: Ingredient } = cloneDeep(state.ingredients);
      allIng[action.ingredient.titleHeb] = cloneDeep(action.ingredient);

      return { ...state, ingredients: cloneDeep(allIng) };

    case IngredientsActionsEnum.INITIAL_INGREDIENTS:      
      return {
        ...state,
        ingredients: cloneDeep(action.ingredients),
      };

    case IngredientsActionsEnum.INGREDIENTS_ERROR:
      console.log(action.error);
      return state;
  }
  return state;
};
