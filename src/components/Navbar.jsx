import React from 'react';
import "../styles/components/Navbar.scss";

// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeIcon from "@mui/icons-material/Home";

// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SearchIcon from '@mui/icons-material/Search';

// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';

// import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
// import {Fab} from '@mui/material';
import {Routes,Route,useNavigate} from 'react-router-dom';
import { IconButton } from '@mui/material';


function Navbar({isMobile}) {
  return (
    <>
    {
      isMobile ? <><div className='navbar'>
      <Routes>
         <Route path='/home' element={<NavbarControls/>} /> 
      </Routes>
      </div>
      </>
      : null
    }
    </>
  )
}

function NavbarControls(){
  // const highlightColor='#bb86fc';
  const navigate=useNavigate();
  return(
    <>  
    <IconButton onClick={()=>{navigate('/home');}}> <HomeIcon /> </IconButton>
    <IconButton onClick={()=>{navigate('/search');}}> <SearchIcon/> </IconButton>
    <IconButton onClick={()=>{navigate('/notifications');}}> <NotificationsIcon/> </IconButton>

    </>
  )
}


export default Navbar;