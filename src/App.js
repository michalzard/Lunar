import "./styles/App.scss";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Login from "./components/Login";
import axios from "axios";
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom';
import Navbar from "./components/Navbar";
// import {BrowserRouter,Route} from 'react-router-dom';

function App() {
  //used for logic shared between header and post elements
  const [isPostUnsaved,setPostUnsaved] = useState(false);

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
  
  return (
    <div className="App">
    <BrowserRouter>
    <Header setUser={setUser} user={user}  isPostUnsaved={isPostUnsaved}/>
    <Routes>
    
    <Route path='login' element={Object.keys(user).length === 0 ? <Login setUser={setUser}/> : <Navigate to='/home'/>} />
    <Route path='/' element={Object.keys(user).length === 0 ? <Navigate to='/login'/> : null }/>

    </Routes>
    <Content user={user} setPostUnsaved={setPostUnsaved}/>

    <Navbar />
    </BrowserRouter>
  
    </div>
  );
}


export default App;
