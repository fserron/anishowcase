export interface Comentario {
    id?: string;
    usuario_id: number;
    nombre_usuario: string;
    email?: string;
    anime_id: number;
    puntuacion: number;
    comentario: string;
    timestamp: number;
}