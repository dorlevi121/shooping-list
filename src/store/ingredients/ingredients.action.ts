import { Ingredient } from "../../models/system/ingredient.modal";

export const initialIngredients = () => {
    return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
        const firestore = getFirestore();

        firestore.collection(`ingredients`).doc('ingredients').get().then((doc: any) => { //get Ingredient
            const ingredients = doc.data();
            dispatch({ type: 'INITIAL_INGREDIENTS', ingredients: ingredients });
        }).catch((error: Error) => {
            dispatch({ type: 'INGREDIENTS_ERROR', error: error });
        })
    }
}

export const addIngredient = (newIngredient: Ingredient) => {
    return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
        const firestore = getFirestore();
        const ingKey = newIngredient.titleHeb
        firestore.collection(`ingredients`).doc('ingredients').update({ [ingKey]: newIngredient }).then(() => {
            dispatch({ type: 'ADD_INGREDIENT', ingredient: newIngredient })
        })
            .catch((error: Error) => {
                dispatch({ type: 'INGREDIENTS_ERROR', error: error });
            })
    }
}