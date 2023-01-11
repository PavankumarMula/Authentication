import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContextData from '../Auth/AuthContext';
const ProfileForm = () => {
  const authCtx=useContext(AuthContextData);
  const idtoken=authCtx.token;
  const changePassword=useRef()
 
  const formHandler = (event)=>{
    event.preventDefault()
    const enteredPassWord=changePassword.current.value
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAsYyotWR2zesaRukTm4MhJNB9k7RTFZdY`,
    {
      method:'POST',
      body:JSON.stringify({
            idToken:idtoken,
            password:enteredPassWord,
            returnSecureToken:true
      }),
      headers:{
        'content-Type':'application/json'
      }
    }).then(res=>{
      res.json().then(data=>{console.log(data)});
    })
  }
  return (
    <form className={classes.form} onSubmit={formHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={changePassword} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
