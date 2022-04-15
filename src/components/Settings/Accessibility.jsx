import React, { useState } from 'react';
import '../../styles/components/Settings/Accessibility.scss';
import {Typography,Slider, Radio, Button} from '@mui/material';

function Accesibility() {
  const [fontSize,setFontSize] = useState(10);
  const [theme,setTheme] = useState('dark');//will load from localstorage
  return (
    <div className='accessibility'>
      <div className='example_post'>post</div>
      <div className='pick_fontsize'>
      <Typography className='smallerA'>Aa</Typography>
      <Slider step={1} marks min={10} max={16} valueLabelDisplay='auto' onChange={(e)=>setFontSize(e.target.value)}/>
      <Typography className='biggerA'>Aa</Typography>
      </div>
      <Typography variant='h6'>Color Theme</Typography>
      <div className='pick_bgtheme'>
        <div className='theme_block dark'>
        <Typography variant='h6'>Dim</Typography>
        <Radio  checked={theme==='dark'} value='dark' onChange={(e)=>{setTheme(e.target.value);}}/>
        </div>
        <div className='theme_block light'>
        <Typography variant='h6'>Light</Typography>
        <Radio checked={theme==='light'} value='light' onChange={(e)=>{setTheme(e.target.value);}}/>
        </div>
      </div>
    <Button variant='contained'>Done</Button>
    </div>
  )
}

export default Accesibility;