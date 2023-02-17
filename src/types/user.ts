export interface SuperUser {
    project: string;
    email: string;
    password: string;
}

export interface User extends SuperUser {
    department: string;
    name: string;
}

export type UserState = {
    status: string;
    user: {
        project: string;
        email: string;
        isLoged: boolean;
        role: string;
    };
};