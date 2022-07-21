import React, { useEffect, useState } from 'react'
import "../../styles/components/Profile/UserProfile.scss";
import {Avatar,Typography,Button} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LinkIcon from '@mui/icons-material/Link';
// import InterestsIcon from '@mui/icons-material/Interests';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate , useParams } from 'react-router-dom';
import axios from 'axios';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PostContainer from '../Post/PostContainer';
import NoteIcon from '@mui/icons-material/Note';

function UserProfile({isMobile,user}) {
  const {name}= useParams();
  const [isLoading,setLoading]=useState(true);
  const [profileNotFound,setProfileNotFound]=useState(false);  
  const [fetchedUser,setFetchedUser] = useState({}); //State for if you need to fetch diff profile
  const [filter,setFilter]=useState('Posts');
  const highlightColor='#bb86fc';

  const navigate=useNavigate();


  //Everytime name changes in url params this fetches profile info to see if there's existing profile
  useEffect(()=>{
  //if not logged in back to login page
  if(!localStorage.getItem("sessionID")) navigate("/login");
  //if looking up your own profile,avoid fetching for no reason
  if(user.displayName===name) {
  setFetchedUser(user);
  setProfileNotFound(false);
  setLoading(false);
  }
  else{
    console.log(name);
    axios.get(`${process.env.REACT_APP_USER_ROUTE}/${name}`).then((data)=>{
      const {user} = data.data;
      console.log(data.data);
      if(!user) setProfileNotFound(true);
      else setFetchedUser(user);
      setLoading(false);
    }).catch(err=>{
      if(err) {setProfileNotFound(true);setLoading(false);}
    })
  }  
  },[user,name,navigate]);

  const [posts,setPosts]=useState([]);

  useEffect(()=>{
    switch(filter){
      case "Posts" :
      axios.get(`${process.env.REACT_APP_POST_ROUTE}/all?author=${name}`)
      .then(data=>{
        const {posts} = data.data;
        if(posts) setPosts(posts);
      })
      break;
      case "Replies" :

      break;
      case "Media" :

      break;
      case "Likes" :
      
      break;
      default: break;
    }
   
  },[name,filter])

  return (
    
    <div className='user_profile'>
    {
    isLoading ? <LinearProgress color='secondary'/> 
    : 
    <>
    {
    profileNotFound ? <ProfileNotFound name={name}/> 
    :
    <>
    <div className='user_info'>
    <div className='photo'>
    <Avatar/>
    { user.name === name ? <Button variant='outlined' onClick={()=>{navigate(`/u/${fetchedUser.tag}/edit`)}}>Edit profile</Button> : null }
    </div>
    <div className='info'>
    <div className='user_name'>
    
    <Typography variant='body1' className='name'>{fetchedUser ? fetchedUser.displayName : 'Username'}</Typography> 
    <Typography variant='caption' className='tag'>{fetchedUser ? `@${fetchedUser.tag}` : '@Usertag'}</Typography>
    </div>
    </div>
    <div className='description'>
    <Typography variant='caption'>{ fetchedUser.profile ? fetchedUser.profile.bio : 'Bio' }</Typography>
    </div>
    <div className='interests'>
    {
      fetchedUser.profile.location ? <Typography><LocationOnIcon/> {fetchedUser.profile.location}</Typography> : null 
    }
    {
      fetchedUser.profile.web ? <Typography><LinkIcon/> {fetchedUser.profile.web}</Typography> : null 
    }
    {
      fetchedUser.profile.birthday ? <Typography><CalendarMonthIcon/> {new Date(fetchedUser.profile.birthday).toUTCString().substring(0,17)}</Typography> : null 
    }

    </div>
    </div>
    <div className='filter_buttons'>
    <Typography style={{borderBottom:filter==='Posts' ? `2px solid ${highlightColor}` : null}} variant='body1'>
    <span onClick={()=>{setFilter('Posts')}}>Posts</span>
    </Typography>
    <Typography style={{borderBottom:filter==='Replies' ? `2px solid ${highlightColor}` : null}} variant='body1'>
    <span onClick={()=>{setFilter('Replies')}}>Replies</span>
    </Typography>
    <Typography style={{borderBottom:filter==='Media' ? `2px solid ${highlightColor}` : null}} variant='body1'>
    <span onClick={()=>{setFilter('Media')}}>Media</span>
    </Typography>
    <Typography style={{borderBottom:filter==='Likes' ? `2px solid ${highlightColor}` : null}} variant='body1'>
    <span onClick={()=>{setFilter('Likes')}}>Likes</span>
    </Typography>
    </div>
    <div className='profile_content'>
    {
    // TODO : STYLIZE POSTS
    posts.length > 0  ? posts.map((post,i)=>{
      return (
       <PostContainer key={i} isMobile={isMobile} user={user} post={post}/>
      )
    }) 
    : <NoPosts name={name}/>
    }
    </div>
    </>
    }
    
    </>
    }
    
    </div>
  )
}

function ProfileNotFound({name}){
  return(
    <div className='profile_notfound'>
      <SupervisedUserCircleIcon/> <Typography>{name ? name : 'Profile'} doesn't exist</Typography>
    </div>
  )
}


function NoPosts({name}){
  return(
    <div className='no_posts'>
    <NoteIcon/> 
    <Typography variant="subtitle1">{name} hasn't posted yet.</Typography>
    </div>
  )
}

export default UserProfile;