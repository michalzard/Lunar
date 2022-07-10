import React from "react";
import "../styles/components/Content.scss";
import { Typography, Fab, Button, Avatar, TextField } from "@mui/material";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import UserProfile from "./Profile/UserProfile";
import ProfileEdit from "./Profile/ProfileEdit";
import PostEditor from "./Post/PostEditor";
import SettingsMenu from "./Settings/SettingsMenu";
// import AccountInformation from './Settings/AccountInformation';
// import Acessibility from "./Settings/Accessibility";
import Bookmarks from "./Bookmarks";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

//Buttons
import HomeIcon from "@mui/icons-material/Home";
import NotifsActive from "@mui/icons-material/NotificationsActive";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
//
import SearchIcon from '@mui/icons-material/Search';

function Content({isMobile,setPostUnsaved,user,filter,setFilter,lastSelectedMedia,setLastSelectedMedia,postText,setPostText,submitPost,postAlert}) {
  const navigate = useNavigate();
  return (
    <div className="content">
      <Routes>
        <Route path="/home" element={<>
              <div className="_content">
                {isMobile ? null : 
                  <div className="sidebar_left">
                    <div className="links">
                      <Button variant="text" color="info" size="large" startIcon={<HomeIcon />}>Home</Button>
                      <Button variant="text" color="info" size="large" startIcon={<NotifsActive />}>Notifications</Button>
                      <Button variant="text" color="info" size="large" startIcon={<BookmarkIcon />}>Bookmarks</Button>
                      <Button variant="text" color="info" size="large" startIcon={<PersonIcon />}>Profile</Button>
                      <ProfileButton user={user}/>
                    </div>
                  </div>
                }

                <main>
                  {
                    isMobile ? null : <PostEditor submitPost={submitPost} setPostUnsaved={setPostUnsaved} filter={filter} setFilter={setFilter} lastSelectedMedia={lastSelectedMedia} setLastSelectedMedia={setLastSelectedMedia} postText={postText} setPostText={setPostText} postAlert={postAlert} />
                  }
                  <div className="posts">
                  <Typography variant="body1" color="white">/Home content</Typography>
                  </div>
                </main>
                {isMobile ?
                <div className="fab" onClick={() => {navigate("/post");}}>
                <Fab> <HistoryEduIcon /> </Fab>
                </div>
                : null}

                {isMobile ? null : (
                  <div className="sidebar_right">
                    {/* Searchbar at top,Trends*/}
                    <div className="searchbar"><TextField variant="outlined" placeholder="Search Lunar" InputProps={{startAdornment:(<SearchIcon/>)}} fullWidth  /> </div>
                    <div className="trends"> 
                    <Typography variant="h6">Trending</Typography>
                    </div>
                  </div>
                )}
              </div>
            </>
          }
        />

        {/** REDIRECT BACK TO HOME IF NAME ISNT SPECIFIED /U/NAME */}
        <Route path="/u/" element={<Navigate replace to="/home" />} />

        <Route path="/u/:name" element={<UserProfile user={user} />} />
        <Route path="/u/:name/edit" element={<ProfileEdit user={user} />} />
        {/* NO NEED FOR /POST,MAKE DIALOG POPUP WITH POST EDITOR (MOBILE ONLY) */}
        <Route
          path="/post"
          element={
            <PostEditor
              setPostUnsaved={setPostUnsaved}
              filter={filter}
              setFilter={setFilter}
              postAlert={postAlert}
              lastSelectedMedia={lastSelectedMedia}
              setLastSelectedMedia={setLastSelectedMedia}
              postText={postText}
              setPostText={setPostText}
            />
          }
        />
        <Route path="/settings" element={<SettingsMenu />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
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
