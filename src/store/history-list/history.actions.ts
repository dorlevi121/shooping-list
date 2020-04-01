import { cloneDeep } from "lodash";
import { List } from "../../models/system/list.model";

export const addNewListToHistory = (newHistoryList: List []) => {
        return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
            const firestore = getFirestore();
            const authId = getState().firebase.auth.uid;

            firestore.doc(`users/${authId}`).get().then((doc: any) => { //get user
                firestore.doc(`users/${authId}`).update({ historyList: newHistoryList });//edit
                dispatch({ type: 'ADD_LIST', historyList: cloneDeep(newHistoryList) });
            }).catch((error: Error) => {
                dispatch({ type: 'HISTORY_ERROR', error });
            })
        }
}