import OnePiece from "../pages/OnePiece";
import Conan from "../pages/Conan";
import DragonBall from "../pages/DragonBall";
import PageListing from "../pages/PageListing";

export interface IRouter {
    component: any;
    isPrivate: boolean,
    title: string,
    showHeaderNavBar: boolean,
    path: string,
};

export const routes: IRouter[] = [
    {
        component: Conan,
        isPrivate: false,
        title: "Conan",
        showHeaderNavBar: true,
        path: "/conan",
    },
    {
        component: OnePiece,
        isPrivate: false,
        title: "One Piece",
        showHeaderNavBar: true,
        path: "/one-piece"
    },   {
        component: DragonBall,
        isPrivate: false,
        title: "Dragon Ball",
        showHeaderNavBar: true,
        path: "/dragon-ball"
    },
    {
        component: PageListing,
        isPrivate: false,
        title: "PageListing",
        showHeaderNavBar: true,
        path: "/page-listing"
    },
];