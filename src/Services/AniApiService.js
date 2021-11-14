import { AniApiConfig } from "./AniApiConfig";


export const setUpUser = extractedToken => {
    AniApiConfig.defaults.headers.common['Authorization'] = 'Bearer ' + extractedToken;

    return AniApiConfig.get('/auth/me');
};

export const getAnimeByPage = pagina => {
  return AniApiConfig.get(`/anime?nsfw=true&per_page=16&page=${pagina}`);
};

export const getAnimeDatails = id => {
  return AniApiConfig.get(`/anime/${id}`);
};
