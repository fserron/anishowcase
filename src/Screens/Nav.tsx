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
                        activeStyle={{color: "red"}}
                        to="/inicio">
                        Inicio
                    </NavLink>
                </Item>
                <Item key='2'>
                    <NavLink 
                        activeClassName="selected"
                        activeStyle={{color: "red"}}
                        to="/favoritos">
                        Favoritos
                    </NavLink>
                </Item>
                <Item key='3'>
                    <NavLink 
                        activeClassName="selected"
                        activeStyle={{color: "red"}}
                        to="/acerca">
                        Acerca
                    </NavLink>
                </Item>
            </Menu>
        </>
    )
}
/*


            <nav>
                <li className="nav-item">
                    
                </li>
                <li className="nav-item">

                </li>
                <li className="nav-item">
                    <NavLink 
                        activeClassName="selected"
                        activeStyle={{color: "red"}}
                        to="/about">
                        About
                    </NavLink>
                </li>
            </nav>
*/
export default Nav;
