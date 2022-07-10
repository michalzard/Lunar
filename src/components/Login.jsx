import React,{useState} from 'react';
import {Typography,TextField,Button} from '@mui/material';
import '../styles/components/Login.scss';
import axios from 'axios';


function Login({setUser,isMobile}) {
  const [display,setDisplay]=useState("Login");
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");
  const [warnings,setWarnings]=useState("");
  const onNameChange=(e)=>{setName(e.target.value)};
  const onPasswordChange=(e)=>{setPassword(e.target.value)};
  const onEmailChange=(e)=>{setEmail(e.target.value);};

  const requestLogin=()=>{
    //validation logic
    //shorthand for name,password ~ name:name...
    axios.post(`${process.env.REACT_APP_AUTH_ROUTE}/login`,{name,password})
    .then(data=>{
      const {sessionID} = data.data;
      //saves sessionID to localstorage so next time you refresh you'll be requesting using sessionID
      //persisting user state
      if(sessionID) {
        localStorage.setItem('sessionID',sessionID);//saves id 
        axios.get(`${process.env.REACT_APP_USER_ROUTE}/session?id=${sessionID}`).then(data=>{
          const{user}=data.data;
          if(user)setUser(user);
        });
    }
      
      setName(''); setPassword('');  
    })
    .catch(err=>{console.log(err);});
   
  }

  const requestRegister=()=>{
    axios.post(`${process.env.REACT_APP_AUTH_ROUTE}/register`,{name,email,password})
    .then(data=>{
      const {sessionID,message} = data.data;
      if(sessionID){
        localStorage.setItem("sessionID",sessionID);
        axios.get(`${process.env.REACT_APP_USER_ROUTE}/session?id=${sessionID}`).then(data=>{
          const{user}=data.data;
          if(user){
            setUser(user);
            setName(""); setPassword(""); setEmail(""); setWarnings("");
          }
        })
        .catch(err=>{
          //session error
          console.log(err);
        })
      }else {
        setWarnings(message);
      }
    }).catch(err=>{
      //register error
      console.log(err);
    });
  }

  
  return (
    <div className={`login_page`}>
      <div style={{width:isMobile ? null : "400px"}}>
      <Typography variant='h4'>{display==='Login' ? "Log in to" : "Register on"} Lunar</Typography>
      <div className='fields'>
      <TextField placeholder='Name' type='text' fullWidth onChange={onNameChange} value={name}/>
      {display === "Login" ? null : <TextField placeholder="Email" type="email" fullWidth onChange={onEmailChange} value={email}/>}
      <TextField placeholder='Password' type='password' fullWidth onChange={onPasswordChange} value={password}/>
      <Typography variant="subtitle2" color="red">{warnings}</Typography>
      </div>
      <div className='btns'>
      <Button variant='contained' onClick={display === "Login" ? requestLogin : requestRegister}>{display === "Login" ? "Login" : "Register"}</Button>
      <div className='register'>
        <span> {display === "Login" ? "Dont have account ?" : "Already have an account?"}</span>
        <Button variant='text' onClick={()=>{
        if(display === "Login")setDisplay("Register"); setWarnings("");
        if(display === "Register")setDisplay("Login"); setWarnings("");
        }}>{display === "Login" ? "Register" : "Login"}</Button>
      </div>
      
      </div>
      </div> 
     
    </div>
  )
}

export default Login;