import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import Inicio from './Screens/Inicio';
import Acerca from './Screens/Acerca';
import NotImplemented from './Screens/NotImplemented';
import Nav from './Screens/Nav';
import Login from './Screens/Login';
import Details from './Screens/Detalles';

import { Layout, Breadcrumb } from 'antd';
import Favoritos from './Screens/Favoritos';
const { Header, Content, Footer } = Layout;

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  /*
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
              </Breadcrumb>
  */
  return (
    <>
      <BrowserRouter>
        <Layout className="layout">
          <Header>
            <Nav />
          </Header>
          <Content style={{ padding: '0 50px' }}>
              <div className="site-layout-content">
                <Switch>
                  <Route exact path="/">
                    {!isLoggedIn && <Redirect to={"/login"} />}  
                  </Route>
                  <Route path="/login"><Login /></Route>
                  <Route path="/inicio"><Inicio /></Route>
                  <Route path="/favoritos"><Favoritos /></Route>
                  <Route path="/acerca"><Acerca /></Route>
                  <Route path="/detalles/:id"><Details/></Route>
                  <Route path="*"><NotImplemented /></Route>
                </Switch>
              </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ani Showcase ©2021 Created by Federico Serron</Footer>
        </Layout>

      </BrowserRouter>
    </>
  );
}

export default App;
