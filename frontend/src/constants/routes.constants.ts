import Manga from "../pages/Manga";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";

export interface IRouter {
    component: any;
    isPrivate: boolean,
    title: string,
    showHeaderNavBar: boolean,
    path: string,
}

export const routes: IRouter[] = [
    {
        component: Home,
        isPrivate: false,
        title: "Home",
        showHeaderNavBar: true,
        path: "/",
    },
    {
        component: Manga,
        isPrivate: true,
        title: "Manga",
        showHeaderNavBar: true,
        path: "/manga"
    },
    {
        component: Contact,
        isPrivate: true,
        title: "Contact",
        showHeaderNavBar: true,
        path: "/contact"
    }, {
        component: SignIn,
        isPrivate: false,
        title: "Sign In",
        showHeaderNavBar: true,
        path: "/sign-in"
    }, {
        component: SignUp,
        isPrivate: false,
        title: "Sign Up",
        showHeaderNavBar: true,
        path: "/sign-up"
    },
];