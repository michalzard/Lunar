import React, { useState } from 'react'
import "../styles/components/Header.scss";
import { Avatar,Button,TextField,Typography } from '@mui/material';
import ProfileDrawer from './ProfileDrawer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import DiscardDialog from './Post/DiscardDialog';

function Header({display,setDisplay,isDisplay,isPostUnsaved}) {
  const [opened,setOpen] = useState(false);
  const [discardOpen,setDiscardOpen] = useState(false);

  return (
    <div className='header'>
    {
      isDisplay('home')  ?
      <Avatar alt='User Avatar' onClick={()=>{setOpen(true);}}/>
      : 
      <>
      { !isDisplay('search') ? 
      <span onClick={()=>{
      // else back out to home
      if(isDisplay('edit profile')) setDisplay('User Profile');
      else if(isDisplay('post editor')){
        // logic if post unsaved -> discard dialog prompt
        isPostUnsaved ? setDiscardOpen(true) 
        // if nothing to save to drafts -> go back to home
        : setDisplay('Home'); 
      }
      else setDisplay('Home');
      
      }}><ArrowBackIcon/></span>
      : null}
      </>
    }

  {
    isDisplay('user profile') ? 
    <div className='info'>
    <Typography variant='h6' color='white'>Username</Typography> 
    <Typography variant='caption'>0 Posts</Typography> 
    </div>
    : 
    <> 
    {isDisplay('user profile','post editor') ? 
    <div className='edit_profile'>
    <Typography variant='h5' color='white'>{display}</Typography>
    {
      isDisplay('post editor') ? 
      <div className='post_btn'>
      <Button variant='text'>Drafts</Button>
      <Button variant='contained'>Post</Button>
      </div>
      :
      <Button variant='contained' className='edit_button'>Save</Button> 
    }
    </div> 
    : 
    <>
      {
        isDisplay('search') ? <>
        <SearchIcon/>
        <TextField variant='outlined' placeholder='Search Lunar' className='searchbar'  fullWidth />
        </>
        : <Typography variant='h5' color='white'>{display}</Typography>
      }
    </>  
    }
    </>
  }

  {/* ANY POPUPS OR DIALOGS TRIGGERED BY BUTTONS/ACTION FROM HEADER WILL BE HERE */}
    <ProfileDrawer
    anchor='left' 
    open={opened}
    setOpen={setOpen}
    setDisplay={setDisplay}
    />

    <DiscardDialog
    open={discardOpen}
    handleClose={()=>{setDiscardOpen(false)}}
    onDiscard={()=>{setDiscardOpen(false);setDisplay('Home');}}
    onSave={()=>{setDiscardOpen(false);setDisplay('Home');console.log('saved to drafts');}}
    />
    </div>
  )
}

export default Header;