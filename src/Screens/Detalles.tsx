import { useEffect, useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AnimeInfo } from '../Entities/AnimeInfo';
import { Descriptions, Image, Button, Collapse, Form, Rate, Typography } from 'antd';
import { Formatos } from '../Entities/Formato';
import * as AniApiService from "../Services/AniApiService";
import Comentarios from './Comentarios';
import TextArea from 'antd/lib/input/TextArea';
import { FirebaseUserData } from '../Firebase/FirebaseUserData';
import { Comentario } from '../Entities/Comentario';
import { useComentariosFDB } from '../Firebase/FirebaseDatabase';

const Detalles = () => {
    const location = useLocation();
    const history = useHistory();
    const animeId = location.pathname.split("/").pop();
    const aID: number = (animeId) ? Number(animeId) : 0;
    const [ animeInfo, setAnimeInfo ] = useState<AnimeInfo>();
    const { user } = useContext(FirebaseUserData);

    const [form] = Form.useForm();

    const { saveComment, getAllForCurrentAnime, documents } = useComentariosFDB("comentarios");

    const onFinish = (values: any) => {
        const nuevoComentario: Comentario = {
            usuario_id: (user?.user_id) ? user?.user_id : 0,
            nombre_usuario: (user?.username) ? user?.username : "Anonimo",
            anime_id: (animeInfo?.id) ? animeInfo?.id : 0,
            puntuacion: values?.puntuacion,
            comentario: values?.comentario,
            timestamp: new Date().valueOf(),
            email: (user?.email) ? user?.email : "Sin email"
        }

        saveComment(nuevoComentario).then(() => {
            form.resetFields();
        });

    };
    
    useEffect(() => {
        getDetails(aID);
        getAllForCurrentAnime(aID);
    }, []);

    const getDetails = (animeId: number) => {
        AniApiService.getAnimeDatails(animeId)
            .then(({ data }: { data: any }) => {
                setAnimeInfo(data);
        });
    }
    
    return (
        <div>
            <Descriptions title="Anime Info" layout="vertical" bordered column={4}>
                <Descriptions.Item label="Banner" span={4}>
                    <div className="center">
                        <Image src={animeInfo?.banner_image} style={{ height: 280 }}/>
                    </div>
                </Descriptions.Item>

                <Descriptions.Item label="Titulo" span={2}>{animeInfo?.titles.en}</Descriptions.Item>
                <Descriptions.Item label="Titulo original" span={1}>{animeInfo?.titles.jp}</Descriptions.Item>
                <Descriptions.Item label="Formato" span={1}>{(animeInfo?.format !== undefined) ? Formatos[animeInfo?.format] : "?"}</Descriptions.Item>

                <Descriptions.Item label="Episodios">{animeInfo?.episodes_count}</Descriptions.Item>
                <Descriptions.Item label="Duración">{animeInfo?.episode_duration} Minutos.</Descriptions.Item>
                <Descriptions.Item label="Fecha estreno">{animeInfo?.start_date?.split("T")[0]}</Descriptions.Item>
                <Descriptions.Item label="Fecha fin">{animeInfo?.end_date?.split("T")[0]}</Descriptions.Item>

                <Descriptions.Item label="Descripcion" span={4}>{(animeInfo?.descriptions?.es) ? animeInfo?.descriptions.es : animeInfo?.descriptions?.en}</Descriptions.Item>
                
                <Descriptions.Item label="Trailer" span={4}>
                            {(animeInfo?.trailer_url) ?
                                <Collapse>
                                    <Collapse.Panel header="Clickear para ver el trailer" key="1">
                                        <div className="video-responsive">
                                            <iframe
                                                width="853"
                                                height="480"
                                                src={animeInfo?.trailer_url}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title="Embedded youtube"
                                            />
                                        </div>
                                    </Collapse.Panel>
                                </Collapse>
                            :
                                <span className="center">No hay trailer disponible</span>
                            }
                </Descriptions.Item>
                <Descriptions.Item label={`Comentarios (${documents.length})`} span={4}>
                        <Comentarios animeId={aID}/>
                </Descriptions.Item>
                {(user?.user_id !== undefined) ?
                    <Descriptions.Item label="Nuevo Comentario" span={4}>
                        <Form
                            form={form}
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Usuario"
                                name="user"
                            >
                                <Typography.Text>{user?.username}</Typography.Text>
                            </Form.Item>

                            <Form.Item
                                label="Puntuación"
                                name="puntuacion"
                                rules={[
                                    { required: true, message: '¡Hace falta una puntuación!' },
                                ]}
                            >
                                <Rate allowHalf />
                            </Form.Item>

                            <Form.Item
                                label="Comentario"
                                name="comentario"
                                rules={[
                                    { required: true, message: '¡Hace falta un comentario!' },
                                ]}
                            >
                                <TextArea rows={4} />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Enviar
                                </Button>
                            </Form.Item>
                        </Form>
                    </Descriptions.Item>
                    :
                    <span className="center">Para dejar comentarios debes estar registrado.</span>
                }
            </Descriptions>
            <div className="center">
                <Button type="primary" onClick={() => history.goBack()}>Volver</Button>
            </div>
        </div>
    );
};

export default Detalles;