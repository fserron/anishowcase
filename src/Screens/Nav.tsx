import './Nav.css';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';

const { Item } = Menu;

function Nav() {
    return (
        <>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Item key='1'>
                    <NavLink 
                        activeClassName="selected"
                        activeStyle={{fontWeight: "bold", color: "#0F4C81"}}
                        to="/inicio">
                        Inicio
                    </NavLink>
                </Item>
                <Item key='2'>
                    <NavLink 
                        activeClassName="selected"
                        activeStyle={{fontWeight: "bold", color: "#0F4C81"}}
                        to="/favoritos">
                        Mis Favoritos
                    </NavLink>
                </Item>
            </Menu>
        </>
    )
}
export default Nav;
