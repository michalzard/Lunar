import React from 'react'
import "../styles/components/PostEditor.scss";
import {TextField,Avatar,Tooltip,Divider,Menu,Radio} from "@mui/material";
import PhotoIcon from '@mui/icons-material/Photo';
import GifIcon from '@mui/icons-material/Gif';
import BarChartIcon from '@mui/icons-material/BarChart';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function PostEditor() {
    
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

    <Tooltip enterTouchDelay={200} leaveTouchDelay={400} placement='bottom-end' title='Media'>
    <PhotoIcon/>
    </Tooltip>
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
    
    </div>
  )
}

export default PostEditor;