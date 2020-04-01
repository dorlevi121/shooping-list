import { authReducer } from "./auth/auth.reducer";
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';
import { combineReducers } from "redux";
import { listReducer } from "./list/list.reducer";
import { historyListReducer } from "./history-list/history.reducer";

export const rootReducer = combineReducers({
    auth:  authReducer,
    list: listReducer,
    historyList: historyListReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})