import { Avatar, Backdrop, TextField, Button, Typography, Menu, MenuItem, Snackbar, Alert, Slide,Dialog,DialogTitle,DialogContent} from '@mui/material';
import React,{ useEffect, useState} from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IosShareIcon from '@mui/icons-material/IosShare';
import '../../styles/components/Post/PostContainer.scss';
import CloseIcon from '@mui/icons-material/Close';
//menus
import ActionMenu from './ActionMenu';
//
import LinkIcon from '@mui/icons-material/Link';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import axios from 'axios';
import ForumIcon from '@mui/icons-material/Forum';
import Time from "time-ago";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import PushPinIcon from '@mui/icons-material/PushPin';
// import { BookmarkPreview } from '../Bookmarks';

import PublicIcon from '@mui/icons-material/Public';
import LinkOffIcon from '@mui/icons-material/LinkOff';

const BASE_URI=`http://localhost:${process.env.REACT_APP_SERVER_PORT}`;


function PostContainer({isBookmark,isMobile,user,post,setPosts,bookmarkList}) {

  const [previewOpen,setPreviewOpen] = useState(false);

  //buttons
  const [commentCount,setCommentCount]=useState(0);
  const [reposted,setReposted]=useState(false);
  const [repostCount,setRepostCount]=useState(0);
  const [liked,setLiked]=useState(false);
  const [likeCount,setLikeCount]=useState(0);
  //anchor
  const [shareMenuAnchor,setShareMenuAnchor] = useState(null);
  const [actionMenuAnchor,setActionMenuAnchor] = useState(null);

  //on page/post load
  useEffect(()=>{
  setLiked(post.likes.includes(user._id) ?  true : false);
  setLikeCount(post.likeCount);
  setReposted(post.reposts.includes(user._id) ?  true : false);
  setRepostCount(post.repostCount);
  setCommentCount(post.comments ? post.comments.length : 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[user._id]);
  

  const handleAction=(action)=>{
    //patch request to /post/update
    if(action){
    axios.patch(`${BASE_URI}/post/update`,{
      sessionID:localStorage.getItem("sessionID"),
      postID:post._id,
      action,
    }).then(data=>{
      const {result} = data.data;
      const {likes,reposts,count} = result;
      if(likes){
        setLikeCount(count);
        if(likes.includes(user._id)) setLiked(true);
        else setLiked(false);
      }
      if(reposts){
        setRepostCount(count);
        if(reposts.includes(user._id)) setReposted(true);
        else setReposted(false);
      }      
    }).catch(err=>{
      console.log(err);
    });
  }
  }

  return (
    <div className='post_container'>
      {/* Actions - User liked, User reposted */}
    <div className='avatar'>
    <Avatar src={post ? post.author.photoURL : ""}/>
    </div>

    <div className='main'>
    {isBookmark ? null 
    :
    <div className='user_action'>
    {/* <FavoriteIcon className="icon"/>
    <Typography variant="caption" className='action'>Giri liked</Typography> */}
    {
      post.pinned ?<><PushPinIcon className="icon"/><Typography className='action'>Pinned</Typography></> : null
    }
    </div>
    }
     

    <div className='author'>
    {post ?
    <>
    <Typography className='name'>{post.author.displayName}</Typography>
    <div className='tagAndTime'>
    <Typography variant="caption" className='tag'>@{post.author.tag}</Typography>
    <Typography variant="caption" className="timeAgo"> ~ {Time.ago(new Date(post.createdAt).getTime(),"mini-now")}</Typography></div>
    </> 
    : null} 
    {/* {post ? <span>{post.pinned ? "Pinned" : "X"}</span>: null} */}

    </div>
    {post ? <Typography>{post.content}</Typography> : null}
  
    {
    post.media ? 
    post.media.endsWith("mov") || post.media.endsWith("mp4") ? <div className="media">
    <video controls loop={true}> <source src={`${BASE_URI}/${post.media}`} type="video/mp4"/></video>
    </div> : <div className="media"> <img src={`${BASE_URI}/${post.media}`} /></div>
    : null
    }
    {/* TODO: CSS animation */}
    <div className='interaction'>
    <div className='comments'><ModeCommentIcon onClick={()=>{setPreviewOpen(true);}}/>
    <Typography className='commentCount' component="span">{commentCount > 0 ? commentCount : null}</Typography></div>
    <div className='likes' onClick={()=>{handleAction(liked ? "dislike" : "like");}}>{liked ? <FavoriteIcon style={{color:"red"}} /> : <FavoriteBorderIcon />}
    <Typography className='likeCount' component="span">{likeCount > 0 ? likeCount : null}</Typography></div>
    <div className='reposts' onClick={()=>{handleAction(reposted ? "repost-remove" : "repost");}}>
    <RepeatIcon style={{color:reposted ? "greenyellow" : null}} />
    <Typography className='likeCount' component="span">{repostCount > 0 ? repostCount : null}</Typography></div>

    <div className='share' onClick={(e)=>{setShareMenuAnchor(e.currentTarget);}}><IosShareIcon/></div>
    <ShareMenu anchor={shareMenuAnchor} bookmarkList={bookmarkList} setShareMenuAnchor={setShareMenuAnchor} post={post}/>
    <ActionMenu isComment={false} isMobile={isMobile} anchor={actionMenuAnchor} setActionMenuAnchor={setActionMenuAnchor} user={user} setPosts={setPosts} post={post}/>
    </div>

    </div>

    <div className='right'>
    {isBookmark ? null : <MoreHorizIcon className="more" onClick={(e)=>{setActionMenuAnchor(e.currentTarget);}}/>}
    </div>
    <PostPreview isMobile={isMobile} post={post}  open={previewOpen} reposted={reposted} liked={liked} likeCount={likeCount} repostCount={repostCount} user={user}
    setOpen={setPreviewOpen} setLiked={setLiked} setReposted={setReposted} setShareMenuAnchor={setShareMenuAnchor} setActionMenuAnchor={setActionMenuAnchor} 
    actionMenuAnchor={actionMenuAnchor} handleAction={handleAction}
    />
    
    </div>
  )
}

export default PostContainer;

/**
 * (Desktop Only) For Image,Have preview with backdrop that show image,comment section on the right
 * (Mobile Only) For All Media, have Post on top and comment section right below it
 */
function PostPreview({isMobile,user,post,open,setOpen,handleAction,reposted,liked,likeCount,repostCount,setShareMenuAnchor,setActionMenuAnchor,actionMenuAnchor}){

  const [comments,setComments]=useState([]);
  const [replyText,setReplyText] = useState("");
  const onReplyTextChange=(e)=>{
    setReplyText(e.target.value);
  }
  const submitReply=()=>{
    
    if(replyText.length > 0){
    axios.post(`${BASE_URI}/post/reply`,{
      sessionID:localStorage.getItem("sessionID"),
      postID:post._id,
      comment:replyText
    }).then(data=>{
      const {reply} = data.data;
      //add reply to the "beggining"
      setComments(old=>[reply,...old]);
      setReplyText("");

    })
    .catch(err=>{
      console.log(err);
    });
  }
  }

  useEffect(()=>{
    setComments(post.comments.reverse());
  },[post.comments])


  return(
    <Backdrop className='preview-container' open={open} style={{zIndex:10,backgroundColor:"rgba(0,0,0,.7)",backdropFilter:"blur(4px)"}}>
    {
      //mobile doesnt have media preview instead display media at the top as post preview
      isMobile ? null :
      <>
      <div className='media_preview'>
      <div className='closeIcon'><CloseIcon onClick={()=>{setOpen(false)}}/></div>
      <img src={null} alt="Default Description"/>
      </div>  
      </>
    }
        
    <div className='comments_preview_container' style={{width:isMobile? "100%" : "400px"}}>
    <div className='post_container'>
    
      {/* Actions - User liked, User reposted */}

    <div className='avatar'>
    <a href={`/u/${post.author.displayName}`}>
    <Avatar src={post ? post.author.photoURL : ""}/>
    </a>
    </div>
    <div className='main'>
    
    {
    isMobile ? <CloseIcon className="mobile_close" onClick={()=>{setOpen(false);}}/> : null
    }
    
    <div className='author'>
    {post ? <>
    <Typography className='name'><a href={`/u/${post.author.displayName}`}>{post.author.displayName}</a></Typography>
    <div className='tagAndTime'>
    <Typography variant="caption" className='tag'>@{post.author.displayName}</Typography>
    <Typography variant="caption" className="timeAgo"> ~ {Time.ago(new Date(post.createdAt).getTime(),"mini-now")}</Typography></div>
    </> : null} 
    
    </div>
    {post ? <Typography>{post.content}</Typography> : null}
    
    {/* TODO: CSS animation */}
    <div className='interaction'>
    <div className='likes' onClick={()=>{handleAction(liked ? "dislike" : "like");}}>{liked ? <FavoriteIcon style={{color:"red"}} /> : <FavoriteBorderIcon />}
    <Typography className='likeCount' component="span">{likeCount > 0 ? likeCount : null}</Typography></div>
    <div className='reposts' onClick={()=>{handleAction(reposted ? "repost-remove" : "repost");}}>
    <RepeatIcon style={{color:reposted ? "greenyellow" : null}} />
    <Typography className='likeCount' component="span">{repostCount > 0 ? repostCount : null}</Typography></div>
    <div className='share' onClick={(e)=>{setShareMenuAnchor(e.currentTarget);}}><IosShareIcon/></div>
    </div>
    </div>
    </div>
    
    <TextField className="reply_input" id="reply_input" onChange={onReplyTextChange} value={replyText}
    label={`Reply to ${post.author ? post.author.displayName : null}`} InputProps={{endAdornment:<Button onClick={()=>{submitReply();}} variant="contained">Reply</Button>}}/>
    <section className='comment_section' id="comment_section">
      {
        comments.length > 0 ? comments.map((comment,i)=>{
        return <PostComment isMobile={isMobile} actionMenuAnchor={actionMenuAnchor} key={i} user={user} comment={comment} setPosts={setComments} setShareMenuAnchor={setShareMenuAnchor} setActionMenuAnchor={setActionMenuAnchor}/>
        })
      : <NoComments/>
      }

    </section>
    </div>

    </Backdrop>
  )
}


function PostComment({comment,user,isMobile,setShareMenuAnchor,setPosts}){
    //buttons
    const [reposted,setReposted]=useState(false);
    const [repostCount,setRepostCount]=useState(0);
    const [liked,setLiked]=useState(false);
    const [likeCount,setLikeCount]=useState(0);
    const [commentAnchor,setCommentAnchor]=useState(null);
    //on page/post load
    useEffect(()=>{
      setLiked(comment.likes.includes(user._id) ?  true : false);
      setLikeCount(comment.likeCount);
      setReposted(comment.reposts.includes(user._id) ?  true : false);
      setRepostCount(comment.repostCount);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[comment]);


    const handleAction=(action)=>{
      
    if(comment){
    axios.patch(`${BASE_URI}/comment/${comment._id}/update`,{sessionID:localStorage.getItem("sessionID"),userID:user._id,action}).then(data=>{
      const {result} = data.data;
      const {likes,reposts,count} = result;
      if(likes){
        setLikeCount(count);
        if(likes.includes(user._id)) setLiked(true);
        else setLiked(false);
      }
      if(reposts){
        setRepostCount(count);
        if(reposts.includes(user._id)) setReposted(true);
        else setReposted(false);
      }

    }).catch(err=>console.log(err));
    }    
  }


  return(
    
  <div className='post_container'>
  {/* Actions - User liked, User reposted */}

  <div className='avatar'>
  <a href={`/u/${comment.author.displayName}`}><Avatar src={comment ? comment.author.profile.photoURL : ""}/></a>
  </div>
  
  <div className='main'>
  <div className='user_action' style={{justifyContent:isMobile ? "space-between" : null}}>
  <div className='a'> 
  <ReplyAllIcon className="icon reply"/>
  <Typography className='reply_action'>Replying to <a href={`/u/${comment.replyTo.displayName}`}>{comment.replyTo ? comment.replyTo.displayName : null}</a></Typography>
  </div>
  </div> 

  <div className='author'>
  {comment ? <>
  <Typography className='name'><a href={`/u/${comment.author.displayName}`}>{comment.author.displayName}</a></Typography>
  <div className='tagAndTime'>
  <Typography variant="caption" className='tag'>@{comment.author.displayName}</Typography>
  <Typography variant="caption" className="timeAgo"> ~ {Time.ago(new Date(comment.createdAt).getTime(),"mini-now")}</Typography></div>
  </> : null} 
  
  
  </div>
  {comment ? <Typography>{comment.content}</Typography> : null}
  
  
  <div className='comment_interaction'>
  <div className='likes' onClick={()=>{handleAction(liked ? "dislike" : "like")}}>{liked ? <FavoriteIcon style={{color:"red"}} /> : <FavoriteBorderIcon />}
  <span className='likeCount'>{likeCount > 0 ? likeCount : null}</span></div>
  <div className='reposts' onClick={()=>{handleAction(reposted ? "repost-remove" : "repost")}}> <RepeatIcon style={{color:reposted ? "greenyellow" : null}} />
  <span className='repostCount'>{repostCount > 0 ? repostCount : null}</span></div>
  <div className='share' onClick={(e)=>{setShareMenuAnchor(e.currentTarget);}}><IosShareIcon/></div>

  </div>

  </div>
  <div className='right'>
  <MoreHorizIcon className="more" onClick={(e)=>{setCommentAnchor(e.currentTarget);}}/>
  <ActionMenu isMobile={isMobile} anchor={commentAnchor} setActionMenuAnchor={setCommentAnchor} isComment={true} 
  user={user} setPosts={setPosts} post={comment}/>

  </div>
  </div>
  )
}

function NoComments(){
  return(
    <div className='no_comments'>
    <ForumIcon/> <Typography variant="subtitle2">No comments yet.<br/>Be first to share your thoughts</Typography>
    </div>
  )
}



function ShareMenu({anchor,setShareMenuAnchor,post,bookmarkList}){
  const copyURLtoClipboard=()=>{
    window.navigator.clipboard.writeText(window.location.href);
  }

  const [bookmarkOpen,setBookmarkOpen] = useState(false);
  const [selectedIndex,setSelectedIndex] = useState(-1);
  const [selectedBookmarkID,setSelectedBookmarkID] = useState(null);
  const [alertOpen,setAlertOpen] = useState(false);
  const [warningMessage,setWarningMessage] = useState("You need to select bookmark first!");
  const saveToBookmark=()=>{
    if(selectedBookmarkID){
    setAlertOpen(false);
    axios.post(`${BASE_URI}/bookmark/markPost`,{
      session:localStorage.getItem("sessionID"),
      postID:post._id,
      bookmarkID:selectedBookmarkID,
      add:true,
    }).then(data=>{
      const {message} = data.data;
      if(message) setWarningMessage(message);
    })
    .catch(err=>console.log(err));
  }else {
    //throw error
    setAlertOpen(true);
  }
  }
  
  return (
    <>
    <Menu
    open={Boolean(anchor)}
    anchorEl={anchor}
    onClose={()=>{setShareMenuAnchor(null);}}
    id="ShareMenu"
    >
    <MenuItem onClick={()=>{copyURLtoClipboard();setAlertOpen(true);}}><LinkIcon/> Copy Link</MenuItem>
    <MenuItem onClick={(e)=>{setBookmarkOpen(true);}}>
    <BookmarkAddIcon/> Add to Bookmark
    </MenuItem>
    <Snackbar
    anchorOrigin={{vertical:"bottom",horizontal:"right"}}
    open={alertOpen}
    autoHideDuration={3000}
    onClose={()=>{setAlertOpen(false);}}
    TransitionComponent={Slide}
    >
    <Alert color="success">Post's URL has been copied</Alert>
    </Snackbar>
    </Menu>
    <Dialog onClose={()=>{setBookmarkOpen(false);}} open={bookmarkOpen} id="BookmarkMenu">
    <DialogTitle className="title">Choose Bookmark <Button variant="contained" onClick={saveToBookmark}> Add </Button></DialogTitle>
    
    { alertOpen ? <Alert id='bmAlert' severity="error" onClose={()=>{setAlertOpen(false);}}> <Typography variant="subtitle2">{warningMessage ? warningMessage :""}</Typography></Alert>: null } 
    
    <DialogContent>
    {
      
      bookmarkList ? bookmarkList.length > 0 ? bookmarkList.map((bookmark,i)=>{
      return <div className={`bookmarkList ${selectedIndex === i ? "selected" : null}`} key={bookmark._id} onClick={()=>{setSelectedIndex(i);setSelectedBookmarkID(bookmark._id);}}> <Typography>{bookmark.title}</Typography> {bookmark.isPublic ? <PublicIcon className="public"/> : <LinkOffIcon className="public"/>} </div> }) : null
      : null
    }
    </DialogContent>
    </Dialog>
    
    </>
  )
}


