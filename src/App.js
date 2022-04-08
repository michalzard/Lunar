import "./styles/App.scss";
import { useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
// import Navbar from "./components/Navbar";

function App() {
  const [display,setDisplay] = useState('Home');
  //used for logic shared between header and post elements
  const [isPostUnsaved,setPostUnsaved] = useState(false);

  const isDisplay=(...args)=>{
    if(args===null) return;
    return args.includes(display.toLowerCase());
  }

  
  return (
    <div className="App">
    <Header display={display} setDisplay={setDisplay} isDisplay={isDisplay} isPostUnsaved={isPostUnsaved}/>
    <Content display={display} setDisplay={setDisplay} isDisplay={isDisplay} setPostUnsaved={setPostUnsaved}/>
    </div>
  );
}

export default App;
