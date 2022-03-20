import "./styles/App.scss";
import { useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Navbar from "./components/mobile-comps/Navbar";

function App() {
  // const [display,setDisplay] = useState('Home');
  return (
    <div className="App">
    <Header/>
    <Content/>
    <Navbar/>
    </div>
  );
}

export default App;
