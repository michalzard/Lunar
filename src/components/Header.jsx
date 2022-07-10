import React, { useState } from 'react'
import "../styles/components/Header.scss";
import { Avatar,Button,TextField,Typography } from '@mui/material';
import ProfileDrawer from './Profile/ProfileDrawer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import SearchIcon from '@mui/icons-material/Search';
import DiscardDialog from './Post/DiscardDialog';
import {Routes,Route,useNavigate,useParams} from 'react-router-dom';

function Header({isMobile,isPostUnsaved,user,setUser,submitPost}) {
  const [opened,setOpen] = useState(false);
  const [discardOpen,setDiscardOpen] = useState(false);

  const capitalize=(word)=>{return word.charAt(0).toUpperCase() + word.substring(1,14) + (word.length>14 ? '...' : '')};
  

  return (
    //LOCALHOST:3000/nameoftheheader 

    <div className='header' style={{justifyContent:isMobile ? null : "center"}}>  

    <Routes>

    <Route path='/home' element={
    <>
    {isMobile ? <Avatar alt='User Avatar' onClick={()=>{setOpen(true);}}/> : null } 
    <Typography variant='h5' color='white'>Home feed</Typography>
    </> }/>

    <Route path='/u/:name' element={
    <HeaderWithBackArrow flexDirection='column' elements={
    <div className='info'>
    <Typography variant='caption'> 0 Posts </Typography>
    </div>    
    } location={'/home'}/>
    }/>


    <Route path={`/u/${user.name}/edit`} element={
    <HeaderWithBackArrow justify='space-between' elements={<>
    <Typography variant='h5' color='white'>Profile Edit</Typography>
    <div className='edit_btn'>
    <Button variant='contained'>Save</Button>
    </div></>
    } location={`/u/${user.name}`} />
    }/>
    
    <Route path='/post' element={
    <HeaderWithBackArrow justify='space-between' elements={
    <>
    <Typography variant='h5' color='white'>Create post</Typography>
    <div className='post_btn'>
    <Button variant='text' onClick={()=>{console.log("open drafts")}}>Drafts</Button>
    <Button variant='contained' onClick={()=>{console.log("submitted post");submitPost();}}>Post</Button>
    </div>
    </>
    }
    location={'/home'}
    />
    }/>

    {
      /**
    <span onClick={()=>{navigate(`/home`)}}><ArrowBackIcon/></span>
    <Typography variant='h5' color='white'>Create post</Typography>
    <div className='post_btn'>
    <Button variant='text'>Drafts</Button>
    <Button variant='contained'>Post</Button>
    </div>
       */
    }

    {

    ['/bookmarks','/settings'].map((paths,i)=>{
    return <Route path={paths} key={i} element={
      <HeaderWithBackArrow elements={<>
        <Typography variant='h5' color='white'>{capitalize(paths.substring(1,paths.length))}</Typography>
      </>
      } location='/home'/>
    }/>
    })
    }
    <Route path='/search' element={
      <HeaderWithBackArrow elements={
      <div className='searchbar'> <TextField variant='outlined' placeholder='Search' fullWidth  /> </div>
      } location='/home'/>
    }/>

    </Routes>

  {/* ANY POPUPS OR DIALOGS TRIGGERED BY BUTTONS/ACTION FROM HEADER WILL BE HERE */}
    {
      isMobile ? 
      <>
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
      </>
      : null
    }
   

    </div>
  )
}

/**
 * 
 * <HeaderWithBackArrow elements={
    <div className='container'>
    <Typography variant='h5' color='white'>Profile Edit</Typography>
    <div className='edit_btn'>
    <Button variant='contained'>Save</Button>
    </div>
    </div>
    } location={`/u/${user.name}`} />
    }/>
 */
function HeaderWithBackArrow({location,elements,flexDirection,justify}){
  const navigate=useNavigate();
  const {name}=useParams();
  
  const capitalize=(word)=>{return word.charAt(0).toUpperCase() + word.substring(1,14) + (word.length>14 ? '...' : '')};

  return(
    <>
    <span onClick={()=>{navigate(location)}}><ArrowBackIcon/></span>
    <div className={`container${flexDirection ? flexDirection : ''}`} style={{justifyContent:justify ? justify : null}}>
    {name ? <div className='name'> <Typography variant='h5' color='white'>{capitalize(name)}'s Profile</Typography> </div> : null}
    {elements}
    </div>
    </>
  )
}


export default Header;