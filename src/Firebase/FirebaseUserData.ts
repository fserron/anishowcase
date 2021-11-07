import { createContext } from "react";

export interface UserData {
    id?: number;
    username?: string;
    email?: string;
}

export interface FirebaseUserContext {
    user?: UserData;
    setUser?: any;
}

export const FirebaseUserData = createContext<FirebaseUserContext>({});