import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AnimeInfo } from '../Entities/AnimeInfo';
import { Descriptions, Image, Button, Collapse, Form, Rate } from 'antd';
import { Formatos } from '../Entities/Formatos';
import { AniApiConfig } from '../Services/AniApiConfig';
import Comentarios from './Comentarios';
import TextArea from 'antd/lib/input/TextArea';
//import useFirebaseDatabase from '../firebase/useFirebaseDatabase';

const Detalles = () => {
    const location = useLocation();
    const history = useHistory();
    const animeId = location.pathname.split("/").pop();
    const [ animeInfo, setAnimeInfo ] = useState<AnimeInfo>();

    const [form] = Form.useForm();

    //const { save, update, documents, loading } = useFirebaseDatabase("comentarios");
    const [ selectedId, setSelectedId ] = useState<string>("");

    const onFinish = (values: any) => {
        values.finished = values.finished !== undefined ? values.finished : false;
        /*
        if (selectedId === "") {
            save(values).then(() => {
                form.resetFields();
            });
        } else {
            update(selectedId, values).then(() => {
                form.resetFields();
                setSelectedId("");
            });
        }
        */
    };
    
    useEffect(() => {
        getDetails(animeId);
    }, []); //Con el [] al final espera a que se haya terminado de cargar (ComponentDidMount)

    //Pasar a servicio
    const getDetails = (animeId: string | undefined) => {
        AniApiConfig.get('/anime/' + animeId)
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
                <Descriptions.Item label="Fecha estreno">{animeInfo?.start_date.split("T")[0]}</Descriptions.Item>
                <Descriptions.Item label="Fecha fin">{animeInfo?.end_date.split("T")[0]}</Descriptions.Item>

                <Descriptions.Item label="Descripcion" span={4}>{(animeInfo?.descriptions.es) ? animeInfo?.descriptions.es : animeInfo?.descriptions.en}</Descriptions.Item>
                
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
                <Descriptions.Item label="Comentarios" span={4}>
                    <Comentarios/>
                </Descriptions.Item>
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
                        label="Puntuación"
                        name="name"
                        rules={[
                            { required: true, message: '¡Hace falta una puntuacion!' },
                        ]}
                    >
                        <Rate allowHalf defaultValue={2.5} />
                    </Form.Item>

                    <Form.Item
                        label="Comentario"
                        name="name"
                        rules={[
                            { required: true, message: 'Campo obligatorio!' },
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
            </Descriptions>
            <div className="center">
                <Button type="primary" onClick={() => history.goBack()}>Volver</Button>
            </div>
        </div>
    );
};

export default Detalles;