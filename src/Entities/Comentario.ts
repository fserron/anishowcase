export interface Comentario {
    id?: string;
    usuario_id: number;
    nombre_usuario: string;
    anime_id: number;
    puntuacion: number;
    comentario: string;
    timestamp: number;
}