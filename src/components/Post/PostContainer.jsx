import { Avatar, Backdrop, TextField, Button, Typography, Menu, MenuItem, Snackbar, Alert, Slide } from '@mui/material';
import React,{ useState} from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IosShareIcon from '@mui/icons-material/IosShare';
import '../../styles/components/Post/PostContainer.scss';
import CloseIcon from '@mui/icons-material/Close';
import DefaultImage from "../../assets/lunarsystem.jpg";
//menus
import ActionMenu from './ActionMenu';
//
import LinkIcon from '@mui/icons-material/Link';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

function PostContainer({isMobile,post}) {

  const [previewOpen,setPreviewOpen] = useState(false);

  //buttons
  const [commentCount,setCommentCount]=useState(0);
  const [reposted,setReposted]=useState(false);
  const [repostCount,setRepostCount]=useState(0);
  const [liked,setLiked]=useState(false);
  const [likeCount,setLikeCount]=useState(0);

  
  const [shareMenuAnchor,setShareMenuAnchor] = useState(null);
  const [actionMenuAnchor,setActionMenuAnchor] = useState(null);

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
    {post ?
    <>
    <Typography className='name'>{post.author.name}</Typography>
    <div className='tagAndTime'>
    <Typography variant="caption" className='tag'>@{post.author.name}</Typography>
    <Typography variant="caption" className="timeAgo"> ~ 7m</Typography></div>
    </> 
    : null} 
    
    
    </div>
    {post ? <Typography>{post.content}</Typography> : null}
    
    {/* TODO: CSS animation */}
    <div className='interaction'>
    <div className='comments'><ModeCommentIcon onClick={()=>{setPreviewOpen(true);}}/>
    <Typography className='commentCount' component="span">{commentCount > 0 ? commentCount : null}</Typography></div>
    <div className='likes' onClick={()=>{setLiked(!liked);setLikeCount(liked ? likeCount-1 : likeCount+1);}}>{liked ? <FavoriteIcon style={{color:"red"}} /> : <FavoriteBorderIcon />}
    <Typography className='likeCount' component="span">{likeCount > 0 ? likeCount : null}</Typography></div>
    <div className='reposts' onClick={()=>{setReposted(!reposted);setRepostCount(reposted ? repostCount-1 : repostCount+1);}}>
    <RepeatIcon style={{color:reposted ? "greenyellow" : null}} />
    <Typography className='likeCount' component="span">{repostCount > 0 ? repostCount : null}</Typography></div>

    <div className='share' onClick={(e)=>{setShareMenuAnchor(e.currentTarget);}}><IosShareIcon/></div>
    <ShareMenu anchor={shareMenuAnchor} setShareMenuAnchor={setShareMenuAnchor}/>
    <ActionMenu isMobile={isMobile} anchor={actionMenuAnchor} setActionMenuAnchor={setActionMenuAnchor} author={post.author}/>
    </div>

    </div>

    <div className='right'>
    <MoreHorizIcon className="more" onClick={(e)=>{setActionMenuAnchor(e.currentTarget);}}/>
    </div>
    <PostPreview isMobile={isMobile} post={post}  open={previewOpen} reposted={reposted} liked={liked} 
    setOpen={setPreviewOpen} setLiked={setLiked} setReposted={setReposted} setShareMenuAnchor={setShareMenuAnchor} setActionMenuAnchor={setActionMenuAnchor}
    />
    
    </div>
  )
}

export default PostContainer;

/**
 * (Desktop Only) For Image,Have preview with backdrop that show image,comment section on the right
 * (Mobile Only) For All Media, have Post on top and comment section right below it
 */
