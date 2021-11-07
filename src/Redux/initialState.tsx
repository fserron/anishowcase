import { AnimeInfo } from "../Entities/AnimeInfo";

export interface State {
    favorites: Array<AnimeInfo>,
    contador: number
}

const initialState: State = {
    favorites: [],
    contador: 0
}

export default initialState;