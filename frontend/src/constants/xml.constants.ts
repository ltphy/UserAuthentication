export interface XMLAttributes {
    [key: string]: string;
}

export interface XMLElement {
    name?: string;
    element: XMLElement[];
    text?: string;
    attributes?: XMLAttributes;
}
