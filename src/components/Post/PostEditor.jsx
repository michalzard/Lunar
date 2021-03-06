import React,{useEffect, useState} from 'react'
import "../../styles/components/Post/PostEditor.scss";
import {TextField,Avatar,Tooltip,Divider,Menu,Typography,Button, MenuItem} from "@mui/material";
import PhotoIcon from '@mui/icons-material/Photo';
import GifIcon from '@mui/icons-material/Gif';
import BarChartIcon from '@mui/icons-material/BarChart';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {Grid} from '@giphy/react-components';
import {GiphyFetch} from '@giphy/js-fetch-api';


function PostEditor({isMobile,setPostUnsaved,filter,setFilter,lastSelectedMedia,setLastSelectedMedia,postText,setPostText,submitPost,postAlert}) {

  //Gif menu
  const [gifEl,setGifEl] = useState(null);
  const [filterEl,setFilterEl] = useState(null);
  const gifMenuOpen=Boolean(gifEl);
  const filterMenuOpen=Boolean(filterEl);
  const handleGifMenuOpen=(e) => setGifEl(e.currentTarget);
  const handleGifMenuClose=() => setGifEl(null);
  const handleFilterMenuOpen=(e) => setFilterEl(e.currentTarget);
  const handleFilterMenuClose=() => setFilterEl(null);

  const [mediaPreview,setMediaPreview] = useState({});
  // const [filter,setFilter] = useState("None");

  
  //everytime there's change in postText content,change boolean for if we can just go back or need to save post
  useEffect(()=>{
  if(postText.length>0) setPostUnsaved(true);
  else setPostUnsaved(false);
  },[postText.length,setPostUnsaved]);

  // const isMobile = useMediaQuery({query:"(max-width: 770px)"});
  
  return (
    <div className='posteditor_container'>
    {isMobile ? null : <Button variant="contained" className='postButton' onClick={submitPost} >Post</Button>}
    <div className='editor' style={{minHeight:isMobile ? "30vh" : "auto"}}>
    <div className='text'>
    <Avatar/>
    {/** focused stays false so that focus animation doesnt play */}
    <TextField placeholder="Share your thoughts" onChange={(e)=>{setPostText(e.target.value);}}
    focused={false} variant='standard' minRows={4} maxRows={7} inputProps={{maxLength:200}} margin="normal" multiline fullWidth/>
    </div>
    <Divider/>
    <div className='media-preview'>
    {Object.keys(mediaPreview).length > 0 ?
    <>
    {mediaPreview.type.includes("mp4") || mediaPreview.type.includes("quicktime")  ? <video className='selectedMedia' src={`${mediaPreview.url}#t=0.1`} preload="auto" loop controls><source type={"video/mp4"}/></video>
    :
    <img src={mediaPreview.url} className='selectedMedia' alt={lastSelectedMedia.title} loading='lazy'></img> 
    }
    <CloseIcon className="close" onClick={()=>{setMediaPreview("")}}/>
    </>
    : null}
    </div>

    <div className='action_btns'>
    <input
    accept="image/*,.mov,.mp4"
    style={{ display: 'none' }}
    id="upload-file"
    type="file"
    onChange={(e)=>{setLastSelectedMedia(e.target.files[0]);const mediaURL=URL.createObjectURL(e.target.files[0]);setMediaPreview({type:e.target.files[0].type,url:mediaURL})}}
    />
    <label htmlFor='upload-file'>
    <Tooltip enterTouchDelay={200} leaveTouchDelay={400} placement='bottom-end' title='Media'>
    <PhotoIcon/>
    </Tooltip>
    </label>
        
    <Tooltip enterTouchDelay={200} leaveTouchDelay={400} placement='top' title='Gif' onClick={handleGifMenuOpen}> 
    <GifIcon />
    </Tooltip>
    <EditorGifMenu isMobile={isMobile} anchorEl={gifEl} openBool={gifMenuOpen} onClose={handleGifMenuClose} selectGifs={setLastSelectedMedia} lastSelectedMedia={lastSelectedMedia}/>
      

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


function EditorGifMenu({isMobile,anchorEl,openBool,onClose,selectGifs,lastSelectedMedia}){

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
    style={{paddingBottom:Object.entries(lastSelectedMedia).length>0 ? "10vh" : "30vh",width:isMobile ? "100vw" : "50vw"}}
    >
    <div className='gifsearch'>
    <TextField placeholder='Search gifs...' fullWidth onChange={onSearchChange} className='searchfield'/>    
    <Button variant='contained' disabled={searchTerm.length< 2 ? true : false} onClick={updateGifs}><SearchIcon/></Button>
    </div>
    <Typography variant='overline'>{showSearches ? `Search results for "${currentSearch}"` : 'Trending'}</Typography>
    
    <Grid width={isMobile ? menuWidth : 500} columns={3} fetchGifs={fetchByTerm} className="grid"
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
