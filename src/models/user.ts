export interface User {
    firstName: string;
    lastName: string;
    username: string;
    displayName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    email: string;
    phone: string;
    birthday: Date | null;
    image?: string;
    isApproved: boolean;
    token: string;
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