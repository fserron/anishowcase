import React, { useState, useEffect } from 'react';
import { List, Avatar, Skeleton, Divider, Card } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Comentario } from '../Entities/Comentarios';

const Comentarios = () => {
    const [loading, setLoading] = useState(false);
    const [comentarios, setComentarios] = useState<Array<Comentario>>();

    const cargarComentarios = () => {
        if (loading) {
          return;
        }
        setLoading(true);
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
          .then(res => res.json())
          .then(body => {
              console.log("Body: " + JSON.stringify(body));
              setComentarios((comentarios !== undefined) ? [...comentarios, ...body.results] : [...body.results]);
              console.log("Comentarios: " + comentarios);
          })
          .catch((error) => {
            console.error("Ocurrio un error. " + error)
          })
          .finally(()=> {
            setLoading(false);
          });
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
                {(comentarios !== undefined) ?
                    <InfiniteScroll
                        dataLength={comentarios.length}
                        next={cargarComentarios}
                        hasMore={comentarios.length < 100}
                        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                        endMessage={<Divider plain>Has alcanzado el final de los comentarios ¿Porque no hacer uno nuevo?</Divider>}
                        scrollableTarget="scrollableDiv"
                    >

                        <List
                            dataSource={comentarios}
                            renderItem={item => (
                                <List.Item key={item.id}>
                                    <List.Item.Meta
                                        //avatar={<Avatar src={item.picture.large} />}
                                        title={<a href="https://ant.design">{item.name.last}</a>}
                                        description={item.email}
                                    />
                                    <div>Comentario</div>
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