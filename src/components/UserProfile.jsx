import React, { useState } from 'react'
import "../styles/components/UserProfile.scss";
import {Avatar,Typography,Button} from '@mui/material';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LinkIcon from '@mui/icons-material/Link';
import InterestsIcon from '@mui/icons-material/Interests';
import LocationOnIcon from '@mui/icons-material/LocationOn';


function UserProfile({setDisplay}) {
  const [filter,setFilter]=useState('Posts');
  const highlightColor='#bb86fc';
  return (
    <div className='user_profile'>
    <div className='user_info'>
    <div className='photo'>
    <Avatar/>
    <Button variant='outlined' onClick={()=>{setDisplay('Edit Profile')}}>Edit profile</Button>
    </div>
    <div className='info'>
    <div className='user_name'>
    <Typography variant='body1' className='name'>Username</Typography> 
    <Typography variant='caption' className='tag'>@Usertag</Typography>
    </div>
    </div>
    <div className='description'>
    <Typography variant='caption'>Bio</Typography>
    </div>
    <div className='interests'>
    <InterestsIcon/> Interest
    <LocationOnIcon/>Location
    <LinkIcon/>Link
    <CalendarMonthIcon/>20/03/2000
    </div>
    </div>
    <div className='filter_buttons'>
    <Typography style={{borderBottom:filter==='Posts' ? `2px solid ${highlightColor}` : null}} variant='body1'>
    <span onClick={()=>{setFilter('Posts')}}>Posts</span>
    </Typography>
    <Typography style={{borderBottom:filter==='Replies' ? `2px solid ${highlightColor}` : null}} variant='body1'>
    <span onClick={()=>{setFilter('Replies')}}>Replies</span>
    </Typography>
    <Typography style={{borderBottom:filter==='Media' ? `2px solid ${highlightColor}` : null}} variant='body1'>
    <span onClick={()=>{setFilter('Media')}}>Media</span>
    </Typography>
    <Typography style={{borderBottom:filter==='Likes' ? `2px solid ${highlightColor}` : null}} variant='body1'>
    <span onClick={()=>{setFilter('Likes')}}>Likes</span>
    </Typography>
    </div>
    <div className='content'>
    content
    </div>
    </div>
  )
}

export default UserProfile;