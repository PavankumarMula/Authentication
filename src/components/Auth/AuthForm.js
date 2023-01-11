import { useState,useRef,useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContextData from './AuthContext';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const[isLoading,setIsLoading]=useState(false);
  const emailInputRef=useRef();
  const passwordInputRef=useRef();
    const authCtx=useContext(AuthContextData)
    const history=useHistory()
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

   function formHandler(event){
      event.preventDefault();
      setIsLoading(true);
      let url;
      if(isLogin){
        url=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAsYyotWR2zesaRukTm4MhJNB9k7RTFZdY`
      }else{
        url=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAsYyotWR2zesaRukTm4MhJNB9k7RTFZdY`
      }
      fetch(url,
      {
        method:'POST',
        body:JSON.stringify({
          email:emailInputRef.current.value,
          password:passwordInputRef.current.value,
          returnSecureToken:true,
        }),
        headers:{
          'content-Type':'application/json'
        }
      }).then(res=>{
        setIsLoading(false);
        if(res.ok){
            return res.json()
        }else{
          res.json().then(data=>{
            let errormessage='Authentication Failed';
            // if(data&&data.error&&data.error.message){
            //   errormessage=data.error.message;
            // }
            throw new Error(errormessage);
          })
        }
      }).then(data=>{
        authCtx.loginfunc(data.idToken)
        history.replace('./')

      }).catch(error=>{
        alert(error.message)
      })
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={formHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
         {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
         {isLoading&&<p>sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
