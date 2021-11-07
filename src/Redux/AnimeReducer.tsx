import initialState from "./initialState";

export interface AnimeReduxAction {
    type: AnimeReduxActionType,
    payload: any
}

//Completar mas adelante
export interface AnimeReduxActionPayload {

}

export enum AnimeReduxActionType {
    AGREGAR,
    QUITAR,
    REINICIAR
}

//Clase 8 / 1:24
//const AnimeReducer = (state: State, action: AnimeReduxAction) => {
const AnimeReducer = (state = initialState, action: any) => {
    console.log("Entro al reducer. State: " + JSON.stringify(state.favorites.length) + ". Accion: " + JSON.stringify(action));
    switch (action.type) {
        case AnimeReduxActionType.AGREGAR:
            return {...state, favorites: [...state.favorites, action.payload] }
        case AnimeReduxActionType.QUITAR:
            let nuevoArray = state.favorites;
            nuevoArray = state.favorites.filter(obj => obj !== action.payload);
            return {...state, favorites: nuevoArray }
        case AnimeReduxActionType.REINICIAR:
            return {...state, favorites: []}
        default:
            console.log("Salio por el default. action.type: " + action.type);
            return state;
    }
};

export default AnimeReducer;