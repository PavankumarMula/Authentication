import React, { useState } from "react";
const AuthContextData=React.createContext({
    token:'',
    isLoggedIn:false,
    login:()=>{},
    logout:()=>{}
})
export const AuthContextProvider = (props) =>{
    const[token,setToken]=useState(null);
   const userIsLoggedIn=!!token
   const loginHandler = (token)=>{
        console.log(token)
        setToken(token);
   }
   const logoutHandler = ()=>{
    setToken(null)
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