import React, {useEffect, useRef, useState} from 'react';
import AuthService, {User} from "../services/auth.service";
import CookieService from '../services/cookie.service';
import CookieName from '../constants/cookie.constants';

export interface AuthLogin {
    user: User;
    token: string;
}

interface AuthFnc {
    isAuthenticated: Function;
    clearAuth: Function;
}

const authLogin: AuthLogin = {
    user: {
        name: "",
        email: "",
    },
    token: "",
};
const authFnc: AuthFnc = {
    isAuthenticated: () => {
    },
    clearAuth: () => {
    },
};

export const AuthUserContext: React.Context<AuthLogin> = React.createContext<AuthLogin>(authLogin);
export const SetAuthenticationFnc: React.Context<Function> = React.createContext<Function>(() => {
});
export const AuthenticateFunctionContext: React.Context<AuthFnc> = React.createContext<AuthFnc>(authFnc);

interface authProps {
    children: any;
}

const AuthUserProvider = (props: authProps) => {
    //use State so that when user setAuth => auto rerender.
    const [authInfo, setAuthInfo] = useState<AuthLogin>(authLogin);

    useEffect(() => {
        console.log("Hello");
        loadAuthCookies().then(() => {
        });
    }, []);
    useEffect(() => {
        CookieService.setCookie(CookieName.USER_INFO, JSON.stringify(authInfo.user), 2);
        CookieService.setCookie(CookieName.TOKEN, authInfo.token, 2);
    }, [authInfo]);

    const loadAuthCookies = async () => {
        const token = CookieService.getCookie(CookieName.TOKEN);
        const userStr = CookieService.getCookie(CookieName.USER_INFO);
        if (!token || !userStr) {
            CookieService.deleteCookie(CookieName.TOKEN);
            CookieService.deleteCookie(CookieName.USER_INFO);
            return;
        }
        //this thing will call API with token obtained from cookies => we can get userInfo
        try {
            const authInfoRes: User = await AuthService.getUserInfo();
            setAuthInfo({token: token, user: authInfoRes});
        } catch (error) {
            CookieService.deleteCookie(CookieName.TOKEN);
            CookieService.deleteCookie(CookieName.USER_INFO);
        }
    };

    const isAuthenticated = () => {
        return !!(authInfo.token && authInfo.user);
    };

    const clearAuth = () => {
        CookieService.deleteCookie(CookieName.TOKEN);
        CookieService.deleteCookie(CookieName.USER_INFO);
        setAuthInfo(authLogin);
    };

    const authFnc: AuthFnc = {
        isAuthenticated: isAuthenticated,
        clearAuth: clearAuth,
    };

    return (
        <AuthUserContext.Provider value={authInfo}>
            <SetAuthenticationFnc.Provider value={setAuthInfo}>
                <AuthenticateFunctionContext.Provider value={authFnc}>
                    {props.children}
                </AuthenticateFunctionContext.Provider>
            </SetAuthenticationFnc.Provider>
        </AuthUserContext.Provider>
    )
};

export default AuthUserProvider;