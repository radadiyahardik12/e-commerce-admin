import React, { useState } from 'react'
import Signin from './components/SignIn'
import Signup from './components/SignUp'

const Auth = ({setisAuth}) => {
    const [authLogin, setauthLogin] = useState(true);
  return (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
        flexDirection: "column",
        width: "1600px",
      }}>
        {authLogin ? 
        <Signup setauthLogin={setauthLogin}/>
        :
        <Signin setauthLogin={setauthLogin} setisAuth={setisAuth}/>
        }
    </div>
  )
}

export default Auth