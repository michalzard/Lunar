import React, { useState } from 'react'
import '../../styles/components/Settings/AccountInformation.scss';
import {Button, TextField, Typography} from '@mui/material';

function AccountInformation({user}) {
  const [name,setName]=useState(user ? user.name : '');
  const [email,setEmail]=useState(user ? user.email : '');
  const [password,setPassword]=useState('');
  const updateField=(e,setter)=>{setter(e.target.value);}
  return (
    <div className='account_information'>
    <Typography variant='caption' className='title'>Edit account information like password and email address</Typography>
    <div className='fields'>
    <TextField placeholder='Name' type='text' fullWidth  onChange={(e)=>updateField(e,setName)}/>
    <TextField placeholder='Email' type='email' fullWidth  onChange={(e)=>updateField(e,setEmail)}/>
    <TextField placeholder='Password' type='password' fullWidth onChange={(e)=>updateField(e,setPassword)}/>
    </div>
    <Button variant='outlined' color='error'>Deactivate Account</Button>
    </div>
  )
}

export default AccountInformation;