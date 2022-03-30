import React from 'react'
import "../styles/components/PostEditor.scss";
import {TextField,Avatar,Tooltip,Divider} from "@mui/material";
import PhotoIcon from '@mui/icons-material/Photo';
import GifIcon from '@mui/icons-material/Gif';
import BarChartIcon from '@mui/icons-material/BarChart';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import {Grid} from '@giphy/react-components';
import {GiphyFetch} from '@giphy/js-fetch-api';

function PostEditor() {

  const gf=new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY);
  const fetchGifs = (offset) => gf.trending({offset,limit:10});

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
     
    <Tooltip enterTouchDelay={200} leaveTouchDelay={400} placement='bottom' title='Gif'>
    <GifIcon/>
    </Tooltip>
    <Tooltip enterTouchDelay={200} leaveTouchDelay={400} placement='bottom' title='Poll'>
    <BarChartIcon/>
    </Tooltip>
    
    <Tooltip enterTouchDelay={200} leaveTouchDelay={400} placement='bottom' title='Filter'>
    <FilterAltIcon/>
    </Tooltip>
    </div>
    </div>
    <Grid width={300} columns={3} fetchGifs={fetchGifs} onGifClick={(gif,e)=>{console.log('gif',gif); e.preventDefault();}}/>
    
    </div>
  )
}

export default PostEditor;