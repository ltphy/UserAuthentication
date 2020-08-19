import {XMLElement} from "../constants/xml.constants";

export const getXMLElementByTag = (path: string[], xmlElement: XMLElement) => {

};

export const countErrors = (validationList: boolean[])=>{
    validationList.push(true);
    validationList.push(false);
    validationList.push(true);
    return 3;
};