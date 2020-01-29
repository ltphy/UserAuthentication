export interface UserDescription {
    firstName: string,
    lastName: string,
    email: string,
    selectManga: string,
};

export interface UserInfo {
    description: UserDescription,

    id: string,
}