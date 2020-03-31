import { authReducer } from "./auth/auth.reducer";
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';
import { combineReducers } from "redux";
import { listReducer } from "./list/list.reducer";

export const rootReducer = combineReducers({
    auth:  authReducer,
    list: listReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})