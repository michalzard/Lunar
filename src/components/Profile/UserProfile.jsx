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
  if(user.name===name) {
  setFetchedUser(user);
  setProfileNotFound(false);
  setLoading(false);
  }
  else{
    axios.get(`${process.env.REACT_APP_USER_ROUTE}/${name}`).then((data)=>{
      const {user} = data.data;
      if(!user) setProfileNotFound(true);
      else setFetchedUser(user);
      setLoading(false);
    })
  }  
  },[user,name]);

  const [posts,setPosts]=useState([]);

  useEffect(()=>{
    switch(filter){
      case "Posts" :
      axios.post(`${process.env.REACT_APP_POST_ROUTE}`,{author:localStorage.getItem("sessionID")})
      .then(data=>{
        const {message,posts} = data.data;
        console.log(message);
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
   
  },[filter])

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
    { user.name === name ? <Button variant='outlined' onClick={()=>{navigate(`/u/${fetchedUser.name}/edit`)}}>Edit profile</Button> : null }
    </div>
    <div className='info'>
    <div className='user_name'>
    
    <Typography variant='body1' className='name'>{fetchedUser ? fetchedUser.name : 'Username'}</Typography> 
    <Typography variant='caption' className='tag'>{fetchedUser ? `@${fetchedUser.name}` : '@Usertag'}</Typography>
    </div>
    </div>
    <div className='description'>
    <Typography variant='caption'>{ fetchedUser.profile ? fetchedUser.profile.bio : 'Bio' }</Typography>
    </div>
    <div className='interests'>
    {
      fetchedUser.profile.location ? <><LocationOnIcon/> {fetchedUser.profile.location}</> : null 
    }
    {
      fetchedUser.profile.web ? <><LinkIcon/> {fetchedUser.profile.web}</> : null 
    }
    {
      fetchedUser.profile.birthday ? <div><CalendarMonthIcon/> {new Date(fetchedUser.profile.birthday).toUTCString().substring(0,17)}</div> : null 
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
       <PostContainer key={i} post={post}/>
      )
    }) 
    : "There are no posts"
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


export default UserProfile;