import "./styles/App.scss";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Login from "./components/Login";
import axios from "axios";
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom';
import Navbar from "./components/Navbar";
import { Alert } from "@mui/material";
import {useMediaQuery} from "react-responsive";


function App() {
  //used for logic shared between header and post elements
  const [isPostUnsaved,setPostUnsaved] = useState(false);
  const [filter,setFilter] = useState("None");
  const [lastSelectedMedia,setLastSelectedMedia] = useState({});
  const [postText,setPostText] = useState('');

  const [user,setUser] = useState({});
  //run once on app loads
  useEffect(()=>{
    const sessionID=localStorage.getItem('sessionID');
    //if sessionID exists lookup if there's active session then return user data
    //if not route endpoint returns that session is expired and you need to login
    if(sessionID) axios.get(`${process.env.REACT_APP_USER_ROUTE}/session?id=${sessionID}`).then(data=>{
    const{user}=data.data; 
    if(user) setUser(user);
    else localStorage.removeItem('sessionID');
    });
  },[]);
  
  const [postAlert,setPostAlert] = useState(null);

  const submitPost = async ()=>{
    axios.post(`${process.env.REACT_APP_POST_ROUTE}/create`,{
      author:localStorage.getItem("sessionID"),
      content:postText,
      media:lastSelectedMedia ? lastSelectedMedia : null,
      tag:filter,
  }).then(data=>{
    const {message} = data.data;
    if(message)setPostAlert(<Alert color="success" onClose={() => {setPostAlert(null)}}>{message} </Alert>)
    setTimeout(()=>{setPostAlert(null)},10000);
  })
  .catch(err=>{
    if(err) setPostAlert(<Alert color="error" onClose={() => {setPostAlert(null)}}>Unable to submit Post. (Invalid Input) </Alert>)
    setTimeout(()=>{setPostAlert(null)},10000);
  })
}

const isMobile = useMediaQuery({query:"(max-width: 770px)"});
const isTablet = useMediaQuery({query:"(max-width: 1200px)"});

  return (
    <div className="App">
    <BrowserRouter>
    <Header isMobile={isMobile} setUser={setUser} user={user}  isPostUnsaved={isPostUnsaved} submitPost={submitPost}/>
    <Routes>
    
    <Route path='login' element={Object.keys(user).length === 0 ? <Login setUser={setUser} isMobile={isMobile} /> : <Navigate to='/home'/>} />
    <Route path='/' element={Object.keys(user).length === 0 ? <Navigate to='/login'/> : null }/>

    </Routes>
    <Content user={user} setPostUnsaved={setPostUnsaved} postAlert={postAlert} isMobile={isMobile} submitPost={submitPost}
    filter={filter} setFilter={setFilter} lastSelectedMedia={lastSelectedMedia} setLastSelectedMedia={setLastSelectedMedia} postText={postText} setPostText={setPostText}
    />

    <Navbar isMobile={isMobile} />
    </BrowserRouter>
  
    </div>
  );
}


export default App;
