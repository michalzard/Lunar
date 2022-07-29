import { Button,Divider,Menu, TextField, Typography,Switch , CircularProgress, Dialog, DialogActions, DialogTitle} from '@mui/material';
import React, { useEffect, useState } from 'react';
import '../styles/components/Bookmarks.scss';
import axios from "axios";
import PublicIcon from '@mui/icons-material/Public';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import QuizIcon from '@mui/icons-material/Quiz';
import { useParams } from 'react-router-dom';
import PostContainer from './Post/PostContainer';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BASE_URI=`http://localhost:${process.env.REACT_APP_SERVER_PORT}`;


function Bookmarks() {
    const [bookmarks,setBookmarks] = useState([]);
    const [menuEl,setMenuEl] = useState(null);
    const open=Boolean(menuEl);
    const closeBookMark=()=>{setMenuEl(null);}
    // const [selectedBookmark,selectBookmark] = useState(null);
    //TODO show list on preview onClick

    useEffect(()=>{
        if(localStorage.getItem("sessionID")){
        axios.get(`${BASE_URI}/bookmark/all?author=${localStorage.getItem("sessionID")}`).then(data=>{
            const {message,bookmarks} = data.data;
            console.log(message);
            setBookmarks(bookmarks);
        }).catch(err=>{
            console.log(err);
        });
    }
    },[]);
    return (
    <div className='bookmarks'>
        <Button variant='text' className='createButton'onClick={(e)=>{setMenuEl(e.currentTarget)}}>Create Bookmark</Button>
        <Divider variant='middle' />
        <div className='bookmarkLists'>
        {
            bookmarks.length>0 ? bookmarks.map((bookmark,i)=>{
                
                return <BookmarkPreview key={i} id={bookmark._id} name={bookmark.title} desc={bookmark.description} isPublic={bookmark.isPublic}/>
            })
            :
            <BookmarksNotFound/>
        }
        </div>
        <BookmarkEditor 
        anchorEl={menuEl}
        openBool={open}
        onClose={closeBookMark}
        setBookmarks={setBookmarks}
        />
    </div>
  )
}

//TODO : add
function BookmarkEditor({anchorEl,openBool,onClose,setBookmarks}){
    // const [name,setName] = useState('');
    // const [desc,setDesc] = useState('');
    const [isPublic,setIsPublic] = useState(true);

    const maxLengthForName=20;
    const maxLengthForDescription=200;

    const createBookMark=()=>{
        // axios.post bookmark/new
        // `${BASE_URI}/bookmark/new`

    }

    return(
    <Menu
    id="create-lists"
    anchorEl={anchorEl}
    open={openBool}
    onClose={onClose}
    >
    <div className='editor_header'>
    <Typography variant='h5'>Create Bookmark</Typography>
    <Button variant='contained' onClick={()=>{onClose();createBookMark();}}>Save</Button>  
    </div>
    <div className='fields'>
    <TextField variant='outlined' onChange={(e)=>{/**setName */}} fullWidth placeholder='Bookmark name' inputProps={{maxLength:maxLengthForName}} />
    <TextField variant='outlined' onChange={(e)=>{/**setDesc */}} maxRows={5} multiline fullWidth placeholder='Bookmark description' inputProps={{maxLength:maxLengthForDescription}} />
     <div className='toggle'>
     <Typography color={isPublic ? 'gray' : null}>Private</Typography>
     <Switch checked={isPublic} value={isPublic} color='secondary' onChange={()=>{setIsPublic(!isPublic);}}/>
     <Typography color={!isPublic ? 'gray' : null}>Public</Typography>
     </div>
    </div>
    </Menu>
    )
}


function BookmarkPreview({name,id,desc,isPublic}){
    return(
        <a href={`/bookmarks/${id}`}>
        <div className='bookmark'>
        <div className='info'>
        <Typography className='name'>{name ? name : null} 
        
        </Typography>
        <Typography className='desc' variant='caption'>{desc ? desc : null}</Typography>
        </div>
        <div className='icons'>
        {
            isPublic ? <PublicIcon className="public"/> : <LinkOffIcon className="public"/>
        }
        <ArrowForwardIcon/>
        </div>
        </div>
        </a>
    )
}

function BookmarkById({isMobile,user}){
    const {id} = useParams();
    const [loading,setLoading] = useState(true);
    const [bookmark,setBookmark] = useState([]);

    useEffect(()=>{
    axios.get(`${BASE_URI}/bookmark/${id}?session=${localStorage.getItem("sessionID")}`).then(data=>{
        const {message,bookmark} = data.data;
        if(message || bookmark) setLoading(false);
        setBookmark(bookmark);
    }).catch(err=>console.log(err));

    },[id]);

    const [clearBkOpen,setClearBkOpen] = useState(false);

    const clearBookmarkList=()=>{
    if(bookmark){
    axios.patch(`${BASE_URI}/bookmark/clear`,{session:localStorage.getItem("sessionID"),bookmarkID:bookmark._id})
    .then(data=>{ 
    const {message,bookmark} = data.data;
    console.log(data.data);
    if(message.includes("Success")){setBookmark(bookmark); setClearBkOpen(false);}
    })

    } 
    }

    return(
        <div className="bookmark_posts_container">
            {
                loading ? <CircularProgress/>
                :
                <>
                
                <div className="actions"> <a href="/bookmarks" className="exit"><ArrowBackIcon/></a>
                {/* <b>TODO</b><EditOffIcon/> */}
                <MoreHorizIcon className="removeAllBookmarks" onClick={()=>setClearBkOpen(true)}/>
                <Dialog open={clearBkOpen} id="clearBkMenu">
                <DialogTitle variant="h6" gutterBottom>Are you sure?</DialogTitle>
                <Typography variant="subtitle1" component="span">Are you sure you want to erase your bookmarks ?<br/>
                <u style={{color:"red"}}><strong>This action is irreversible</strong></u></Typography>

                <DialogActions>
                <Button variant="contained" color="error" onClick={clearBookmarkList}>Delete</Button>
                <Button variant="outlined" color="error" onClick={()=>{setClearBkOpen(false);}}>Cancel</Button>
                </DialogActions>
                </Dialog>
                </div>
                
                <div className='title'>
                <Typography variant="h5" color="white">{bookmark ? bookmark.title : null}</Typography>
                <Typography variant="h6" color="lightgray">{bookmark ? bookmark.description : null}</Typography>
                </div>
                <span className='divider'/>
                <div className='markedPosts'>
                {
                    bookmark ? 
                    bookmark.markedPosts ? bookmark.markedPosts.map((markedPost)=>{
                    return <PostContainer isBookmark={true} key={markedPost._id} isMobile={isMobile} user={user} post={markedPost} />})
                    : <BookmarksNotFound warningTitle="There are no marked posts yet." caption="You can add to this list with bookmark on posts"/>
                    : <Typography color="red">This bookmark is private</Typography>
                }
                </div>
                
                </>
            }
        
        </div>
    )
}


function BookmarksNotFound({warningTitle,caption}){
    return(
        <div className='bm_notfound'>
        <QuizIcon/> <div className='warning'><Typography>{warningTitle ? warningTitle : "There are no bookmarks yet."}</Typography>
        <Typography variant='caption'>{caption ? caption : "You can create one with button on top."}</Typography></div>
        </div>
    )
}


export {Bookmarks,BookmarkById,BookmarkPreview};

