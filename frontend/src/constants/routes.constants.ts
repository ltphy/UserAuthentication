import Home from "../pages/Home";
import Contact from "../pages/Contact";

export interface IRouter {
    component:any;
    isPrivate:boolean,
    title:string,
    showHeaderNavBar:boolean,
    path:string,
};

export const routes:IRouter[] = [
    {
        component: Home,
        isPrivate:false,
        title:"Home",
        showHeaderNavBar:true,
        path:"/",
    },
    {
        component: Contact,
        isPrivate:false,
        title:"Contact",
        showHeaderNavBar:true,
        path:"/contact"
    }

];