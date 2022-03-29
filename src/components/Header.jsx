import React, { useState } from 'react'
import "../styles/components/Header.scss";
import { Avatar,Button,TextField,Typography } from '@mui/material';
import ProfileDrawer from './ProfileDrawer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';

function Header({display,setDisplay}) {
  const [opened,setOpen] = useState(false);
  return (
    <div className='header'>
    {
      display==='Home'  ?
      <Avatar alt='User Avatar' onClick={()=>{setOpen(true);}}/>
      : 
      <>
      { display!=='Search' ? 
      <span onClick={()=>{
      display ==='Edit Profile' ? setDisplay('User Profile') : setDisplay('Home');}}><ArrowBackIcon/></span>
      : null}
      </>
    }

  {
    display==='User Profile' ? 
    <div className='info'>
    <Typography variant='h6' color='white'>Username</Typography> 
    <Typography variant='caption'>0 Posts</Typography> 
    </div>
    : 
    <> 
    {display==='Edit Profile' || display==='Post Editor' ? 
    <div className='edit_profile'>
    <Typography variant='h5' color='white'>{display}</Typography>
    {
      display==='Post Editor' ? 
      <>
      <div className='post_btn'>
      <Button variant='text'>Drafts</Button>
      <Button variant='contained'>Post</Button>
      </div>
      </>
      :
      <Button variant='contained' className='edit_button'>Save</Button> 
    }
    </div> 
    : 
    <>
      {
        display === 'Search' ? <>
        <SearchIcon/>
        <TextField variant='outlined' placeholder='Search Lunar' className='searchbar'  fullWidth />
        </>
        : <Typography variant='h5' color='white'>{display}</Typography>
      }
    </>  
    }
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