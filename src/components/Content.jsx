import React from 'react';
import "../styles/components/Content.scss";
import {Typography,Fab} from "@mui/material";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import UserProfile from './UserProfile';
import ProfileEdit from './ProfileEdit';
import PostEditor from './Post/PostEditor';
import Navbar from './Navbar';
import SettingsMenu from './Settings/SettingsMenu';
import AccountInformation from './Settings/AccountInformation';
import Acessibility from "./Settings/Accessibility";



function Content({display,setDisplay,isDisplay,setPostUnsaved}) {
  return (
    <div className='content'>
    {isDisplay('home') ? 
    <div className='_content'>
    <Typography variant='body1' color='white'>Content</Typography>
    
    </div>
    : null }
    {isDisplay('user profile') ? <UserProfile setDisplay={setDisplay}/> : null}  
    {isDisplay('edit profile') ? <ProfileEdit/> : null}
    {isDisplay('post editor') ? <PostEditor setPostUnsaved={setPostUnsaved}/> : null}
    
    {
    isDisplay('home') ?
    <div className='fab'>
    <Fab disableRipple onClick={()=>{setDisplay('Post Editor')}}> <HistoryEduIcon/> </Fab>
    </div>
    : null 
    }
    {isDisplay('home','search') ? <Navbar display={display} setDisplay={setDisplay}/> : null}

    
    {isDisplay('settings') ? <SettingsMenu display={display} setDisplay={setDisplay} /> : null}
    {isDisplay('settings-account information') ?  <AccountInformation/>: null}
    {isDisplay('settings-accessibility') ? <Acessibility/> : null}

    </div>
  )
}

export default Content;