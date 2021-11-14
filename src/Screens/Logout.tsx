import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseUserData, UserData } from '../Firebase/FirebaseUserData';
import { StorageUtil } from "../Services/StorageService";

function Logout() {
  const history = useHistory();
  const { setUser } = useContext(FirebaseUserData);
  const { saveSessionData } = StorageUtil();

  useEffect(() => {
      const userData: UserData = {};
      setUser(userData);
      saveSessionData("user", userData);

      history.push({
        pathname: '/inicio',
        search: '',
      });

  }, []);
 
  return (
    <>Espere mientras es redireccionado...</>
  )
}

export default Logout;