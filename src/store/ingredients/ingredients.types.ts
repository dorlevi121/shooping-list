import { Ingredient } from '../../models/system/ingredient.modal'

export interface IngredientsState {
    ingredients: { [title: string]: Ingredient }
}

export enum IngredientsActionsEnum {
    ADD_INGREDIENT = "ADD_INGREDIENT",
    INITIAL_INGREDIENTS = "INITIAL_INGREDIENTS",
    INGREDIENTS_ERROR = "INGREDIENTS_ERROR"
}

export interface IngredientsActionPattern {
    type: IngredientsActionsEnum; //Action Type
}

export interface addIngredientActionType extends IngredientsActionPattern {
    type: IngredientsActionsEnum.ADD_INGREDIENT;
    ingredient: Ingredient;
}

export interface initialIngredientsActionType extends IngredientsActionPattern {
    type: IngredientsActionsEnum.INITIAL_INGREDIENTS;
    ingredients: { [title: string]: Ingredient }
}

export interface ingredientsErrorActionType extends IngredientsActionPattern {
    type: IngredientsActionsEnum.INGREDIENTS_ERROR;
    error: Error
}