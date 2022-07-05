import "./styles/App.scss";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Login from "./components/Login";
import axios from "axios";
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom';
import Navbar from "./components/Navbar";
import { Alert } from "@mui/material";
// import {BrowserRouter,Route} from 'react-router-dom';

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
    setTimeout(()=>{setPostAlert(null)},5000);
  })
  .catch(err=>{
    if(err) setPostAlert(<Alert color="error" onClose={() => {setPostAlert(null)}}>Unable to submit Post. (Invalid Input) </Alert>)
    setTimeout(()=>{setPostAlert(null)},5000);
  })
}


  return (
    <div className="App">
    <BrowserRouter>
    <Header setUser={setUser} user={user}  isPostUnsaved={isPostUnsaved} submitPost={submitPost}/>
    <Routes>
    
    <Route path='login' element={Object.keys(user).length === 0 ? <Login setUser={setUser}/> : <Navigate to='/home'/>} />
    <Route path='/' element={Object.keys(user).length === 0 ? <Navigate to='/login'/> : null }/>

    </Routes>
    <Content user={user} setPostUnsaved={setPostUnsaved} postAlert={postAlert}
    filter={filter} setFilter={setFilter} lastSelectedMedia={lastSelectedMedia} setLastSelectedMedia={setLastSelectedMedia} postText={postText} setPostText={setPostText}
    />

    <Navbar />
    </BrowserRouter>
  
    </div>
  );
}


export default App;
