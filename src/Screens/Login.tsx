import { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FirebaseUserData, UserData } from '../Firebase/FirebaseUserData';
import * as AniApiService from "../Services/AniApiService";
import { StorageUtil } from "../Services/StorageService";

/*
Usuarios creados:
  Fese: federico.serron@gmail.com / tuvieja
  Covfefe: federico.serron@softtek.com / tuvieja
*/
function Login() {
  const location = useLocation();
  const history = useHistory();
  const { setUser } = useContext(FirebaseUserData);
  const hash:string = location.hash;
  const extractedToken = hash?.slice(14);
  const { saveSessionData } = StorageUtil();

  useEffect(() => {
    if (extractedToken) {
      let userData: UserData = {}
      AniApiService.setUpUser(extractedToken)
          .then(({ data }: { data: any }) => {
              if (data !== undefined) {
                  userData = {
                      user_id: data?.id,
                      username: data?.username,
                      email: data?.email
                  }
                  setUser(userData);
                  saveSessionData("user", userData);
              }
      });

      history.push({
        pathname: '/inicio',
        search: '',
      });

    } else { //No vino con los argumentos necesarios para el login
      const response_type = 'token';
      const client_id = '4c858a60-9b19-43d5-92e0-b75864d17cf0';
      const redirect_uri = 'http://localhost:3000/login'
      const url = `https://api.aniapi.com/v1/oauth?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}`;
  
      window.location.href = url;
    }

  }, []);
 
  return (
    <>Espere mientras es redireccionado...</>
  )
}

export default Login;