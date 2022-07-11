import React, { useState } from "react";
import "../styles/components/Content.scss";
import { Typography, Fab, Button, Avatar, TextField } from "@mui/material";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import Header from "./Header";
import UserProfile from "./Profile/UserProfile";
import ProfileEdit from "./Profile/ProfileEdit";
import PostEditor from "./Post/PostEditor";
import SettingsMenu from "./Settings/SettingsMenu";
// import AccountInformation from './Settings/AccountInformation';
// import Acessibility from "./Settings/Accessibility";
import Bookmarks from "./Bookmarks";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

//Buttons
import HomeIcon from "@mui/icons-material/Home";
import NotifsActive from "@mui/icons-material/NotificationsActive";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
//
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WhatshotIcon from '@mui/icons-material/Whatshot';


function Content({isMobile,isPostUnsaved,setPostUnsaved,user,setUser,filter,setFilter,lastSelectedMedia,setLastSelectedMedia,postText,setPostText,submitPost,postAlert}) {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  return (
    <div className="content">
       <div className="_content">

        {/* LEFT */}
              {isMobile || pathname === "/login" ? null : 
                <div className="sidebar_left">
                  <div className="links">
                    <Button variant="text" color="info" size="large" startIcon={<HomeIcon />} onClick={()=>{navigate("/home")}}>Home</Button>
                    <Button variant="text" color="info" size="large" startIcon={<NotifsActive />} onClick={()=>{navigate("/notifications")}}>Notifications</Button>
                    <Button variant="text" color="info" size="large" startIcon={<BookmarkIcon />} onClick={()=>{navigate("/bookmarks")}}>Bookmarks</Button>
                    <Button variant="text" color="info" size="large" startIcon={<PersonIcon />} onClick={()=>{navigate(`/u/${user.name}`)}}>Profile</Button>
                    <ProfileButton user={user}/>
                  </div>
                </div>
              }

              {/* MAIN CONTENT  */}
              <main>
              <Header isMobile={isMobile} setUser={setUser} user={user}  isPostUnsaved={isPostUnsaved} submitPost={submitPost}/>
              <Routes>
              <Route path="/home" element={<>
              {isMobile ? null :
              <PostEditor submitPost={submitPost} isMobile={isMobile} setPostUnsaved={setPostUnsaved} filter={filter} setFilter={setFilter} postAlert={postAlert} lastSelectedMedia={lastSelectedMedia} setLastSelectedMedia={setLastSelectedMedia} postText={postText} setPostText={setPostText}/>
              }
              <div className="posts">
              <Typography>Posts will be displayed here.</Typography>
              </div>
              {isMobile ? <div className="fab" onClick={() => {navigate("/post");}}> <Fab> <HistoryEduIcon /> </Fab> </div> : null}
              </>}/>
              {/** REDIRECT BACK TO HOME IF NAME ISNT SPECIFIED /U/NAME */}
              <Route path="/u/" element={<Navigate replace to="/home" />} />

              <Route path="/u/:name" element={<UserProfile isMobile={isMobile} user={user} />} />
              <Route path="/u/:name/edit" element={<ProfileEdit isMobile={isMobile} user={user} />} />
              {/* NO NEED FOR /POST,MAKE DIALOG POPUP WITH POST EDITOR (MOBILE ONLY) */}
              <Route
              path="/post"
              element={
              <PostEditor submitPost={submitPost} isMobile={isMobile} setPostUnsaved={setPostUnsaved} filter={filter} setFilter={setFilter} postAlert={postAlert} lastSelectedMedia={lastSelectedMedia} setLastSelectedMedia={setLastSelectedMedia} postText={postText} setPostText={setPostText}/>
              }
              />
              <Route path="/settings" element={<SettingsMenu />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              </Routes>
              </main>

              {/* RIGHT  */}
              {isMobile || pathname === "/login" ? null : 
                <div className="sidebar_right">
                  {/* Searchbar at top,Trends*/}
                  <div className="searchbar"><TextField variant="outlined" placeholder=" Search Lunar" InputProps={{startAdornment:(<SearchIcon/>)}} fullWidth  /> </div>
                  <div className="trends"> 
                  <div className="title"><TrendingUpIcon/><Typography variant="h6">Trending</Typography></div>
                  <div className="previews">
                   
                  <Typography><WhatshotIcon/>No trends available</Typography>  
                  </div>
                  </div>
                </div>
              }
              </div>   
          
              
      </div>
  );
}

const ProfileButton = ({ user }) => {
  const capitalize = (name) => {
    if(name) return name.charAt(0).toUpperCase() + name.substring(1, name.length);
  };
  return (
    <div className="profilebtn">
      <div className="avatar"><Avatar /></div>
      <div className="user_info">
        <Typography> {user ? capitalize(user.name) : null}</Typography>
        <Typography variant="caption">{user ? `@${capitalize(user.name)}` : null}</Typography>
      </div>
      <div className="more"><MoreHorizIcon/></div>
    </div>
  );
};



export default Content;
