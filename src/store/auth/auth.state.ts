import { AuthState } from "./auth.types";

export const initialAuthState: AuthState = {
    authError: '',
    isLoggedIn: false,
    header: {title: "", user: ""},
    userLanguage: 'hebrew'
}