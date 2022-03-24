import React from 'react'
import {Drawer, Typography,Avatar} from '@mui/material';
import "../styles/components/ProfileDrawer.scss";
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';


function ProfileDrawer({anchor,open,setOpen,setDisplay}) {
    const onDrawerClose=()=>{
        setOpen(false);
    }
  return (
    <Drawer
        anchor={anchor}
        open={open}
        onClose={onDrawerClose}
        className='ProfileDrawer'
    >    
    <div className='account_info'>
    <Typography variant='body1'>Account Info</Typography>
    <CloseIcon onClick={()=>{setOpen(false);}}/>
    </div>

    <div className='user_info'>
    <Avatar/>
    <div className='user_i'>
    <Typography variant='body2'>Username</Typography>
    <Typography variant='body2' className='tag'>@Usertag</Typography>
    </div>
    </div>

    <div className='followCount'>
    <Typography variant='body2' className='following'>0 <span>following</span></Typography>
    <Typography variant='body2' className='followers'>0 <span>followers</span></Typography>
    </div>

    <div className='action_buttons'>
    <Typography variant='body1'><span onClick={()=>{setDisplay('User Profile');setOpen(false);}}><PersonIcon/> Profile</span></Typography>
    <Typography variant='body1'><span onClick={()=>{setDisplay('Settings');setOpen(false);}}><SettingsIcon/>Settings</span></Typography>
    <Typography variant='body2'>Log out</Typography>
  
    </div>

    </Drawer>
  )
}

export default ProfileDrawer;