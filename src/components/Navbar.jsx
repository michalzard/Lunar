import React from 'react';
import "../styles/components/Navbar.scss";

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from "@mui/icons-material/Home";

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SearchIcon from '@mui/icons-material/Search';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';

import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import {Fab} from '@mui/material';

function Navbar({display,setDisplay}) {
  const highlightColor='#bb86fc';
  return (
    <>
    <div className='fab'>
    <Fab disableRipple onClick={()=>{setDisplay('Post Editor')}}> <HistoryEduIcon/> </Fab>
    </div>

    <div className='navbar'>
    {
      display === 'Home' ? <HomeIcon style={{color:highlightColor}}/> 
      : <HomeOutlinedIcon onClick={()=>{setDisplay('Home');}}/>
    }
    {
      display === 'Search' ? <SearchIcon style={{color:highlightColor}}/> 
      : <SearchOutlinedIcon onClick={()=>{setDisplay('Search')}}/>
    }
    {
      display === 'Notifications' ? <NotificationsIcon style={{color:highlightColor}}/> 
      : <NotificationsNoneIcon onClick={()=>{setDisplay('Notifications');}}/>
    }
    </div>
    </>
  )
}

export default Navbar;