import "./styles/App.scss";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Login from "./components/Login";
import axios from "axios";
// import {BrowserRouter,Route} from 'react-router-dom';

function App() {
  const [display,setDisplay] = useState('Home');
  //used for logic shared between header and post elements
  const [isPostUnsaved,setPostUnsaved] = useState(false);
  const isDisplay=(...args)=>{
    if(args===null) return;
    return args.includes(display.toLowerCase());
  }

  const [user,setUser] = useState({});

  //run once on app loads
  useEffect(()=>{
    const sessionID=localStorage.getItem('sessionID');
    //if sessionID exists lookup if there's active session then return user data
    //if not route endpoint returns that session is expired and you need to login
    if(sessionID) axios.get(`${process.env.REACT_APP_USER_ROUTE}/session?id=${sessionID}`).then(data=>{
    const{user}=data.data; 
    if(user)setUser(user);
    else localStorage.removeItem('sessionID');
    });
    
  },[]);

  return (
    <div className="App">
    {/* <BrowserRouter> */}
    {
    Object.keys(user).length === 0 ? <Login setUser={setUser}/> : 
    <>
    <Header setUser={setUser} user={user} display={display} setDisplay={setDisplay} isDisplay={isDisplay} isPostUnsaved={isPostUnsaved}/>
    <Content user={user} display={display} setDisplay={setDisplay} isDisplay={isDisplay} setPostUnsaved={setPostUnsaved}/>    
    </>
    }
    {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
