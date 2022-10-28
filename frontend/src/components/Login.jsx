import React, { Component } from 'react'
// import { GoogleOAuthProvider , GoogleLogin} from "@react-oauth/google";
import GoogleLogin from 'react-google-login';

const Login = () => {
    // const responseGoogle = (response) => {
    //   console.log(response);
    // };

    return (
      <div>
        <button className="shadow-2x1">

            <GoogleLogin
    clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
    buttonText="Log in with Google"
    onSuccess={(responseGoogle) => {
        console.log(responseGoogle)
    }}
    onFailure={(responseGoogle) => {
        console.log(responseGoogle)
    }}
    cookiePolicy={'single_host_origin'}
/>

          ;
        </button>
      </div>
    )
}

export default Login;
