import React from 'react';
import "../../styles/components/mobile-comps/Navbar.scss";
import {Typography} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";

function Navbar() {
  return (
    <div className='navbar'>
    <Typography variant='h3' color="white">Navbar</Typography>
    <HomeIcon/>
    </div>
  )
}

export default Navbar;