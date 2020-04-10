import { cloneDeep } from "lodash";
import { Ingredient } from "../../models/system/ingredient.modal";

export const initialIngredients = () => {
    return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
        const firestore = getFirestore();

        firestore.collection(`ingredients`).doc('ingredients').get().then((doc: any) => { //get Ingredient
            const ingredients = doc.data();
            // const dicc: { [title: string]: Ingredient } = {}
            // let dic: { [title: string]: Ingredient } =
            //     Object.assign(Object.keys(ingredients).map((i: string) =>{
            //         if( i !== "__proto__")
            //         {dicc[i] = {
            //             titleHeb: ingredients[i].titleHeb,
            //             titleEng: ingredients[i].titleEng === undefined ? "" : ingredients[i].titleEng,
            //             type: ingredients[i].type,
            //             unit: ingredients[i].unit === undefined ? "" : ingredients[i].unit,
            //             brands: ingredients[i].brands === undefined ? [] : cloneDeep(ingredients[i].brands),
            //             icon: ingredients[i].icon === undefined ? "" : ingredients[i].icon
            //         }}
            //         return ({
            //             [i]: {
            //                 titleHeb: ingredients[i].titleHeb,
            //                 titleEng: ingredients[i].titleEng === undefined ? "" : ingredients[i].titleEng,
            //                 type: ingredients[i].type,
            //                 unit: ingredients[i].unit === undefined ? "" : ingredients[i].unit,
            //                 brands: ingredients[i].brands === undefined ? [] : cloneDeep(ingredients[i].brands),
            //                 icon: ingredients[i].icon === undefined ? "" : ingredients[i].icon
            //             }
            //         })
            //     }
            //     ));
            //     console.log( ingredients);

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