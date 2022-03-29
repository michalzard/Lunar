import "./styles/App.scss";
import { useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Navbar from "./components/Navbar";

function App() {
  const [display,setDisplay] = useState('Home');
  return (
    <div className="App">
    <Header display={display} setDisplay={setDisplay}/>
    <Content display={display} setDisplay={setDisplay}/>
    {
      display==='Edit Profile' || display==='Post Editor' ? null :  <Navbar display={display} setDisplay={setDisplay}/> 
    }
    </div>
  );
}

export default App;
