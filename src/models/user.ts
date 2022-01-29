export interface User {
    username: string;
    email: string;
    displayName: string;
    token: string;
    image?: string;
}

export interface UserFormValues {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    confirmPassword?: string;
    displayName?: string;
    username?: string;
}