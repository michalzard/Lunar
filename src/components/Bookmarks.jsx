import { Button,Divider,Menu, TextField, Typography,Switch} from '@mui/material';
import React, { useEffect, useState } from 'react';
import '../styles/components/Bookmarks.scss';
import axios from "axios";
import PublicIcon from '@mui/icons-material/Public';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import QuizIcon from '@mui/icons-material/Quiz';



function Bookmarks() {
    const [bookmarks,setBookmarks] = useState([]);
    const [menuEl,setMenuEl] = useState(null);
    const open=Boolean(menuEl);
    const closeBookMark=()=>{setMenuEl(null);}
    
    // const [selectedBookmark,selectBookmark] = useState(null);
    //TODO show list on preview onClick


    useEffect(()=>{
        console.log("runs once on bookmark load");
        axios.get(`${process.env.REACT_APP_BOOKMARK_ROUTE}/all?author=${localStorage.getItem("sessionID")}`).then(data=>{
            const {message,bookmarks} = data.data;
            console.log(message);
            setBookmarks(bookmarks);
        }).catch(err=>{
            console.log(err);
        });
    },[]);
    return (
    <div className='bookmarks'>
        <Button variant='text' className='createButton'onClick={(e)=>{setMenuEl(e.currentTarget)}}>Create Bookmark</Button>
        <Divider variant='middle' />
        <div className='bookmarkLists'>
        {
            bookmarks.length>0 ? bookmarks.map((bookmark,i)=>{
                return <BookmarkPreview key={i} name={bookmark.title} desc={bookmark.description} isPublic={bookmark.isPublic}/>
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

export default Bookmarks;

//TODO : add
function BookmarkEditor({anchorEl,openBool,onClose,setBookmarks}){
    // const [name,setName] = useState('');
    // const [desc,setDesc] = useState('');
    const [isPublic,setIsPublic] = useState(true);

    const maxLengthForName=20;
    const maxLengthForDescription=200;

    const createBookMark=()=>{
        // axios.post bookmark/new
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


function BookmarkPreview({name,desc,isPublic}){
    return(
        <div className='bookmark' onClick={()=>{console.log('fetches all bookmarked posts')}}>
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
    )
}

function BookmarksNotFound(){
    return(
        <div className='bm_notfound'>
        <QuizIcon/> <div className='warning'><Typography>There's no bookmarks yet.</Typography>
        <Typography variant='caption'>You can create one with button on top.</Typography></div>
        </div>
    )
}