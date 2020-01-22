import Home from "../pages/Home";

export interface Router {
    component:any;
    isPrivate:boolean,
    title:string,
    showHeaderNavBar:boolean,
    path:string,
};

const routes:Router[] = [
    {
        component: Home,
        isPrivate:false,
        title:"Home",
        showHeaderNavBar:true,
        path:"/home",
    },
];