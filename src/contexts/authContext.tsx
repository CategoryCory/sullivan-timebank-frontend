import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ApiRoutes } from "../constants/ApiRoutes";
import { UserRoles } from "../constants/UserRoles";
import useAxios from "../hooks/axioshooks";
import { User, UserFormValues } from "../models/user";

export type UserContextType = {
    currentUser: User | null;
    isLoading: boolean;
    isLoggedIn: boolean;
    isAdmin: boolean;
    signIn: (user: UserFormValues) => void;
    refreshUser: () => void;
    signOut: () => void;
}

export const AuthContext = createContext<UserContextType | null>(null);

type Props = {
    children?: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const axios = useAxios();

    const signIn = useCallback(async (user: UserFormValues) => {
        try {
            const response = await axios.post<User>(ApiRoutes.AccountLogin, user);
            setUser(response.data);

            if (response.data.roles.includes(UserRoles.Admin)) {
                setIsAdmin(true);
            }

            window.localStorage.setItem("jwt", response.data.token);

            setIsLoggedIn(true);
        } catch (error) {
            console.error(error);
        }

        setIsLoading(false);
    }, [axios]);

    const refreshUser = useCallback(async () => {
        const token = window.localStorage.getItem("jwt");

        if (token != null) {
            try {
                const response = await axios.get<User>(ApiRoutes.AccountCurrent);
                setUser(response.data);

                if (response.data.roles.includes(UserRoles.Admin)) {
                    setIsAdmin(true);
                }

                setIsLoggedIn(true);
            } catch (error) {
                console.error(error);
            }
        }

        setIsLoading(false);
    }, [axios]);

    const signOut = useCallback(() => {
        window.localStorage.removeItem("jwt");

        setIsLoggedIn(false);
        setIsAdmin(false);
        setUser(null);
    }, []);

    const contextValue = useMemo<UserContextType>(() => ({
        currentUser: user,
        isLoading,
        isLoggedIn,
        isAdmin,
        signIn,
        refreshUser,
        signOut,
    }), [user, isLoading, isLoggedIn, isAdmin, signIn, refreshUser, signOut]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext) as UserContextType;
