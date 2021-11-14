import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AnimeInfo } from '../Entities/AnimeInfo';
import { List, Card, Avatar, Pagination } from 'antd';
import { Formatos } from '../Entities/Formato';
import { StarOutlined, StarFilled, EyeOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import * as AniApiService from "../Services/AniApiService";
import { useDispatch, useSelector } from 'react-redux';
import { AnimeReduxActionType } from '../Redux/AnimeReducer';
import { State } from '../Redux/initialState';
import { FirebaseUserData, UserData } from '../Firebase/FirebaseUserData';
import { useUsuariosFDB } from '../Firebase/FirebaseDatabase';
import { StorageUtil } from "../Services/StorageService";

function Inicio() {
    const [ animeList, setAnimeList ] = useState<Array<AnimeInfo>>();
    const [ paginaActual, setPaginaActual ] = useState(1);
    const [ itemsTotales, setItemsTotales ] = useState(1);
    const dispatch = useDispatch();
    const history = useHistory();
    const AnimeStore = useSelector((state: State) => state.favorites);
    const { user } = useContext(FirebaseUserData);
    const { getUser, updateUser, saveUser, documents } = useUsuariosFDB("usuarios");
    const { saveSessionData, loadSessionData } = StorageUtil();
    const KEY_LIST = "anime.list.data.";
    const KEY_SIZE = "anime.list.size";

    const onPageChange = (pagina: any) => {
        setPaginaActual(pagina);
        getList(pagina);
    };

    useEffect(() => {
        getList(paginaActual);
    }, []);

    const getList = (pagina: number) => {
        const key = KEY_LIST + pagina;
        let results = loadSessionData(key);
        if (!results) {
            AniApiService.getAnimeByPage(pagina)
                .then(({ data }: { data: any }) => {
                    setAnimeList(data.documents);
                    setItemsTotales(data?.count);
                    saveSessionData(key, data.documents);
                    saveSessionData(KEY_SIZE, data?.count);
                });
        } else {
            setAnimeList(results);
            setItemsTotales(loadSessionData(KEY_SIZE));
        }
    }

    const addToFavorites = (anime: AnimeInfo) => {
        getUser((user?.user_id !== undefined) ? user.user_id : 0);
        let fbUser: UserData = documents[0];
        const fav_info: AnimeInfo = {
            id: anime.id,
            titles: {
                en: anime.titles.en,
            },
            cover_image: anime.cover_image,
            score: anime.score,
            format: anime.format,
        }
        if (!fbUser || !fbUser.id) { //No existe el usuario, se crea
            if (user) {
                fbUser = user;
                fbUser.favorites = [];
                fbUser.favorites.push(fav_info);
                saveUser(fbUser);
            }
        } else { //Existe el usuario, se actualiza
            if (!fbUser.favorites) fbUser.favorites = [];
            fbUser.favorites.push(fav_info);
            updateUser(fbUser.id, fbUser);
        }
        dispatch({type: AnimeReduxActionType.AGREGAR, payload: anime})
    }

    const removeFromFavorites = (anime: AnimeInfo) => {
        dispatch({type: AnimeReduxActionType.QUITAR, payload: anime})
    }

    return (
        <>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 5,
                    xxl: 8,
                }}
                dataSource={animeList}
                renderItem={element => (
                    <List.Item>
                        <Card
                            hoverable
                            style={{ width: 180 }}
                            cover={
								<Link to={`/detalles/${element.id}`}>
                                    <img alt="portada" style={{ width: 180 }} src={element.cover_image}/>
                                </Link>
                            }
                            actions={
                                    [
                                        ((AnimeStore.find(item => item.id === element.id )) ?
                                            <StarFilled
                                                key="unfavButton"
                                                onClick={() => removeFromFavorites(element)}/>
                                        :
                                            <StarOutlined 
                                                key="favButton"
                                                onClick={() => addToFavorites(element)}/>
                                        ),
                                        <EyeOutlined  
                                            key="detalles" 
                                            onClick={() => history.push(`/detalles/${element.id}`)}/>
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
            />
        </>
    )
}

export default Inicio;