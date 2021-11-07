import { useEffect } from 'react';


function Login() {
  useEffect(() => {
    const response_type = 'token';
    const client_id = '4c858a60-9b19-43d5-92e0-b75864d17cf0';
    const redirect_uri = 'http://localhost:3000/inicio'
    const url = `https://api.aniapi.com/v1/oauth?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}`;

    window.location.href = url;

  }, []); //Con el [] al final espera a que se haya terminado de cargar (ComponentDidMount)
 
  return (
    <>Espere mientras es redireccionado...</>
  )
}

export default Login;
