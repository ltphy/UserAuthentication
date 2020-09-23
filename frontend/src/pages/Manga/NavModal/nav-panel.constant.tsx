import Description from "./Description";
import Introduction from "./Introduction";
import Summary from "./Summary";
import TravelList from "./TravelList";
export interface NavPanel {
    name:string;
    component:any;
}
export const NavPanels: NavPanel[] = [
    {
        name:"Description",
        component:Description
    },
    {
        name:"Introduction",
        component:Introduction,
    },
    {
        name:"Summary",
        component:Summary,
    },
    {
        name:"TravelList",
        component:TravelList,
    }
];
