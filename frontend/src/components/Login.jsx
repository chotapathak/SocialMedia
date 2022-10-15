import React, { Component } from 'react'
import { GoogleOAuthProvider , GoogleLogin} from "@react-oauth/google";
export default class Login extends Component {
  render() {
    return (
      <div>
        <button className="shadow-2x1">
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
          >
            <GoogleLogin
    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
    buttonText="Log in with Google"
    onSuccess={(responseGoogle) => {
        console.log(responseGoogle)
    }}
    onFailure={(responseGoogle) => {
        console.log(responseGoogle)
    }}
    cookiePolicy={'single_host_origin'}
/>
          </GoogleOAuthProvider>
          ;
        </button>
      </div>
    )
  }
}
