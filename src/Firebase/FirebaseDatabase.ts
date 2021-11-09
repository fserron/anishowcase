import { useContext, useState, useEffect } from 'react';
import { Comentario } from '../Entities/Comentario';
import { db } from './firebaseConfig';
import { notification } from 'antd';
import { FirebaseUserData } from './FirebaseUserData';


const useComentariosFDB = (collection = "comentarios") => {

    const [firebaseDocuments, setFirebaseDocuments] = useState<Array<Comentario>>([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(FirebaseUserData);

    useEffect(() => {
        getAllForCurrentUser();
    }, []);

    const saveComment = (values: Comentario) => {
        return db.collection(collection).doc().set(values).then((result) => {
            notification.info({ message: "Su comentario se guardo exitosamente." });
        }).catch((err) => {
            notification.error({ message: "Ocurrió un error guardando su comentario." });
        });;
    }

    const getAllForCurrentUser = () => {
        setLoading(true);
        console.log("user.id: " + user?.id);
        return db.collection(collection)
            .where("userId", "==", user?.id)
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
                    console.log("doc: " + JSON.stringify(doc));
                    firebaseCollectionData.push(doc);
                    console.log("firebaseCollectionData: " + JSON.stringify(firebaseCollectionData));
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
                    console.log("doc: " + JSON.stringify(doc));
                    firebaseCollectionData.push(doc);
                    console.log("firebaseCollectionData: " + JSON.stringify(firebaseCollectionData));
                });
                setFirebaseDocuments(firebaseCollectionData);
                setLoading(false);
            });
    };

    const getUserCommentForCurrentAnime = (anime_id: number) => {
        setLoading(true);
        return db.collection(collection)
            .where("anime_id", "==", anime_id)
            .where("userId", "==", user?.id)
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
        })
    }

    const updateComment = (id: string, comentario: Comentario) => {
        return db.collection(collection).doc(id).update(comentario);
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

export default useComentariosFDB;