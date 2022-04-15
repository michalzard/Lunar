import React from 'react';
import {Typography} from '@mui/material';
import '../../styles/components/Settings/SettingsMenu.scss';
import ArrowForward from '@mui/icons-material/ArrowForwardIos';


function SettingsMenu({setDisplay}) {

  return (
    <div className='settings_menu'>
       <SettingsButton name='Account Information' setDisplay={setDisplay} description='Edit account information like password and email address'/>
       <SettingsButton name='Accessibility' setDisplay={setDisplay} description='Change font size and color theme for your background'/>
       <SettingsButton name='Privacy and Safety' setDisplay={setDisplay} description='Manage muted or blocked words and accounts'/>
    </div>
  )
}

export default SettingsMenu;

//highlights will be probably shown only on web view,on mobile,whole page is used to display content
function SettingsButton({name,setDisplay,description}){
  //checks if selected button matches name to apply highlighted css class
  return(
    <div className={`settingsButton`} onClick={()=>{setDisplay(`Settings-${name}`)}}>
    <div className='info'>{name ? <Typography >{name}</Typography> : 'undefined'}
    <Typography variant='caption'>{description ? description : null }</Typography>
    </div> <ArrowForward />
    </div>
  )
}