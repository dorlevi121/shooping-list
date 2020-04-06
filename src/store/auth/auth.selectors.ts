export const getUser = (state: any) => state.auth.user;
export const isLoogedIn = (state: any) => state.auth.isLoggedIn;
export const headerDetails = (state: any) => state.auth.header;
export const userLanguage = (state: any): number => {
    const lan = state.auth.userLanguage;
    if(lan === 'hebrew' ) return 1;
    return 0;
}