import React,{useEffect, useState} from 'react'
import "../../styles/components/Post/PostEditor.scss";
import {TextField,Avatar,Tooltip,Divider,Menu,Typography,Button, MenuItem } from "@mui/material";
import PhotoIcon from '@mui/icons-material/Photo';
import GifIcon from '@mui/icons-material/Gif';
import BarChartIcon from '@mui/icons-material/BarChart';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import {Grid} from '@giphy/react-components';
import {GiphyFetch} from '@giphy/js-fetch-api';
// import { Navigate } from 'react-router-dom';


function PostEditor({setPostUnsaved,filter,setFilter,lastSelectedMedia,setLastSelectedMedia,postText,setPostText,postAlert}) {

  //Gif menu
  const [gifEl,setGifEl] = useState(null);
  const [filterEl,setFilterEl] = useState(null);
  const gifMenuOpen=Boolean(gifEl);
  const filterMenuOpen=Boolean(filterEl);
  const handleGifMenuOpen=(e) => setGifEl(e.currentTarget);
  const handleGifMenuClose=() => setGifEl(null);
  const handleFilterMenuOpen=(e) => setFilterEl(e.currentTarget);
  const handleFilterMenuClose=() => setFilterEl(null);

  // const [lastSelectedMedia,selectMedia] = useState({});
  // const [filter,setFilter] = useState("None");

  
  //everytime there's change in postText content,change boolean for if we can just go back or need to save post
  useEffect(()=>{
  if(postText.length>0) setPostUnsaved(true);
  else setPostUnsaved(false);
  },[postText.length,setPostUnsaved]);


  

  return (
    <div className='posteditor_container'>
    <div className='editor'>
    <div className='text'>
    <Avatar/>
    {/** focused stays false so that focus animation doesnt play */}
    <TextField placeholder="Share your thoughts" onChange={(e)=>{setPostText(e.target.value);}}
    focused={false} variant='standard' minRows={4} maxRows={7} inputProps={{maxLength:200}} margin="normal" multiline fullWidth/>
    </div>
    <Divider/>

    {Object.entries(lastSelectedMedia).length>0 ?
    <img src={lastSelectedMedia.images ? lastSelectedMedia.images.original.url : lastSelectedMedia ? lastSelectedMedia : null} className='selectedMedia' alt={lastSelectedMedia.title} loading='lazy'></img> 
    : null}

    <div className='action_btns'>

    <input
    accept="image/*"
    style={{ display: 'none' }}
    id="upload-file"
    multiple
    type="file"
    onChange={(e)=>{const img=URL.createObjectURL(e.target.files[0]); setLastSelectedMedia(img);}}
    />
    <label htmlFor='upload-file'>
    <Tooltip enterTouchDelay={200} leaveTouchDelay={400} placement='bottom-end' title='Media'>
    <PhotoIcon/>
    </Tooltip>
    </label>
        
    <Tooltip enterTouchDelay={200} leaveTouchDelay={400} placement='top' title='Gif' onClick={handleGifMenuOpen}> 
    <GifIcon />
    </Tooltip>
    <EditorGifMenu anchorEl={gifEl} openBool={gifMenuOpen} onClose={handleGifMenuClose} selectGifs={setLastSelectedMedia} lastSelectedMedia={lastSelectedMedia}/>
      

    <Tooltip enterTouchDelay={200} leaveTouchDelay={400} placement='bottom' title='Poll'>
    <BarChartIcon/>
    </Tooltip>
    
    <Tooltip enterTouchDelay={200} leaveTouchDelay={400} placement='bottom' title='Filter' onClick={handleFilterMenuOpen}>
    <FilterAltIcon/>
    </Tooltip>
    <EditorFilterMenu anchorEl={filterEl} openBool={filterMenuOpen} onClose={handleFilterMenuClose} filter={filter} setFilter={setFilter}/>

    </div>
    </div>
    <div style={{marginLeft:"10px",marginRight:"10px"}}>{postAlert}</div>
       
    </div>
  )
}

export default PostEditor;


function EditorGifMenu({anchorEl,openBool,onClose,selectGifs,lastSelectedMedia}){

  const gf=new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY);
  const fetchByTerm = (offset) => gf.search(searchTerm,{offset,limit:10});
  const [searchTerm,setSearchTerm] = useState('trending');
  const [currentSearch,setCurrentSearch] = useState('');
  const [showSearches,setShowSearches] = useState(false);
  const onSearchChange=(e) => {setSearchTerm(e.target.value);}
  const updateGifs=()=>{setShowSearches(true);setCurrentSearch(searchTerm);}
  //handle resizing
  const [menuWidth,setMenuWidth] = useState(window.innerWidth);
  // window.addEventListener('resize',setMenuWidth(window.innerWidth));
  useEffect(()=>{
    function handleResize(){setMenuWidth(window.innerWidth);}
    window.addEventListener('resize',handleResize);
  },[]);

  return(
    <Menu
    id='gif-menu'
    anchorEl={anchorEl}
    open={openBool}
    onClose={onClose}
    style={{paddingBottom:Object.entries(lastSelectedMedia).length>0 ? '10vh' : '30vh'}}
    >
    <div className='gifsearch'>
    <TextField placeholder='Search gifs...' fullWidth onChange={onSearchChange} className='searchfield'/>    
    <Button variant='contained' disabled={searchTerm.length< 2 ? true : false} onClick={updateGifs}><SearchIcon/></Button>
    </div>
    <Typography variant='overline'>{showSearches ? `Search results for "${currentSearch}"` : 'Trending'}</Typography>
    
    <Grid width={menuWidth} columns={3} fetchGifs={fetchByTerm} 
     key={showSearches ? currentSearch : 'trending'} noLink onGifClick={(gif,e)=>{e.preventDefault(); selectGifs(gif); onClose();}}/>
       
    </Menu>
  )
}

function EditorFilterMenu({filter,setFilter,anchorEl,openBool,onClose}){
  
  return(
    <Menu
    id='filter-menu'
    anchorEl={anchorEl}
    open={openBool}
    onClose={onClose}
    >
    <MenuItem onClick={()=>{setFilter("NSFW");}} selected={filter === "NSFW"}>
    NSFW {filter === "NSFW" ? <CheckIcon/> : <CloseIcon/> }
    </MenuItem>
    <MenuItem onClick={()=>{setFilter("Violence");}} selected={filter === "Violence"}>
    Violence {filter === "Violence" ? <CheckIcon/> : <CloseIcon/> }
    </MenuItem>
    <MenuItem onClick={()=>{setFilter("Spoiler");}} selected={filter === "Spoiler"}>
    Spoiler {filter === "Spoiler" ? <CheckIcon/> : <CloseIcon/> }
    </MenuItem>
    </Menu>
  )
}
