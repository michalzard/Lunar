import React,{useState} from 'react';
import {Typography,TextField,Button} from '@mui/material';
import '../styles/components/Login.scss';
import axios from 'axios';

function Login({setUser}) {
  const [display,setDisplay]=useState('Login');
  const [name,setName]=useState('');
  const [password,setPassword]=useState('');
  const onNameChange=(e)=>{setName(e.target.value)};
  const onPasswordChange=(e)=>{setPassword(e.target.value)};

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

  return (
    <div className='login_page'>
      { display==='Login' ? 
      <>
      <Typography variant='h4'>Log in to Lunar </Typography>
      <div className='fields'>
      <TextField placeholder='Name' type='text' fullWidth onChange={onNameChange} value={name}/>
      <TextField placeholder='Password' type='password' fullWidth onChange={onPasswordChange} value={password}/>
      </div>
      <div className='btns'>
      <Button variant='contained' onClick={requestLogin} >Login</Button>
      <Button variant='text'>Dont have account?<span>Register</span></Button>
      </div>
      </> 
      : null //registration elements go here
      }
    

    </div>
  )
}

export default Login;