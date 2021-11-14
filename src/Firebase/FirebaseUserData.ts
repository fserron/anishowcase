import { createContext } from "react";
import { AnimeInfo } from "../Entities/AnimeInfo";

export interface UserData {
    id?: string;
    user_id?: number;
    username?: string;
    email?: string;
    favorites?: Array<AnimeInfo>;
}

export interface FirebaseUserContext {
    user?: UserData;
    setUser?: any;
}

export const FirebaseUserData = createContext<FirebaseUserContext>({});