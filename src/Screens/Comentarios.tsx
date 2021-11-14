import React, { useEffect } from 'react';
import { List, Skeleton, Divider, Card } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useComentariosFDB } from '../Firebase/FirebaseDatabase';

const Comentarios = ({ animeId }: { animeId: number }) => {

    const { getAllForCurrentAnime, documents } = useComentariosFDB("comentarios");

    const cargarComentarios = () => {
        getAllForCurrentAnime(animeId);
    };

    useEffect(() => {
        cargarComentarios();
      }, []);

    return (
        <div
            id="scrollableDiv"
            style={{
                height: 400,
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
            }}>
                {
                ((documents !== undefined) && (documents.length > 0)) ?
                    <InfiniteScroll
                        dataLength={documents.length}
                        next={cargarComentarios}
                        hasMore={documents.length < 1}
                        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                        endMessage={<Divider plain>Has alcanzado el final de los comentarios ¿Porque no hacer uno nuevo?</Divider>}
                        scrollableTarget="scrollableDiv"
                    >

                        <List
                            dataSource={documents}
                            renderItem={item => (
                                <List.Item key={item.id}>
                                    <List.Item.Meta
                                        avatar={new Date(item.timestamp).toISOString()}
                                        title={`Usuario: ${item.nombre_usuario} (${item.email})` }
                                        description={item.comentario}
                                    />
                                    <div>Puntuacion: {item.puntuacion}</div>
                                </List.Item>
                            )}
                        />
                    </InfiniteScroll>
                    :
                    <Card title="Notificación">No hay comentarios... ¡Sé el primero!</Card>
            }
        </div>
    );
};

export default Comentarios;