export interface AuthState {
    authError: string,
    isLoggedIn: boolean
}

export enum AuthActionsEnum {
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_ERROR = "LOGIN_ERROR",
    SIGNUP_SUCCESS = "SIGNUP_SUCCESS",
    SIGNUP_ERROR = "SIGNUP_ERROR",
    SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS",
    IS_LOGGED_IN = "IS_LOGGED_IN"
}

export interface AuthActionPattern {
    type: AuthActionsEnum; //Action Type
}

export interface logingSuccessActionType extends AuthActionPattern {
    type: AuthActionsEnum.LOGIN_SUCCESS
}

export interface logingErrorActionType extends AuthActionPattern {
    type: AuthActionsEnum.LOGIN_ERROR
    err: Error
}

export interface signOutActionType extends AuthActionPattern {
    type: AuthActionsEnum.SIGNOUT_SUCCESS
}

export interface signUpSuccessActionType extends AuthActionPattern {
    type: AuthActionsEnum.SIGNUP_SUCCESS
}

export interface signUpErrorActionType extends AuthActionPattern {
    type: AuthActionsEnum.SIGNUP_ERROR,
    err: Error
}

export interface isLoggedInActionType extends AuthActionPattern {
    type: AuthActionsEnum.IS_LOGGED_IN
}