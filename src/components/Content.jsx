import React from 'react';
import "../styles/components/Content.scss";
import {Typography} from "@mui/material";

import UserProfile from './UserProfile';


function Content({display,setDisplay}) {
  return (
    <div className='content'>
    {display === 'Home' ? <Typography variant='body1' color='white'>Content</Typography> : null }
    {display === 'User Profile' ? <UserProfile setDisplay={setDisplay}/> : null}  


    </div>
  )
}

export default Content;