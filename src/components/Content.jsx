import React from 'react';
import "../styles/components/Content.scss";
import {Typography,Fab} from "@mui/material";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import UserProfile from './Profile/UserProfile';
import ProfileEdit from './Profile/ProfileEdit';
import PostEditor from './Post/PostEditor';

import SettingsMenu from './Settings/SettingsMenu';
// import AccountInformation from './Settings/AccountInformation';
// import Acessibility from "./Settings/Accessibility";
import Bookmarks from './Bookmarks';
import {Routes,Route, Navigate,useNavigate} from 'react-router-dom';

function Content({setPostUnsaved,user,filter,setFilter,lastSelectedMedia,setLastSelectedMedia,postText,setPostText,postAlert}) {
  const navigate=useNavigate();
  return (
    <div className='content'>
    
    <Routes>
    
    <Route path='/home'  element={
    <>
    <div className='_content'>
    <Typography variant='body1' color='white'> /Home content</Typography>
    <div className='fab' onClick={()=>{navigate('/post')}}><Fab><HistoryEduIcon/></Fab></div>
    </div>
    </>}/>


    {/** REDIRECT BACK TO HOME IF NAME ISNT SPECIFIED /U/NAME */}
    <Route path='/u/' element={<Navigate replace to='/home'/>}/>

    <Route path='/u/:name' element={<UserProfile user={user} />}/>
    <Route path='/u/:name/edit' element={<ProfileEdit user={user} />}/>

   
    <Route path='/post' element={<PostEditor setPostUnsaved={setPostUnsaved} filter={filter} setFilter={setFilter} postAlert={postAlert}
    lastSelectedMedia={lastSelectedMedia} setLastSelectedMedia={setLastSelectedMedia} postText={postText} setPostText={setPostText} />}/>
    <Route path='/settings' element={<SettingsMenu />}/>
    <Route path='/bookmarks' element={<Bookmarks/>}/>

    </Routes>
    
    {/* {isDisplay('home','search') ? <Navbar display={display} setDisplay={setDisplay}/> : null} */}

    
    {/* {isDisplay('settings') ? <SettingsMenu display={display} setDisplay={setDisplay} /> : null} */}
    {/* {isDisplay('settings-account information') ?  <AccountInformation user={user}/>: null}
    {isDisplay('settings-accessibility') ? <Acessibility/> : null} */}

    {/* {isDisplay('bookmarks') ? <Bookmarks/> : null} */}

    </div>

  )
}

export default Content;