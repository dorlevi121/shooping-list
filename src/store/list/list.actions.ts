import { Product } from "../../models/system/product.model";
import {cloneDeep} from 'lodash';

export const initialProductsListFromServer = () => {
    return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
        const firestore = getFirestore();
        const authId = getState().firebase.auth.uid;

        firestore.doc(`users/${authId}`).get().then((doc: any) => { //get user
            const allProduct = doc.data().shoppingList;
            dispatch({ type: 'NEW_PRODUCT', allProducts: cloneDeep(allProduct) });
        }).catch((error: Error) => {
            dispatch({ type: 'PRODUCT_ERROR', error });
        })
    }
}

export const addNewProduct = (products: Product []) => {
    return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authId = getState().firebase.auth.uid;

        firestore.doc(`users/${authId}`).get().then((doc: any) => { //get user
            firestore.doc(`users/${authId}`).update({ shoppingList: products });//edit
            dispatch({ type: 'NEW_PRODUCT', allProducts: cloneDeep(products) });
        }).catch((error: Error) => {
            dispatch({ type: 'PRODUCT_ERROR', error });
        })
    }
}

export const changeProduct = (products: Product []) => {
    return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
        const firestore = getFirestore();
        const authId = getState().firebase.auth.uid;

        firestore.doc(`users/${authId}`).get().then((doc: any) => { //get user
            firestore.doc(`users/${authId}`).update({ shoppingList: products });//edit
            dispatch({ type: 'CHANGE_PRODUCT', allProducts: cloneDeep(products) });
        }).catch((error: Error) => {
            dispatch({ type: 'PRODUCT_ERROR', error });
        })
    }
}
