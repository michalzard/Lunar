import React, { useState } from 'react'
import "../styles/components/Header.scss";
import { Avatar,Button,TextField,Typography } from '@mui/material';
import ProfileDrawer from './Profile/ProfileDrawer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import DiscardDialog from './Post/DiscardDialog';
import {Routes,Route,useNavigate} from 'react-router-dom';


function Header({isPostUnsaved,user,setUser}) {
  const [opened,setOpen] = useState(false);
  const [discardOpen,setDiscardOpen] = useState(false);
  const navigate=useNavigate();
 
  // const location=useLocation();
  // const formattedLocation=()=>{
  //   return location.pathname.split('/')[1];
  // }
  // const capitalizeFirstLetter=(word)=>{
  //   return word.charAt(0).toUpperCase()+word.substring(1,word.length);
  // }
  return (
    //LOCALHOST:3000/nameoftheheader 

    <div className='header'>  

    <Routes>

    <Route path='/home' element={<> <Avatar alt='User Avatar' onClick={()=>{setOpen(true);}}/> <Typography variant='h5' color='white'>Header</Typography></>} />

    <Route path='/u/:name' element={<> <span onClick={()=>{navigate('/home')}}><ArrowBackIcon/></span> 
    <div className='info'>
    <Typography variant='h5' color='white'>{user ? user.name : null}</Typography>
    <Typography variant='caption'> 0 Posts </Typography>
    </div></>}/>

    <Route path={`/u/${user.name}/edit`} element={<>
    <span onClick={()=>{navigate(`/u/${user.name}`)}}><ArrowBackIcon/></span>
    <div className='edit_profile'>
    <Typography variant='h5' color='white'>Profile Edit</Typography>
    <Button variant='contained'>Save</Button>
    </div>
    </>} />
    

    </Routes>

    
  
{/*       
      <Avatar alt='User Avatar' onClick={()=>{setOpen(true);}}/>
      <Typography variant='h5' color='white'>{'Testing Header'} </Typography> */}
      {/* <Navigate to='/home' replace/> */}
    

      {/* <Router>
      <Routes>
        <Route path='/home' element={<>
          <Avatar alt='User Avatar' onClick={()=>{setOpen(true);}}/>
          <Typography variant='h5' color='white'>{'/Home'} </Typography>
        </>} />
      </Routes>
      </Router> */}
    {/* {
      isDisplay('home')  ?
      <Avatar alt='User Avatar' onClick={()=>{setOpen(true);}}/>
      : 
      <>
      { !isDisplay('search') ? 
      <span onClick={()=>{
      if(display.toLowerCase().includes('settings-')) setDisplay('Settings');
      else setDisplay('Home');
       // else back out to home
      if(isDisplay('edit profile')) setDisplay('User Profile');
      else if(isDisplay('post editor')){
        // logic if post unsaved -> discard dialog prompt
        isPostUnsaved ? setDiscardOpen(true) 
        // if nothing to save to drafts -> go back to home
        : setDisplay('Home'); 
      }
      
      }}><ArrowBackIcon/></span>
      : null}
      </>
    } */}

  {/* {
    isDisplay('user profile') ? 
    <div className='info'>
    <Typography variant='h6' color='white'>{user ? user.name : 'Username'}</Typography> 
    <Typography variant='caption'>0 Posts</Typography> 
    </div>
    : 
    <> 
    {isDisplay('user profile','post editor') ? 
    <div className='edit_profile'>
    {/* <Typography variant='h5' color='white'>{display}</Typography> */}
    {/* {
      isDisplay('post editor') ? 
      <div className='post_btn'>
      <Button variant='text'>Drafts</Button>
      <Button variant='contained'>Post</Button>
      </div>
      :
      <Button variant='contained' className='edit_button'>Save</Button> 
    }
    </div> 
    :  */}
    {/* <>
      {
        isDisplay('search') ? <>
        <SearchIcon/>
        <TextField variant='outlined' placeholder='Search Lunar' className='searchbar'  fullWidth />
        </>
        : <Typography variant='h5' color='white'>{display.split('-')[1] ? display.split('-')[1] : display} </Typography>
      }
    </>  
    }
    </> */}
  {/* }  */}

  {/* ANY POPUPS OR DIALOGS TRIGGERED BY BUTTONS/ACTION FROM HEADER WILL BE HERE */}
    <ProfileDrawer
    anchor='left' 
    open={opened}
    setOpen={setOpen}
    // setDisplay={setDisplay}
    user={user}
    setUser={setUser}
    />

    <DiscardDialog
    open={discardOpen}
    handleClose={()=>{setDiscardOpen(false)}}
    onDiscard={()=>{setDiscardOpen(false);}}
    onSave={()=>{setDiscardOpen(false);console.log('saved to drafts');}} //TODO DRAFTS VIEW
    />
    </div>
  )
}


export default Header;