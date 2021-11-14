import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Inicio from './Screens/Inicio';
import NotImplemented from './Screens/NotImplemented';
import Nav from './Screens/Nav';
import Login from './Screens/Login';
import Details from './Screens/Detalles';
import { FirebaseUserData, UserData } from './Firebase/FirebaseUserData';
import { StorageUtil } from "./Services/StorageService";

import { Layout } from 'antd';
import Favoritos from './Screens/Favoritos';
import Logout from './Screens/Logout';
const { Header, Content, Footer } = Layout;

function App() {
  const [user, setUser] = useState<UserData>({});
  const { saveSessionData, loadSessionData } = StorageUtil();

  useEffect(() => {
    const userData = loadSessionData("user");
    if (userData?.user_id !== undefined) {
        setUser(userData);
    }
  }, [])

  useEffect(() => {
      if (user?.user_id !== undefined) {
        saveSessionData("user", user);
      } else {
        saveSessionData("user", {});
      }
  }, [user])

  return (
    <>
      <BrowserRouter>
        <Layout className="layout">
          <FirebaseUserData.Provider value={{user, setUser}}>
            <Header>
              <Nav />
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                  <Switch>
                    <Route exact path="/">
                      {(JSON.stringify(user) === "{}") && <Redirect to={"/login"} /> }
                    </Route>
                    <Route path="/login"><Login /></Route>
                    <Route path="/logout"><Logout /></Route>
                    <Route path="/inicio"><Inicio /></Route>
                    <Route path="/favoritos">
                      {(JSON.stringify(user) === "{}") ? <Redirect to={"/login"} /> : <Favoritos /> }
                    </Route>
                    <Route path="/detalles/:id"><Details/></Route>
                    <Route path="*"><NotImplemented /></Route>
                  </Switch>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ani Showcase ©2021 Created by Federico Serron</Footer>
          </FirebaseUserData.Provider>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
