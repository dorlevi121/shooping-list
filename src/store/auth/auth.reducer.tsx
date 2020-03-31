import { initialAuthState } from "./auth.state";
import {
  logingErrorActionType,
  logingSuccessActionType,
  AuthActionsEnum,
  signOutActionType,
  signUpErrorActionType,
  signUpSuccessActionType,
  isLoggedInActionType
} from "./auth.types";

type allAuthActionTypes =
  | logingErrorActionType
  | logingSuccessActionType
  | signOutActionType
  | signUpErrorActionType
  | signUpSuccessActionType | isLoggedInActionType;
let i = 0;
export const authReducer = (
  state = initialAuthState,
  action: allAuthActionTypes
) => {
  switch (action.type) {
    case AuthActionsEnum.LOGIN_ERROR:
      console.log('LOGIN_ERROR');
      
      return {
        ...state,
        authError: action.err.message + i++
      };

    case AuthActionsEnum.LOGIN_SUCCESS:
      console.log('LOGIN_SUCCESS');
      return {
        ...state,
        authError: null
      };

    case AuthActionsEnum.SIGNOUT_SUCCESS:
      console.log('SIGNOUT_SUCCESS');
      return {
        ...state,
        authError: null,
        isLoggedIn: false
      };
    case AuthActionsEnum.SIGNUP_ERROR:
      console.log('SIGNUP_ERROR');
      return {
        ...state,
        authError: action.err.message + i++
      };

    case AuthActionsEnum.SIGNUP_SUCCESS:
      console.log('SIGNUP_SUCCESS');
      return {
        ...state,
        authError: null
      };

      case AuthActionsEnum.IS_LOGGED_IN:
        console.log('IS_LOGGED_IN');
        return {
          ...state,
          isLoggedIn: !state.isLoggedIn 
        }
        
  }

  return state;
};
