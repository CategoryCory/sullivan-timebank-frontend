import { IPhoto } from "./photo";
import { Skill } from "./skill";

export interface User {
    userId: string,
    username: string;
    displayName: string;
    email: string;
    roles: string[];
    profileImageUrl?: string;
    isApproved: boolean;
    token: string;
}

export interface UserProfile {
    id?: string;
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
    isApproved?: boolean;
    // profileImage?: string;
    // profileImageFile?: File;
    photos?: IPhoto[];
    skills: Skill[];
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