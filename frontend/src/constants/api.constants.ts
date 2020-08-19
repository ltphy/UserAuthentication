const host = process.env.REACT_APP_API;
export const signIn = `${host}/api/auth/sign-in`;
export const signUp = `${host}/api/auth/sign-up`;
export const getUserInfo = `${host}/api/auth/user-info`;