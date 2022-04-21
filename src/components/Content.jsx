import React from 'react';
import "../styles/components/Content.scss";
import {Typography,Fab} from "@mui/material";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import UserProfile from './Profile/UserProfile';
import ProfileEdit from './Profile/ProfileEdit';
import PostEditor from './Post/PostEditor';
import Navbar from './Navbar';
import SettingsMenu from './Settings/SettingsMenu';
import AccountInformation from './Settings/AccountInformation';
import Acessibility from "./Settings/Accessibility";
import Bookmarks from './Bookmarks';
import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom';

function Content({display,setDisplay,isDisplay,setPostUnsaved,user}) {
  // const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Router>
    <div className='content'>
    
    <Routes>
    <Route path='/' element={<Navigate to='/home'/>}></Route>
    {/* <Route path='/home' element={}/> */}

    <Route path='/u/:name' element={<UserProfile user={user} setDisplay={setDisplay}/>}/>
    <Route path='/u/:name/edit' element={<ProfileEdit user={user} />}/>
    <Route path='/post' element={<PostEditor setPostUnsaved={setPostUnsaved}/>}/>

    <Route path='/home'  element={<><div className='_content'>
    <Typography variant='body1' color='white'>Content</Typography>
    </div><Navbar display={display} setDisplay={setDisplay}/></>}/>

    <Route path='/search' element={<Navbar display={display} setDisplay={setDisplay}/>}/>

    <Route path='/settings' element={<SettingsMenu display={display} setDisplay={setDisplay} />}/>

    <Route path='/bookmarks' element={<Bookmarks/>}/>
    </Routes>

    {/* {isDisplay('user profile') ? <UserProfile user={user} setDisplay={setDisplay}/> : null}   */}
    {/* {isDisplay('edit profile') ? <ProfileEdit user={user} /> : null} */}
    {/* {isDisplay('post editor') ? <PostEditor setPostUnsaved={setPostUnsaved}/> : null} */}
    
  
    {/* {isDisplay('home','search') ? <Navbar display={display} setDisplay={setDisplay}/> : null} */}

    
    {/* {isDisplay('settings') ? <SettingsMenu display={display} setDisplay={setDisplay} /> : null} */}
    {isDisplay('settings-account information') ?  <AccountInformation user={user}/>: null}
    {isDisplay('settings-accessibility') ? <Acessibility/> : null}

    {/* {isDisplay('bookmarks') ? <Bookmarks/> : null} */}

    </div>
    </Router>
  )
}

export default Content;