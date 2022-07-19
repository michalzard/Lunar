import { useState } from "react";
import { Menu, MenuItem, Snackbar, Slide,Alert } from "@mui/material";
import ReportReasonsMenu from "./ReportReasonsMenu";
//actions
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FlagIcon from '@mui/icons-material/Flag';
import DndIcon from '@mui/icons-material/DoNotDisturbOnOutlined';
import DndOffIcon from '@mui/icons-material/DoNotDisturbOffOutlined';
import LinkIcon from '@mui/icons-material/Link';


function ActionMenu({isMobile,anchor,setActionMenuAnchor,author}){
    const closeMenu=()=>{setActionMenuAnchor(null);}
    const copyURLtoClipboard=()=>{
      window.navigator.clipboard.writeText(window.location.href);
      closeMenu();
      setAlertMessage(`Post's URL has been copied`);
      setAlertOpen(true);
    }
  
    const [muted,setMuted]=useState(false);
    const [blocked,setBlocked]=useState(false);
    //alert
    const [alertMessage,setAlertMessage] = useState("Saved");
    const [alertOpen,setAlertOpen]=useState(false);
    //reason menu
    const [reasonsAnchor,setReasonsAnchor] = useState(null);
    
    const closeReportMenu=()=>{
      setReasonsAnchor(null);
    }
  
    const closeAlert=()=>{
      setAlertOpen(false);
    }
    
    const handleMute=()=>{
      //PATCH REQUEST TO ADD AUTHOR'S ID TO MUTED LIST
      //if REQUEST FULLFILLED CHANGE STATE
      setMuted(!muted);
      closeMenu();
      setAlertMessage(muted ? `${author.name} has been unmuted` : `${author.name} has been muted`);
      setAlertOpen(true);
    }
    const handleBlock=()=>{
      //PATCH REQUEST TO ADD AUTHOR'S ID TO MUTED LIST
      //if REQUEST FULLFILLED CHANGE STATE
      setBlocked(!blocked);
      closeMenu();
      setAlertMessage( blocked ? `${author.name} has been unblocked` : `${author.name} has been blocked`);
      setAlertOpen(true);
    }
  
    return(
      <>
      <Menu
      id="ActionMenu"
      anchorEl={anchor}
      open={Boolean(anchor)}
      onClose={closeMenu}
      >
      <MenuItem className="userProfileCopy" onClick={copyURLtoClipboard}><LinkIcon/>Copy Profile Link</MenuItem>
  
      <MenuItem className="userMute" onClick={handleMute}>
      {muted ? <VolumeOffIcon/> :<VolumeMuteIcon/>} 
      {muted ? `Unmute @${author.name}` : `Mute @${author.name}`}
      </MenuItem>
  
      <MenuItem className="userBlock" onClick={handleBlock}>
      {blocked ? <DndOffIcon/> : <DndIcon/>}
      {blocked ? `Unblock @${author.name}` : `Block @${author.name}`} 
      </MenuItem>
      <MenuItem className="userReport" onClick={(e)=>{setReasonsAnchor(e.currentTarget);closeMenu();}}><FlagIcon/>Report @{author.name}</MenuItem>
      </Menu>
      {/* BOTTOM RIGHT ALERT THAT SHOWS IF YOU MADE ACTION AGAINST PROFILE */}
      <Snackbar
      anchorOrigin={{vertical:"bottom",horizontal:"right"}}
      open={alertOpen}
      autoHideDuration={4000}
      onClose={closeAlert}
      TransitionComponent={Slide}
      >
      <Alert color="success">{alertMessage}</Alert>
      </Snackbar>
      <ReportReasonsMenu isMobile={isMobile} anchor={reasonsAnchor} onClose={closeReportMenu} />
      </>
    )
}

export default ActionMenu;