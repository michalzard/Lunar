import React from 'react';
import "../styles/components/Content.scss";
import {Typography} from "@mui/material";

import UserProfile from './UserProfile';
import ProfileEdit from './ProfileEdit';
import PostEditor from './PostEditor';

function Content({display,setDisplay}) {
  return (
    <div className='content'>
    {display === 'Home' ? <Typography variant='body1' color='white'>Content</Typography> : null }
    {display === 'User Profile' ? <UserProfile setDisplay={setDisplay}/> : null}  
    {display === 'Edit Profile' ? <ProfileEdit/> : null}
    {display === 'Post Editor' ? <PostEditor/> : null}
    </div>
  )
}

export default Content;