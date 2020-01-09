export interface UserDescription {
    firstName: string,
    lastName: string,
    email: string,
    selectManga: string,
    [key:string]: string,
};

export interface UserInfo {
    description: UserDescription,
    id: string,
}