import { Button,Divider,Menu, TextField, Typography,Switch} from '@mui/material';
import React, { useState } from 'react';
import '../styles/components/Bookmarks.scss';

import PublicIcon from '@mui/icons-material/Public';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import QuizIcon from '@mui/icons-material/Quiz';



function Bookmarks() {
    const [savedLists,setSavedLists] = useState([]);
    const [menuEl,setMenuEl] = useState(null);
    const open=Boolean(menuEl);
    const closeBookMark=()=>{setMenuEl(null);}
    
    // const [selectedBookmark,selectBookmark] = useState(null);
    //TODO show list on preview onClick

    return (
    <div className='bookmarks'>
        <Button variant='text' className='createButton'onClick={(e)=>{setMenuEl(e.currentTarget)}}>Create Bookmark</Button>
        <Divider variant='middle' />
        <div className='bookmarkLists'>
        {
            savedLists.length>0 ? savedLists.map((el,i)=>{
                return <BookmarkPreview key={i} name={el.name} desc={el.desc} isPublic={el.isPublic}/>
            })
            :
            <BookmarksNotFound/>
        }
        </div>
        <BookmarkEditor 
        anchorEl={menuEl}
        openBool={open}
        onClose={closeBookMark}
        setSavedLists={setSavedLists}
        />
    </div>
  )
}

export default Bookmarks;


function BookmarkEditor({anchorEl,openBool,onClose,setSavedLists}){
    const [name,setName] = useState('');
    const [desc,setDesc] = useState('');
    const [isPublic,setIsPublic] = useState(true);

    const maxLengthForName=20;
    const maxLengthForDescription=200;

    const createBookMark=()=>{
        setSavedLists((prev)=>[...prev,{name,desc,isPublic}]);
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
    <TextField variant='outlined' onChange={(e)=>{setName(e.target.value)}} fullWidth placeholder='Bookmark name' inputProps={{maxLength:maxLengthForName}} />
    <TextField variant='outlined' onChange={(e)=>{setDesc(e.target.value)}} maxRows={5} multiline
     fullWidth placeholder='Bookmark description' inputProps={{maxLength:maxLengthForDescription}} />
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
        {
            isPublic ? <PublicIcon/> : <LinkOffIcon/>
        }
        </Typography>
        <Typography className='desc' variant='caption'>{desc ? desc : null}</Typography>
        </div>
        <ArrowForwardIcon/>
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