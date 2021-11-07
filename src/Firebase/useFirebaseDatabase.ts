import { useContext, useState, useEffect } from 'react';
import { Comentario } from '../Entities/Comentarios';


const useFirebaseDatabase = (collection = "tasks") => {
    /*
    const [firebaseDocuments, setFirebaseDocuments] = useState<Array<Comentario>>([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        getAll();
    }, []);

    const save = (values: Comentario) => {
        values.userId = user?.uid;
        return db.collection(collection).doc().set(values).then((result) => {
            notification.info({ message: "ok guardado" });
        }).catch((err) => {
            notification.error({ message: "Ocurrió un error" });
        });;
    }

    const getAll = () => {
        setLoading(true);
        return db.collection(collection)
            .where("userId", "==", user?.uid)
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

    const deleteTask = (id: string) => {
        db.collection(collection).doc(id).delete().then((result) => {
            notification.success({ message: "ok eliminado" });
        })
    }

    const update = (documentId: string, comentario: Comentario) => {
        return db.collection(collection).doc(documentId).update(comentario);
    };

    return {
        save,
        getAll,
        deleteTask,
        update,
        loading,
        documents: firebaseDocuments
    }
    */
}

export default useFirebaseDatabase;