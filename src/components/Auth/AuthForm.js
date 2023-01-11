import { useState,useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef=useRef();
  const passwordInputRef=useRef();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

   function formHandler(event){
      event.preventDefault();
      if(isLogin){

      }else{
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAsYyotWR2zesaRukTm4MhJNB9k7RTFZdY`,
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
          if(res.ok){

          }else{
            res.json().then(data=>{
              console.log(data)
            })
          }
        })
      
      }
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
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
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
