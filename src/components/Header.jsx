import React, { useState } from 'react'
import "../styles/components/Header.scss";
import { Avatar,Button,Typography } from '@mui/material';
import ProfileDrawer from './mobile/ProfileDrawer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function Header({display,setDisplay}) {
  const [opened,setOpen] = useState(false);
  return (
    <div className='header'>
    {
      display==='Home' ?
      <Avatar alt='User Avatar' onClick={()=>{setOpen(true);}}/>
      : <span onClick={()=>{display ==='Edit Profile' ? setDisplay('User Profile') 
      : setDisplay('Home');}}><ArrowBackIcon/></span>
    }

  {
    display==='User Profile' ? 
    <div className='info'>
    <Typography variant='h6' color='white'>Username</Typography> 
    <Typography variant='caption'>0 Posts</Typography> 
    </div>
    : 
    <> 
    {display==='Edit Profile' ? 
    <div className='edit_profile'>
    <Typography variant='h5' color='white'>{display}</Typography>
    <Button variant='contained' className='edit_button'>Save</Button> 
    </div> 
    : <Typography variant='h5' color='white'>{display}</Typography>}
    </>
  }
    <ProfileDrawer
    anchor='left' 
    open={opened}
    setOpen={setOpen}
    setDisplay={setDisplay}
    />

    </div>
  )
}

export default Header;