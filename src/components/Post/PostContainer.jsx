import { Avatar, Backdrop, Typography } from '@mui/material';
import React,{useState} from 'react'
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

  const openActionMenu=()=>{console.log("Action Menu Dropdown");}
  const [previewOpen,setPreviewOpen] = useState(false);

  return (
    <div className='post_container'>
      {/* Actions - User liked, User reposted */}
    <div className='avatar'>
    <Avatar src={post ? post.author.photoURL : ""}/>
    </div>
    
    <div className='main'>
    
    <div className='user_action'>
    <FavoriteIcon className="icon"/>
    <Typography variant="caption" className='action'>Giri liked</Typography>
    </div>

    <div className='author'>
    {post ? <>
    <Typography className='name'>{post.author.name}</Typography>
    <div className='tagAndTime'>
    <Typography variant="caption" className='tag'>@{post.author.name}</Typography>
    <Typography variant="caption" className="timeAgo"> ~ 7m</Typography></div>
    </> : null} 
    
    
    </div>
    {post ? <Typography>{post.content}</Typography> : null}
    
    
    <div className='interaction'>
    <div className='comments'><ModeCommentIcon onClick={()=>{setPreviewOpen(true);}}/><span className='commentCount'></span></div>
    <div className='reposts'><RepeatIcon/><span className='repostCount'></span></div>
    <div className='likes'><FavoriteBorderIcon/><span className='likeCount'></span></div>
    <div className='share'><IosShareIcon/></div>
    </div>

    </div>

    <div className='right'>
    <MoreHorizIcon className="more" onClick={openActionMenu}/>
    </div>
    <PostPreview post={post} open={previewOpen} setOpen={setPreviewOpen} />
    </div>
  )
}

export default PostContainer;

/**
 * (Desktop Only) For Image,Have preview with backdrop that show image,comment section on the right
 */
function PostPreview({post,open,setOpen}){
  
  return(
    <>
    <Backdrop className='preview-container' open={open} onClick={()=>{setOpen(false);}} style={{zIndex:50}}>
    <div>
    Comment Preview
    </div>
    </Backdrop>
    </>
  )
}