import { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { AnimeInfo } from '../Entities/AnimeInfo';
import { List, Card, Avatar, Pagination } from 'antd';
import { Formatos } from '../Entities/Formato';
import { StarOutlined, StarFilled, EllipsisOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import * as AniApiService from "../Services/AniApiService";
import { useDispatch, useSelector } from 'react-redux';
import { AnimeReduxActionType } from '../Redux/AnimeReducer';
import { State } from '../Redux/initialState';
import AniApiUser from '../Entities/AniApiUser';
import { FirebaseUserData, UserData } from '../Firebase/FirebaseUserData';

//TODO: Mover listado a componente aparte
function Inicio() {
    const location = useLocation();
    const [ animeList, setAnimeList ] = useState<Array<AnimeInfo>>();
    const [ paginaActual, setPaginaActual ] = useState(1);
    const [ itemsTotales, setItemsTotales ] = useState(1);
    const history = useHistory();
    const dispatch = useDispatch();
    const AnimeStore = useSelector((state: State) => state.favorites);
    const { setUser } = useContext(FirebaseUserData);
    const hash:string = location.hash;
    const extractedToken = hash?.slice(14);

    const onPageChange = (pagina: any) => {
        getList(pagina);
        setPaginaActual(pagina);
    };

    useEffect(() => {
        //Extraigo el token para guardarlo en futuras llamadas al servicio
        if (extractedToken) {
            AniApiService.setUpUser(extractedToken)
                .then(({ data }: { data: any }) => {
                    if (data !== undefined) {
                        const userData = {
                            id: data?.id,
                            username: data?.username,
                            email: data?.email
                        }
                        console.log("Usuario guardado: " + JSON.stringify(userData));
                        setUser(userData);
                    }
            });
        }

        getList(paginaActual);
        //Sobreescribimos la ruta para que no se vea el token
        //TODO: Se podria usar un replaceState???
        history.push({
            pathname: '/inicio',
            search: '',
        });
    }, []); //Con el [] al final espera a que se haya terminado de cargar (ComponentDidMount)

    //Pasar a servicio
    const getList = (pagina: number) => {
        AniApiService.getAnimeByPage(pagina)
            .then(({ data }: { data: any }) => {
                setAnimeList(data.documents);
                setItemsTotales(data?.count);
        });
    }

    const addToFavorites = (anime: AnimeInfo) => {
        console.log("Se agrega a favoritos el item: " + JSON.stringify(anime.titles.en));
        dispatch({type: AnimeReduxActionType.AGREGAR, payload: anime})
    }

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
                dataSource={animeList}
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
                                (AnimeStore.find(item => item.id === element.id )) ?
                                [
                                    <StarFilled
                                        key="unfavButton"
                                        onClick={() => removeFromFavorites(element)}/>,
                                    <EllipsisOutlined key="detalles" />,
                                ] : [
                                    <StarOutlined 
                                        key="favButton"
                                        onClick={() => addToFavorites(element)}/>,
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
                total={itemsTotales} 
                showQuickJumper={true}
                showSizeChanger={false}
                //Agregar items en blanco mientras carga
            />
        </>
    )
}

export default Inicio;

/*

                                <img src={element.cover_image} alt="Cobertura"/>

                                <Card title={element.titles.en} extra={<button onClick={() => console.log("redirect")}>Ver mas</button>}>
                                Formato: {Formatos[element.format]}
                                <br/>
                                {element.episodes_count === 1 ? `Duracion: ${element.episode_duration} minutos` : `Episodios: ${element.episodes_count}`}
                                <br/>
                                Estreno: {element.start_date.substring(0, 10)}
                                <br/>
                                Estado: {Estados[element.status]}
                                <br/>
                                Puntuacion: {element.score}
                                <br/>
                                Trailer: <a href={element.trailer}>Ver</a>
                            </Card>
                                <br/>
                                Generos: {JSON.stringify(element.genres)};
*/