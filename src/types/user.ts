export interface IUser {
    project: string;
    email: string;
    password: string;
    name?: string ;
    department?: string; 
}

export type TUserState = {
    status: string;
    user: {
        project: string;
        email: string;
        department: string;
        isLoged: boolean;
        role: string;
    };
    loggedOut: boolean;
};