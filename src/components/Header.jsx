import React from 'react'
import "../styles/components/Header.scss";
import { Avatar,Typography } from '@mui/material';

function Header() {
  return (
    <div className='header'>
    <Avatar alt='User Avatar'/>
    <Typography variant='h3' color='white'>Home</Typography>
    </div>
  )
}

export default Header;