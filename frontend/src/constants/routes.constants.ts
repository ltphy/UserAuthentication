import Manga from "../pages/Manga";
import Contact from "../pages/Contact";
import Home from "../pages/Home";

export interface IRouter {
    component: any;
    isPrivate: boolean,
    title: string,
    showHeaderNavBar: boolean,
    path: string,
};

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
        isPrivate: false,
        title: "Manga",
        showHeaderNavBar: true,
        path: "/manga"
    },
    {
        component: Contact,
        isPrivate: false,
        title: "Contact",
        showHeaderNavBar: true,
        path: "/contact"
    }
];