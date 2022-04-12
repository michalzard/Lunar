import React, { useState } from 'react';
import '../../styles/components/Settings/Accessibility.scss';
import {MobileStepper,Typography} from '@mui/material';

function Accesibility() {
  const [currentFontSize,setFontSize] = useState('12px');
  const [currentStep,setCurrentStep] = useState(0);
  return (
    <div className='accessibility'>
      <div className='example_post'>post</div>
      <div className='pick_fontsize'>
      <Typography className='smallerA'>Aa</Typography>
      <MobileStepper 
         variant="dots"
        steps={6}
        position="static"
        activeStep={currentStep}
        onClick={()=>{setCurrentStep(currentStep);}}
        >
      </MobileStepper>
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