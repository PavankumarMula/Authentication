import React, { useState } from "react";
const AuthContextData=React.createContext({
    token:'',
    isLoggedIn:false,
    login:()=>{},
    logout:()=>{}
})
export const AuthContextProvider = (props) =>{
    const initialtoken=localStorage.getItem('token')
    const[token,setToken]=useState(initialtoken);
   const userIsLoggedIn=!!token
   const loginHandler = (token)=>{
    
        setToken(token);
        localStorage.setItem('token',token);
   }
   const logoutHandler = ()=>{
    setToken(null)
    localStorage.removeItem('token');
   }
   const contextValue={
    token:token,
    islogin:userIsLoggedIn,
    loginfunc:loginHandler,
    logoutfunc:logoutHandler
   }
   return <AuthContextData.Provider value={contextValue}>{props.children}</AuthContextData.Provider>
}
export default AuthContextData;