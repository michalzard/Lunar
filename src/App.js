import "./styles/App.scss";
import { useEffect, useState } from "react";
// import Header from "./components/Header";
import Content from "./components/Content";
import Login from "./components/Login";
import axios from "axios";
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom';
import Navbar from "./components/Navbar";
import { Alert } from "@mui/material";
import {useMediaQuery} from "react-responsive";

const BASE_URI=`http://localhost:${process.env.REACT_APP_SERVER_PORT}`;

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
    if(sessionID){ 
    axios.get(`${BASE_URI}/u/session?id=${localStorage.getItem('sessionID')}`).then(data=>{
    const{user}=data.data; 
    if(user) {
    setUser(user);
    }
    else localStorage.removeItem('sessionID');
    }).catch(err=>{if(err){
      //received 401,not authorized so remove sessionID from localstorage and 
      localStorage.removeItem('sessionID');
      console.log(err);
    }});
  }
  },[]);
  
  const [postAlert,setPostAlert] = useState(null);

  const submitPost =()=>{
    axios.post(`${BASE_URI}/post/create`,{
      author:localStorage.getItem("sessionID"),
      content:postText,
      media:"",//todo:string url media 
      tag:filter,
  }).then(data=>{
    const {message} = data.data;
    if(message)setPostAlert(<Alert color="success" onClose={() => {setPostAlert(null)}}>{message} </Alert>)
    setTimeout(()=>{setPostAlert(null)},10000);
  })
  .catch(err=>{
    if(err) setPostAlert(<Alert color="error" onClose={() => {setPostAlert(null)}}>Unable to submit Post. (Check your input) </Alert>)
    setTimeout(()=>{setPostAlert(null)},10000);
  })
}

const isMobile = useMediaQuery({query:"(max-width: 800px)"});
// const isTablet = useMediaQuery({query:"(max-width: 1200px)"});

  return (
    <div className="App">
    <BrowserRouter>
    <Routes>

    <Route path='/' element={Object.keys(user).length === 0 ? <Navigate to='/login'/> : null }/>
    <Route path='login' element={Object.keys(user).length === 0 ? <Login setUser={setUser} isMobile={isMobile} /> : <Navigate to='/home'/>} />
    </Routes>

    <Content user={user} setUser={setUser} isPostUnsaved={isPostUnsaved} setPostUnsaved={setPostUnsaved} postAlert={postAlert} isMobile={isMobile} submitPost={submitPost}
    filter={filter} setFilter={setFilter} lastSelectedMedia={lastSelectedMedia} setLastSelectedMedia={setLastSelectedMedia} postText={postText} setPostText={setPostText}
    />

    <Navbar isMobile={isMobile} />
    </BrowserRouter>
  
    </div>
  );
}


export default App;
