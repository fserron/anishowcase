import { useContext, useState, useEffect } from 'react';
import { Comentario } from '../Entities/Comentario';
import { db } from './firebaseConfig';
import { notification } from 'antd';
import { FirebaseUserData, UserData } from './FirebaseUserData';


export const useComentariosFDB = (collection = "comentarios") => {

    const [firebaseDocuments, setFirebaseDocuments] = useState<Array<Comentario>>([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(FirebaseUserData);

    const saveComment = (values: Comentario) => {
        return db.collection(collection).doc().set(values).then((result) => {
            notification.info({ message: "Su comentario se guardo exitosamente." });
        }).catch((err) => {
            notification.error({ message: "Ocurrió un error guardando su comentario: " + err.code });
        });;
    }

    const getAllForCurrentUser = () => {
        setLoading(true);
        return db.collection(collection)
            .where("usuario_id", "==", user?.user_id)
            .onSnapshot(querySnapshot => {
                const firebaseCollectionData: Array<Comentario> = [];
                querySnapshot.forEach(firebaseDoc => {
                    const doc: any = { ...firebaseDoc.data(), id: firebaseDoc.id };
                    firebaseCollectionData.push(doc);
                });
                setFirebaseDocuments(firebaseCollectionData);
                setLoading(false);
            });
    };

    const getAllForCurrentAnime = (anime_id: number) => {
        setLoading(true);
        return db.collection(collection)
            .where("anime_id", "==", anime_id)
            .orderBy("timestamp")
            .onSnapshot(querySnapshot => {
                const firebaseCollectionData: Array<Comentario> = [];
                querySnapshot.forEach(firebaseDoc => {
                    const doc: any = { ...firebaseDoc.data(), id: firebaseDoc.id };
                    firebaseCollectionData.push(doc);
                });
                setFirebaseDocuments(firebaseCollectionData);
                setLoading(false);
            });
    };

    //Descartado porque no recupera bien
    const getPageForCurrentAnime = (anime_id: number, start: number, end: number) => {
        setLoading(true);
        return db.collection(collection)
            .where("anime_id", "==", anime_id)
            .orderBy("timestamp")
            .startAt(start)
            .endAt(end)
            .onSnapshot(querySnapshot => {
                const firebaseCollectionData: Array<Comentario> = [];
                querySnapshot.forEach(firebaseDoc => {
                    const doc: any = { ...firebaseDoc.data(), id: firebaseDoc.id };
                    firebaseCollectionData.push(doc);
                });
                setFirebaseDocuments(firebaseCollectionData);
                setLoading(false);
            });
    };

    const getUserCommentForCurrentAnime = (anime_id: number) => {
        setLoading(true);
        return db.collection(collection)
            .where("anime_id", "==", anime_id)
            .where("usuario_id", "==", user?.user_id)
            .onSnapshot(querySnapshot => {
                const firebaseCollectionData: Array<Comentario> = [];
                querySnapshot.forEach(firebaseDoc => {
                    const doc: any = { ...firebaseDoc.data(), id: firebaseDoc.id };
                    firebaseCollectionData.push(doc);
                });
                setFirebaseDocuments(firebaseCollectionData);
                setLoading(false);
            });
    };


    const deleteComment = (id: string) => {
        db.collection(collection).doc(id).delete().then((result) => {
            notification.success({ message: "Comentario borrado exitosamente." });
        }).catch((err) => {
            notification.error({ message: "Ocurrió un error guardando su comentario: " + err.code});
        });;
    }

    const updateComment = (id: string, comentario: Comentario) => {
        return db.collection(collection).doc(id).update(comentario).then((result) => {
            notification.success({ message: "Comentario actualizado exitosamente." });
        }).catch((err) => {
            notification.error({ message: "Ocurrió un error actualizando su comentario: " + err.code});
        });;
    };

    return {
        saveComment,
        getAllForCurrentUser,
        getAllForCurrentAnime,
        getPageForCurrentAnime,
        getUserCommentForCurrentAnime,
        deleteComment,
        updateComment,
        loading,
        documents: firebaseDocuments
    }
}

export const useUsuariosFDB = (collection = "usuarios") => {

    const [firebaseDocuments, setFirebaseDocuments] = useState<Array<UserData>>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllUsers();
    }, []);

    const saveUser = (values: UserData) => {
        return db.collection(collection).doc().set(values).then((result) => {
            notification.info({ message: `El usuario ${values.username} se guardo exitosamente.` });
        }).catch((err) => {
            notification.error({ message: "Ocurrió un error guardando el usuario." });
        });;
    }

    const getUser = (id: number) => {
        setLoading(true);
        console.log("getUser: id - " + id);
        return db.collection(collection)
            .where("user_id", "==", id)
            .onSnapshot(querySnapshot => {
                const firebaseCollectionData: Array<UserData> = [];
                querySnapshot.forEach(firebaseDoc => {
                    const doc: any = { ...firebaseDoc.data(), id: firebaseDoc.id };
                    firebaseCollectionData.push(doc);
                });
                setFirebaseDocuments(firebaseCollectionData);
                console.log(JSON.stringify("Coleccion (getUser): " + firebaseCollectionData));
                setLoading(false);
            });
    };

    const getAllUsers = () => {
        console.log("Entro al getAllUsers");
        setLoading(true);
        return db.collection(collection)
            .onSnapshot(querySnapshot => {
                const firebaseCollectionData: Array<UserData> = [];
                querySnapshot.forEach(firebaseDoc => {
                    const doc: any = { ...firebaseDoc.data(), id: firebaseDoc.id };
                    firebaseCollectionData.push(doc);
                });
                setFirebaseDocuments(firebaseCollectionData);
                console.log(JSON.stringify("Coleccion (getAllUsers): " + firebaseCollectionData));
                setLoading(false);
            });
    };

    const updateUser = (id: string, usuario: UserData) => {
        return db.collection(collection).doc(id).update(usuario);
    };

    return {
        saveUser,
        getUser,
        getAllUsers,
        updateUser,
        loading,
        documents: firebaseDocuments
    }
}