function PostPreview({isMobile,post,open,setOpen,reposted,setReposted,liked,setLiked,setShareMenuAnchor,setActionMenuAnchor}){
  const fakeCommentArray=[
    "Wow","Wow","Wow","Wow","Wow","Wow","Wow","Wow","Wow","Wow","Wow","Wow","Wow","Wow","Wow","Wow","Wow",
  ]
  
  return(
    <>
    <Backdrop className='preview-container' open={open} style={{zIndex:10,backgroundColor:"rgba(0,0,0,.7)",backdropFilter:"blur(4px)"}}>
    {
      //mobile doesnt have media preview instead display media at the top as post preview
      isMobile ? null :
      <>
      <div className='media_preview'>
      <div className='closeIcon'><CloseIcon onClick={()=>{setOpen(false)}}/></div>
      <img src={DefaultImage} alt="Default Description"/>
      </div>  
      </>
    }
        
    <div className='comments_preview_container' style={{width:isMobile? "100%" : "400px"}}>
    <div className='post_container'>
      {/* Actions - User liked, User reposted */}
    <div className='avatar'>
    <Avatar src={post ? post.author.photoURL : ""}/>
    </div>
    
    <div className='main'>
    
    <div className='user_action' style={{justifyContent:isMobile ? "space-between" : null}}>
    <div className='a'> 
    {/** a container used to hold icon with user action so that it can be spaced out in mobile view,
     * because there's close icon on top right */}
    <FavoriteIcon className="icon"/>
    <Typography variant="caption" className='action'>Giri liked</Typography>
    </div>
    {
    isMobile ? <CloseIcon onClick={()=>{setOpen(false);}}/> : null
    }
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
    
    {/* TODO: CSS animation */}
    <div className='interaction'>
    <div className='likes' onClick={()=>{setLiked(!liked);}}>{liked ? <FavoriteIcon style={{color:"red"}} /> : <FavoriteBorderIcon />}
    <span className='likeCount'></span></div>
    <div className='reposts' onClick={()=>{setReposted(!reposted);}}> <RepeatIcon style={{color:reposted ? "greenyellow" : null}} /><span className='repostCount'></span></div>
    <div className='share' onClick={(e)=>{setShareMenuAnchor(e.currentTarget);}}><IosShareIcon/></div>
    </div>
    </div>
    </div>

    <span className='comment_divider'/>
    
    <TextField className="reply_input"  label={`Reply to ${post.author ? post.author.name : null}`}
    InputProps={{endAdornment:<Button variant="contained">Reply</Button>}}/>
    <section className='comment_section' id="comment_section">

      {
        fakeCommentArray.map((comment,i)=>{
          return <PostComment key={i} comment={post} liked={liked} setLiked={setLiked} reposted={reposted} setReposted={setReposted} setShareMenuAnchor={setShareMenuAnchor} setActionMenuAnchor={setActionMenuAnchor}/>
        })
      }

    </section>
    </div>

    </Backdrop>
    </>
  )
}


function PostComment({comment,liked,setLiked,reposted,setReposted,setShareMenuAnchor,setActionMenuAnchor}){
  
  return(
    <div className='post_container'>
    {/* Actions - User liked, User reposted */}
  <div className='comment_avatar'>
  <Avatar src={comment ? comment.author.photoURL : ""}/>
  </div>
  
  <div className='main'>


  <div className='author'>
  {comment ? <>
  <Typography className='name'>{comment.author.name}</Typography>
  <div className='tagAndTime'>
  <Typography variant="caption" className='tag'>@{comment.author.name}</Typography>
  <Typography variant="caption" className="timeAgo"> ~ 7m</Typography></div>
  </> : null} 
  
  
  </div>
  {comment ? <Typography>{comment.content}</Typography> : null}
  
  
  <div className='comment_interaction'>
  <div className='likes' onClick={()=>{setLiked(!liked);}}>{liked ? <FavoriteIcon style={{color:"red"}} /> : <FavoriteBorderIcon />}
  <span className='likeCount'></span></div>
  <div className='reposts' onClick={()=>{setReposted(!reposted);}}> <RepeatIcon style={{color:reposted ? "greenyellow" : null}} /><span className='repostCount'></span></div>
  <div className='share' onClick={(e)=>{setShareMenuAnchor(e.currentTarget);}}><IosShareIcon/></div>
  </div>

  </div>
  <div className='right'>
  <MoreHorizIcon className="more" onClick={(e)=>{setActionMenuAnchor(e.currentTarget);}}/>
  </div>
  </div>
  )
}




function ShareMenu({anchor,setShareMenuAnchor}){
  const [bookmarked,setBookmarked] = useState(false); 
  const [alertOpen,setAlertOpen] = useState(false);
  const closeAlert=()=>{
    setAlertOpen(false);
  }
  const menuClose=()=>{
    setShareMenuAnchor(null);
  }
  const copyURLtoClipboard=()=>{
    window.navigator.clipboard.writeText(window.location.href);
  }

  return (
    <Menu
    open={Boolean(anchor)}
    anchorEl={anchor}
    onClose={menuClose}
    id="ShareMenu"
    >
    <MenuItem onClick={()=>{copyURLtoClipboard();setAlertOpen(true);}}><LinkIcon/> Copy Link</MenuItem>
    <MenuItem onClick={()=>{bookmarked ? setBookmarked(false) : setBookmarked(true);}}>
    { bookmarked ? <BookmarkAddedIcon style={{color:"greenyellow"}}/> : <BookmarkAddIcon/> }
    { bookmarked ? "Added to Bookmark":"Add to Bookmark"}
    </MenuItem>
    <Snackbar
    anchorOrigin={{vertical:"bottom",horizontal:"right"}}
    open={alertOpen}
    autoHideDuration={3000}
    onClose={closeAlert}
    TransitionComponent={Slide}
    >
    <Alert color="success">Post's URL has been copied</Alert>
    </Snackbar>
    </Menu>
  )
}


