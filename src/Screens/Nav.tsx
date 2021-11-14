import './Nav.css';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { FirebaseUserData } from '../Firebase/FirebaseUserData';

const { Item } = Menu;

function Nav() {
    const { user } = useContext(FirebaseUserData);

    return (
        <>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Item key='1' style={{ float: 'left' }}>
                    <NavLink 
                        activeClassName="selected"
                        activeStyle={{fontWeight: "bold", color: "#0F4C81"}}
                        to="/inicio">
                        Inicio
                    </NavLink>
                </Item>
                <Item key='2' style={{ float: 'left' }}>
                    <NavLink 
                        activeClassName="selected"
                        activeStyle={{fontWeight: "bold", color: "#0F4C81"}}
                        to="/favoritos">
                        Mis Favoritos
                    </NavLink>
                </Item>
                <Item key='3' disabled style={{ float: 'right', marginLeft: 'auto' }}>
                    {(user?.user_id) ? user.username : "Anonimo"}
                </Item>
                {(user?.user_id) ?
                    <Item key='4' style={{ float: 'right', marginLeft: 'auto' }}>
                        <NavLink 
                            activeClassName="selected"
                            activeStyle={{fontWeight: "bold", color: "#0F4C81"}}
                            to="/logout">
                                Salir
                        </NavLink>
                    </Item>
                    :
                    <Item key='4' style={{ float: 'right', marginLeft: 'auto' }}>
                        <NavLink 
                            activeClassName="selected"
                            activeStyle={{fontWeight: "bold", color: "#0F4C81"}}
                            to="/login">
                                Ingresar
                        </NavLink>
                    </Item>
                }
            </Menu>
        </>
    )
}
export default Nav;
