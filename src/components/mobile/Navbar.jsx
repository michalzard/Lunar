import React, { useState } from 'react';
import "../../styles/components/mobile/Navbar.scss";

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from "@mui/icons-material/Home";

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SearchIcon from '@mui/icons-material/Search';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';

import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import {Fab} from '@mui/material';

function Navbar({setDisplay}) {
  const [btn,setBtn]=useState('home');
  const highlightColor='#bb86fc';
  return (
    <>
    <div className='fab'>
    <Fab disableRipple onClick={()=>{setDisplay('Post')}}> <HistoryEduIcon/> </Fab>
    </div>

    <div className='navbar'>
    {
      btn === 'home' ? <HomeIcon style={{color:highlightColor}}/> 
      : <HomeOutlinedIcon onClick={()=>{setBtn('home');setDisplay('Home');}}/>
    }
    {
      btn === 'search' ? <SearchIcon style={{color:highlightColor}}/> 
      : <SearchOutlinedIcon onClick={()=>{setBtn('search');setDisplay('Search')}}/>
    }
    {
      btn === 'notifications' ? <NotificationsIcon style={{color:highlightColor}}/> 
      : <NotificationsNoneIcon onClick={()=>{setBtn('notifications');setDisplay('Notifications');}}/>
    }
    </div>
    </>
  )
}

export default Navbar;