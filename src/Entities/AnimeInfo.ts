import { Estados } from "./Estado";
import { Formatos } from "./Formato";

interface Descriptions {
    en: string;
    jp: string;
    it: string;
    es: string;
}

interface Titles {
    en: string;
    jp: string;
    it: string;
    es: string;
}

export interface AnimeInfo {
    id: number;
    titles: Titles;
    format: Formatos;
    status: Estados;
    start_date: string;
    end_date: string;
    episodes_count: number;
    episode_duration: number;
    genres: string[];
    score: number;
    banner_image: string;
    cover_image: string;
    descriptions: Descriptions;
    trailer_url: string;
}

/*
Interface que no se usa.
export interface ListData {
    status: number;
    statusText: string;
    count: number;
    current_page: number;
    last_page: number;
    documents: ListItemInfo[];
}
 */