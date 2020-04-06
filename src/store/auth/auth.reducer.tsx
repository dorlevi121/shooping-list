import { initialAuthState } from "./auth.state";
import {
  logingErrorActionType,
  logingSuccessActionType,
  AuthActionsEnum,
  signOutActionType,
  signUpErrorActionType,
  signUpSuccessActionType,
  isLoggedInActionType,
  headerTitleActionType,
  userLanguageActionType
} from "./auth.types";

type allAuthActionTypes =
  | logingErrorActionType
  | logingSuccessActionType
  | signOutActionType
  | signUpErrorActionType
  | signUpSuccessActionType
  | isLoggedInActionType
  | headerTitleActionType
  | userLanguageActionType;
let i = 0;
export const authReducer = (
  state = initialAuthState,
  action: allAuthActionTypes
) => {
  switch (action.type) {
    case AuthActionsEnum.LOGIN_ERROR:
      console.log("LOGIN_ERROR");

      return {
        ...state,
        authError: action.err.message + i++
      };

    case AuthActionsEnum.LOGIN_SUCCESS:
      console.log("LOGIN_SUCCESS");
      return {
        ...state,
        authError: null
      };

    case AuthActionsEnum.SIGNOUT_SUCCESS:
      console.log("SIGNOUT_SUCCESS");
      return {
        ...state,
        authError: null,
        isLoggedIn: false
      };
    case AuthActionsEnum.SIGNUP_ERROR:
      console.log("SIGNUP_ERROR");
      return {
        ...state,
        authError: action.err.message + i++
      };

    case AuthActionsEnum.SIGNUP_SUCCESS:
      console.log("SIGNUP_SUCCESS");
      return {
        ...state,
        authError: null
      };

    case AuthActionsEnum.IS_LOGGED_IN:
      console.log("IS_LOGGED_IN");
      const ans = !state.isLoggedIn;
      return {
        ...state,
        isLoggedIn: ans
      };

    case AuthActionsEnum.HEADER_TITLE:
      return {
        ...state,
        header: { title: action.title, user: action.user }
      };

    case AuthActionsEnum.USER_LANGUAGE:
      console.log(action.language);
      
      return {
        ...state,
        userLanguage: action.language
      };
  }

  return state;
};
