import HttpClientService from "./httpclient.service";
import {getUserInfo, signIn, signUp} from "../constants/api.constants";
import {AuthLogin} from "../context/auth.context";

export interface LoginInfo {
    email: string;
    password: string;
}

export interface User {
    name: string;
    email: string;
}

export interface SignUpInfo {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    messages: string[];
    userInfo: User;
}

class AuthService {
    // private static _instance: AuthService;
    // public static get instance() {
    //     return this._instance || (this._instance = new this());
    // }
    public static async signUp(accInfo: SignUpInfo): Promise<AuthLogin> {
        try {

            const signUpRes: AuthResponse = await HttpClientService.httpPost(signUp, accInfo);
            return {
                user: signUpRes.userInfo,
                token: signUpRes.token,
            };
        } catch (error) {
            throw(error.messages);
        }

    }

    public static async signIn(accInfo: LoginInfo): Promise<AuthLogin> {
        try {
            const signInRes: AuthResponse = await HttpClientService.httpPost(signIn, accInfo);
            return {
                user: signInRes.userInfo,
                token: signInRes.token
            }
        } catch (error) {
            throw(error);
        }

    }

    public static async getUserInfo(): Promise<User> {
        try {
            const {messages, userInfo} = await HttpClientService.httpGet(getUserInfo);
            console.log(messages);
            return userInfo;
        } catch (error) {
            throw (error);
        }

    }

}

export default AuthService;