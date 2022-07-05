import React from 'react'
import {Drawer, Typography,Avatar,Link} from '@mui/material';
import "../../styles/components/Profile/ProfileDrawer.scss";
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import axios from 'axios';


function ProfileDrawer({anchor,open,setOpen,user,setUser}) {
  const onDrawerClose=()=>{
        setOpen(false);
  }

  const logoutRequest=()=>{
    axios.post(`${process.env.REACT_APP_AUTH_ROUTE}/logout`,{id:localStorage.getItem('sessionID')}).then(data=>{
    const {message}=data.data;
    if(message.includes('User successfully logged out!')) {
      setUser({});//remove user object since you logged out
      if(localStorage.getItem('sessionID'))localStorage.removeItem('sessionID');
    }
    });
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
    <Typography variant='body2'>{user ? user.name : 'Username'}</Typography>
    <Typography variant='body2' className='tag'>{user.profile ? `@${user.profile.tag}` : '@Usertag'}</Typography>
    </div>
    </div>

    <div className='followCount'>
    <Typography variant='body2' className='following'>{user.profile ? user.profile.followers.followingCount : '0'} <span>following</span></Typography>
    <Typography variant='body2' className='followers'>{user.profile ? user.profile.followers.followedByCount : '0'} <span>followers</span></Typography>
    </div>

    <div className='action_buttons'>
    <Link href={`/u/${user.name}`} variant='body1'><PersonIcon/> Profile</Link>
    <Link href={`/bookmarks`} variant='body1'><BookmarkIcon/>Bookmarks</Link>
    <Link href={`/settings`} variant='body1' onClick={()=>{;setOpen(false);}}><SettingsIcon/>Setting</Link>

    <Link href={`/login`} variant='body2'><span onClick={()=>{setOpen(false);logoutRequest();}}>Log out</span></Link>
  
    </div>

    </Drawer>
  )
}

export default ProfileDrawer;