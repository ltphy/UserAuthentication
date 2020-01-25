import {UserInfo,UserDescription} from "../../../models/user_info.model";
// @ts-ignore
import uuid from "uuid";
export const MenuConstant = {

};
export const description:UserDescription = {
firstName:"phy",
    lastName:"Lieng",
    email: "phy@zmp.vn",
    selectManga: "Luffy"
}
export const defaultUserInfo:UserInfo = {
    description:description,
    id: uuid()
}
