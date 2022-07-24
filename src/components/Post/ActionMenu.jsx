import { useState } from "react";
import { Menu, MenuItem, Snackbar, Slide,Alert } from "@mui/material";
import ReportReasonsMenu from "./ReportReasonsMenu";
import axios from "axios";
//actions
// import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
// import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FlagIcon from '@mui/icons-material/Flag';
import DndIcon from '@mui/icons-material/DoNotDisturbOnOutlined';
import DndOffIcon from '@mui/icons-material/DoNotDisturbOffOutlined';
import LinkIcon from '@mui/icons-material/Link';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PushPinIcon from '@mui/icons-material/PushPin';
import "../../styles/components/Post/ActionMenu.scss";

function ActionMenu({isMobile,anchor,setActionMenuAnchor,user,post,setPosts}){
    const closeMenu=()=>{setActionMenuAnchor(null);}
    const copyURLtoClipboard=()=>{
      window.navigator.clipboard.writeText(window.location.href);
      closeMenu();
      setAlertMessage(`Post's URL has been copied`);
      setAlertOpen(true);
    }
  
    // const [muted,setMuted]=useState(false);
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
    
    // const handleMute=()=>{
    //   //PATCH REQUEST TO ADD AUTHOR'S ID TO MUTED LIST
    //   //if REQUEST FULLFILLED CHANGE STATE
    //   setMuted(!muted);
    //   closeMenu();
    //   setAlertMessage(muted ? `${author.displayName} has been unmuted` : `${author.displayName} has been muted`);
    //   setAlertOpen(true);
    // }
    const handleBlock=()=>{
      //PATCH REQUEST TO ADD AUTHOR'S ID TO MUTED LIST
      //if REQUEST FULLFILLED CHANGE STATE
      setBlocked(!blocked);
      closeMenu();
      setAlertMessage( blocked ? `${post.author.displayName} has been unblocked` : `${post.author.displayName} has been blocked`);
      setAlertOpen(true);
    }
    const isYourPost=()=>{
      return user.displayName === post.author.displayName;
    }
    
    const handlePostDelete=()=>{
      axios.post(`${process.env.REACT_APP_POST_ROUTE}/delete`,{
        author:localStorage.getItem("sessionID"),
        postID:post._id,
      }).then(data=>{
        const {message} = data.data;
        if(message.includes("Post deleted")) {
          //remove post from react state array
          setPosts(prev=>prev.filter((posts)=>{return posts._id !== post._id}));
          closeMenu();
        }else closeMenu();
        
      }).catch(err=>{console.log(err);})
    }
    const handlePin=()=>{
      axios.patch(`${process.env.REACT_APP_POST_ROUTE}/pin`,{
        author:localStorage.getItem("sessionID"),
        postID:post._id,
      }).then(data=>{
        const { message } = data.data;
        if(message.includes("Post was pinned")){
          closeMenu();
        }else{
          closeMenu();
        }
        // TODO : update or rearrange posts after pinning
      })
      .catch(err=>{console.log(err);})
    }

    return(
      <>
      <Menu
      id="ActionMenu"
      anchorEl={anchor}
      open={Boolean(anchor)}
      onClose={closeMenu}
      >
      {
        isYourPost() ? 
        <div>
        <MenuItem className="postDelete" onClick={handlePostDelete}><DeleteForeverIcon /> Delete</MenuItem>
        <MenuItem className="postPin" onClick={handlePin}><PushPinIcon/> {post.pinned ?  "Unpin to your Profile" : "Pin from your profile"}</MenuItem>
        </div>
        :
       <div>
      <MenuItem className="userProfileCopy" onClick={copyURLtoClipboard}><LinkIcon/>Copy Profile Link</MenuItem>
      {/* <MenuItem className="userMute" onClick={handleMutehandleMute}>
      {muted ? <VolumeOffIcon/> :<VolumeMuteIcon/>} 
      {muted ? `Unmute @${author.displayName}` : `Mute @${author.displayName}`}
      </MenuItem> */}
      <MenuItem className="userBlock" onClick={handleBlock}>
      {blocked ? <DndOffIcon/> : <DndIcon/>}
      {blocked ? `Unblock @${post.author.displayName}` : `Block @${post.author.displayName}`} 
      </MenuItem>
      <MenuItem className="userReport" onClick={(e)=>{setReasonsAnchor(e.currentTarget);closeMenu();}}><FlagIcon/>Report @{post.author.displayName}</MenuItem> 
      </div>
      }
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