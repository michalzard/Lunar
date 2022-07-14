import { Avatar, Backdrop, TextField, Button, Typography } from '@mui/material';
import React,{useState} from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IosShareIcon from '@mui/icons-material/IosShare';
import '../../styles/components/Post/PostContainer.scss';
import CloseIcon from '@mui/icons-material/Close';

//TODO: 
// make ... dropdown  - follow,bookmark,mute,block,report
// share button  - dropdown menu with (copy link to post,bookmark)

function PostContainer({post}) {

  const openActionMenu=(e)=>{e.preventDefault();console.log("Action Menu Dropdown");}
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
    <PostPreview post={post}  open={previewOpen} setOpen={setPreviewOpen} />
    </div>
  )
}

export default PostContainer;

/**
 * (Desktop Only) For Image,Have preview with backdrop that show image,comment section on the right
 * (Mobile Only) For All Media, have Post on top and comment section right below it
 */
function PostPreview({post,open,setOpen}){
  
  return(
    <>
    <Backdrop className='preview-container' open={open} style={{zIndex:50}}>

    <div className='media_preview'>
    <div className='closeIcon'><CloseIcon onClick={()=>{setOpen(false)}}/></div>
    TODO : Media Preview
    
    </div>
    
    <div className='comments_preview_container'>
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
    <div className='comments'><ModeCommentIcon/><span className='commentCount'></span></div>
    <div className='reposts'><RepeatIcon/><span className='repostCount'></span></div>
    <div className='likes'><FavoriteBorderIcon/><span className='likeCount'></span></div>
    <div className='share'><IosShareIcon/></div>
    </div>

    </div>

    <div className='right'>
    <MoreHorizIcon className="more" onClick={setOpen}/>
    </div>
    </div>
    <span className='comment_divider'/>
    <section className='comment_section'>

    <TextField className="reply_input"  label={`Reply to ${post.author ? post.author.name : null}`}
    InputProps={{endAdornment:<Button variant="contained">Reply</Button>}}/>
    </section>
    </div>

    </Backdrop>
    </>
  )
}

function PostCommentEditor(){
  return(
    <>
    </>
  )
}