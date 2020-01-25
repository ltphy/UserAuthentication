import OnePiece from "../pages/OnePiece";
import Conan from "../pages/Conan";

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
    },
];