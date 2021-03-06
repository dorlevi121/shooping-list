import { User } from "../../models/system/user.model";

export const signIn = (credentials: { email: string, password: string }) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err: any) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });

  }
}

export const signOut = () => {
  return (dispatch: any, getState: any, { getFirebase }: any) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    });
  }
}

export const signUp = (newUser: User) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((resp: any) => {
      return firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        shoppingList: [],
        historyList: [],
        language: newUser.language,
        registrationDate: new Date()
      });
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' });
    }).catch((err: any) => {
      dispatch({ type: 'SIGNUP_ERROR', err });
    });
  }
}

export const initialLanguage = () => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    const authId = getState().firebase.auth.uid;

    firestore.doc(`users/${authId}`).get().then((doc: any) => { //get user
      const language = doc.data().language;
      console.log("language: " + language);

      dispatch({ type: 'USER_LANGUAGE', language: language });
    }).catch((error: Error) => {
      dispatch({ type: 'PRODUCT_ERROR', error });
    })
  }
}

export const changeLanguage = (language: 'hebrew' | 'english') => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    const authId = getState().firebase.auth.uid;

    if (!authId) {
      dispatch({ type: 'USER_LANGUAGE', language: language });
      return;
    }

    firestore.doc(`users/${authId}`).get().then((doc: any) => { //get user
      firestore.doc(`users/${authId}`).update({ language: language });//edit
      dispatch({ type: 'USER_LANGUAGE', language: language });
    }).catch((error: Error) => {
      dispatch({ type: 'PRODUCT_ERROR', error });
    })
  }
}
