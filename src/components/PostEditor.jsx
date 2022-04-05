import React,{useEffect, useState} from 'react'
import "../styles/components/PostEditor.scss";
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

function PostEditor() {
  //Gif menu
  const [gifEl,setGifEl] = useState(null);
  const [filterEl,setFilterEl] = useState(null);
  const gifMenuOpen=Boolean(gifEl);
  const filterMenuOpen=Boolean(filterEl);
  const handleGifMenuOpen=(e) => setGifEl(e.currentTarget);
  const handleGifMenuClose=() => setGifEl(null);
  const handleFilterMenuOpen=(e) => setFilterEl(e.currentTarget);
  const handleFilterMenuClose=() => setFilterEl(null);

  const [lastSelectedMedia,selectMedia] = useState({});
  const [nsfw,setNsfw] = useState(false);
  const [violent,setViolent] = useState(false);

  return (
    <div className='posteditor_container'>
    <div className='editor'>
    <div className='text'>
    <Avatar/>
    {/** focused stays false so that focus animation doesnt play */}
    <TextField placeholder="What's happening" focused={false} variant='standard' minRows={4} maxRows={7} inputProps={{maxLength:200}} margin="normal" multiline fullWidth/>
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
    onChange={(e)=>{const img=URL.createObjectURL(e.target.files[0]); selectMedia(img);}}
    />
    <label htmlFor='upload-file'>
    <Tooltip enterTouchDelay={200} leaveTouchDelay={400} placement='bottom-end' title='Media'>
    <PhotoIcon/>
    </Tooltip>
    </label>
        
    <Tooltip enterTouchDelay={200} leaveTouchDelay={400} placement='top' title='Gif' onClick={handleGifMenuOpen}> 
    <GifIcon />
    </Tooltip>
    <EditorGifMenu anchorEl={gifEl} openBool={gifMenuOpen} onClose={handleGifMenuClose} selectGifs={selectMedia} lastSelectedMedia={lastSelectedMedia}/>
      

    <Tooltip enterTouchDelay={200} leaveTouchDelay={400} placement='bottom' title='Poll'>
    <BarChartIcon/>
    </Tooltip>
    
    <Tooltip enterTouchDelay={200} leaveTouchDelay={400} placement='bottom' title='Filter' onClick={handleFilterMenuOpen}>
    <FilterAltIcon/>
    </Tooltip>
    <EditorFilterMenu anchorEl={filterEl} openBool={filterMenuOpen} onClose={handleFilterMenuClose}
    nsfw={nsfw} setNsfw={setNsfw} violent={violent} setViolent={setViolent}
    />

    </div>
    </div>

       
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

function EditorFilterMenu({nsfw,setNsfw,violent,setViolent,anchorEl,openBool,onClose}){

  return(
    <Menu
    id='filter-menu'
    anchorEl={anchorEl}
    open={openBool}
    onClose={onClose}
    >
    <MenuItem onClick={()=>{setNsfw(!nsfw);}} selected={nsfw}>
    NSFW {nsfw ? <CheckIcon/> : <CloseIcon/> }
    </MenuItem>
    <MenuItem onClick={()=>{setViolent(!violent);}} selected={violent}>
    Violence {violent ? <CheckIcon/> : <CloseIcon/> }
    </MenuItem>
    
    </Menu>
  )
}
