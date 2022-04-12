import React, { useState } from 'react';
import {Button, Typography} from '@mui/material';
import '../../styles/components/Settings/SettingsMenu.scss';
import ArrowForward from '@mui/icons-material/ArrowForwardIos';


function SettingsMenu({setDisplay}) {

  return (
    <div className='settings_menu'>
       <SettingsButton name='Account Information' setDisplay={setDisplay}/>
       <SettingsButton name='Accessibility' setDisplay={setDisplay}/>
    </div>
  )
}

export default SettingsMenu;

//highlights will be probably shown only on web view,on mobile,whole page is used to display content
function SettingsButton({name,setDisplay}){
  //checks if selected button matches name to apply highlighted css class
  return(
    <div className={`settingsButton`} onClick={()=>{setDisplay(`Settings-${name}`)}}>
    {name ? <Typography >{name}</Typography> : 'undefined'} <ArrowForward />
    </div>
  )
}