import React, { useState } from 'react';
import '../../styles/components/Settings/Accessibility.scss';
import {Typography,Slider} from '@mui/material';

function Accesibility() {
  
  return (
    <div className='accessibility'>
      <div className='example_post'>post</div>
      <div className='pick_fontsize'>
      <Typography className='smallerA'>Aa</Typography>
      <Slider step={1} marks min={12} max={20}  valueLabelDisplay='auto' />
      <Typography className='biggerA'>Aa</Typography>
      </div>

      <div className='pick_bgtheme'>
        bg theme
      </div>
    save button here
    </div>
  )
}

export default Accesibility;