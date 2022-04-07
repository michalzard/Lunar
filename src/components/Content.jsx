import React from 'react';
import "../styles/components/Content.scss";
import {Typography,Fab} from "@mui/material";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

import UserProfile from './UserProfile';
import ProfileEdit from './ProfileEdit';
import PostEditor from './PostEditor';
import Navbar from './Navbar';

function Content({display,setDisplay}) {
  return (
    <div className='content'>
    {display === 'Home' ? 
    <div className='_content'>
    <Typography variant='body1' color='white'>Content</Typography>
    
    <div className='fab'>
    <Fab disableRipple onClick={()=>{setDisplay('Post Editor')}}> <HistoryEduIcon/> </Fab>
    </div>
    </div>
    : null }
    {display === 'User Profile' ? <UserProfile setDisplay={setDisplay}/> : null}  
    {display === 'Edit Profile' ? <ProfileEdit/> : null}
    {display === 'Post Editor' ? <PostEditor/> : null}
    {
      display === 'Home' || display === 'Search' ?     <Navbar display={display} setDisplay={setDisplay}/> : null
    }
    </div>
  )
}

export default Content;