import { List, Card, Avatar, Pagination } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { StarFilled, EllipsisOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AnimeInfo } from '../Entities/AnimeInfo';
import { Formatos } from '../Entities/Formato';
import { AnimeReduxActionType } from '../Redux/AnimeReducer';
import { State } from '../Redux/initialState';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Favoritos() {
    const AnimeStore = useSelector((state: State) => state.favorites);
    const dispatch = useDispatch();
    const [ paginaActual, setPaginaActual ] = useState(1);

    const onPageChange = (pagina: any) => {
        setPaginaActual(pagina);
    };

    const removeFromFavorites = (anime: AnimeInfo) => {
        console.log("Se quita de favoritos el item: " + JSON.stringify(anime.titles.en));
        dispatch({type: AnimeReduxActionType.QUITAR, payload: anime})
    }
    
    return (
        <>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 3,
                    xl: 3,
                    xxl: 5,
                }}
                dataSource={AnimeStore}
                renderItem={element => (
                    <List.Item>
                        <Card
                            hoverable
                            style={{ width: 280 }}
                            cover={
								<Link to={`/detalles/${element.id}`}>
                                    <img alt="portada" style={{ width: 280 }} src={element.cover_image}/>
                                </Link>
                            }
                            actions={
                                [
                                    <StarFilled
                                        key="unfavButton"
                                        onClick={() => removeFromFavorites(element)}/>,
                                    <EllipsisOutlined key="detalles" />,
                                ]
                            }
                            >
                            <Meta 
                                avatar={<Avatar style={{ color: '#ffffff', backgroundColor: '#000000' }}>{element.score}</Avatar>}
                                title={element.titles.en} 
                                description={Formatos[element.format]} />
                        </Card>
                    </List.Item>
                )}
            />
            <Pagination 
                current={paginaActual} 
                onChange={onPageChange} 
                defaultPageSize={100}
                total={AnimeStore.length} 
                showQuickJumper={true}
                showSizeChanger={false}
                //Agregar items en blanco mientras carga
            />
        </>
    )
}

export default Favoritos;
