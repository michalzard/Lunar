import React from 'react'
import '../../styles/components/Settings/AccountInformation.scss';
import {Button, TextField, Typography} from '@mui/material';

function AccountInformation() {
  return (
    <div className='account_information'>
    <Typography variant='caption' className='title'>Edit account information like password and email address</Typography>
    <div className='fields'>
    <TextField placeholder='Name' type='text' fullWidth/>
    <TextField placeholder='Email' type='email' fullWidth/>
    <TextField placeholder='Password' type='password' fullWidth/>
    </div>
    <Button variant='outlined' color='error'>Deactivate Account</Button>
    </div>
  )
}

export default AccountInformation;