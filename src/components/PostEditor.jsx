import React,{useState} from 'react'
import "../styles/components/PostEditor.scss";
import {TextField,Avatar,Tooltip,Divider,Menu,Typography,Button} from "@mui/material";
import PhotoIcon from '@mui/icons-material/Photo';
import GifIcon from '@mui/icons-material/Gif';
import BarChartIcon from '@mui/icons-material/BarChart';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';

import {Grid} from '@giphy/react-components';
import {GiphyFetch} from '@giphy/js-fetch-api';

function PostEditor() {

  //Gif menu
  const [gifEl,setGifEl] = useState(null);
  const gifMenuOpen=Boolean(gifEl);
  const handleGifMenuOpen=(e) => setGifEl(e.currentTarget);
  const handleGifMenuClose=(e) => setGifEl(null);

  return (
    <div className='posteditor_container'>
    <div className='editor'>
    <div className='text'>
    <Avatar/>
    {/** focused stays false so that focus animation doesnt play */}
    <TextField placeholder="What's happening" focused={false} variant='standard' minRows={4} maxRows={7} inputProps={{maxLength:200}} margin="normal" multiline fullWidth/>
    </div>
    <Divider/>
    <div className='action_btns'>

    <input
    accept="image/*"
    style={{ display: 'none' }}
    id="upload-file"
    multiple
    type="file"
    />
    <label htmlFor='upload-file'>
    <Tooltip enterTouchDelay={200} leaveTouchDelay={400} placement='bottom-end' title='Media'>
    <PhotoIcon/>
    </Tooltip>
    </label>
     
   
    <Tooltip enterTouchDelay={200} leaveTouchDelay={400} placement='top' title='Gif' onClick={handleGifMenuOpen}> 
    <GifIcon />
    </Tooltip>
    <EditorGifMenu anchorEl={gifEl} openBool={gifMenuOpen} onClose={handleGifMenuClose}/>
      

    <Tooltip enterTouchDelay={200} leaveTouchDelay={400} placement='bottom' title='Poll'>
    <BarChartIcon/>
    </Tooltip>
    
    <Tooltip enterTouchDelay={200} leaveTouchDelay={400} placement='bottom' title='Filter'>
    <FilterAltIcon/>
    </Tooltip>
    </div>
    </div>

    {/* <Grid width={350} columns={3} fetchGifs={fetchGifs} onGifClick={(gif,e)=>{console.log(gif); e.preventDefault();}}/> */}
    
    </div>
  )
}

export default PostEditor;


function EditorGifMenu({anchorEl,openBool,onClose}){

  
  const gf=new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY);
  const fetchByTerm = (offset) => gf.search(searchTerm,{offset,limit:10});
  

  const [searchTerm,setSearchTerm] = useState('a');
  const [showSearches,setShowSearches] = useState(false);
  const onSearchChange=(e) => {setSearchTerm(e.target.value);}
  const updateGifs=()=>{setShowSearches(true);}
  //handle resizing
  const [menuWidth,setMenuWidth] = useState(window.innerWidth);
  
  return(
    <Menu
    id='gif-menu'
    anchorEl={anchorEl}
    open={openBool}
    onClose={onClose}
    >
    <div className='gifsearch'>
    <TextField placeholder='Search gifs...' fullWidth onChange={onSearchChange} className='searchfield'/>    
    <Button variant='contained' disabled={searchTerm.length< 2 ? true : false} onClick={updateGifs}><SearchIcon/></Button>
    </div>
    <Typography variant='overline'>{showSearches ? `Search results for "${searchTerm}"` : 'Trending'}</Typography>
    {
    <Grid width={menuWidth} columns={3} fetchGifs={fetchByTerm} key={showSearches ? searchTerm : 'trending'} onGifClick={(gif,e)=>{console.log(gif,searchTerm); e.preventDefault();}}/>
    

    }
    </Menu>
  )
}