import { Avatar, Typography } from '@mui/material';
import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IosShareIcon from '@mui/icons-material/IosShare';
import '../../styles/components/Post/PostContainer.scss';

//TODO: 
// make ... dropdown  - follow,bookmark,mute,block,report
// share button  - dropdown menu with (copy link to post,bookmark)

function PostContainer({post}) {
  console.log(post);

  const openActionMenu=()=>{console.log("Action Menu Dropdown");}
  return (
    <div className='post_container'>
      {/* Actions - User liked, User reposted */}
    <div className='user_action'>
    <FavoriteIcon/>
    <Typography variant="caption">Giri liked</Typography>
    </div>
    
    <div className='author_info'>
    <Avatar className='avatar' src={post ? post.author.photoURL : ""}/>
    <div className='author'>{post ? <><Typography className='name'>{post.author.name}</Typography><Typography variant="caption" className='tag'>@{post.author.name}</Typography></> : null} </div>
    <Typography variant="caption" className="timeAgo">. 7m</Typography>
    <MoreHorizIcon className="action" onClick={openActionMenu}/>
    </div>
    
    <div className='content'>
    {post ? <Typography>{post.content}</Typography> : null}
    </div>

    <div className='media'>Video/Photo/Gif</div>
    <div className='interaction'>
    <div className='comments'><ModeCommentIcon/><span className='commentCount'>0</span></div>
    <div className='reposts'><RepeatIcon/><span className='repostCount'>0</span></div>
    <div className='likes'><FavoriteBorderIcon/><span className='likeCount'>0</span></div>
    <div className='share'><IosShareIcon/></div>
    
    </div>
    </div>
  )
}

export default PostContainer;