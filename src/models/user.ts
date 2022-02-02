export interface User {
    username: string;
    displayName: string;
    email: string;
    image?: string;
    isApproved: boolean;
    token: string;
}

export interface UserProfile {
    firstName: string;
    lastName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    email?: string;
    phoneNumber: string;
    birthday: Date | null;
    biography: string;
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