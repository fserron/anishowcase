export interface Comentario {
    id: string;
    usuario_id: string;
    anime_id: number;
    puntuacion: number;
    comentario: string;

    //Atributos de prueba. Borrar.
    name: {
        first: string;
        last: string;
    }

    picture: {
        large: string;
    }

    email: string;
}