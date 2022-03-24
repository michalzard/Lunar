import React, { useState } from 'react';
import {Typography,TextField,Avatar} from '@mui/material';
import {LocalizationProvider,MobileDatePicker} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';


import '../styles/components/ProfileEdit.scss';


function ProfileEdit() {

  const [username,setUsername] = useState('');
  const [bio,setBio] = useState('');
  const [location,setLocation] = useState('');
  const [web,setWeb] = useState('');
  const [birthday,setBirthday] = useState(new Date());
  const updateUsername=e=>setUsername(e.target.value);
  const updateBio=e=>setBio(e.target.value);
  const updateLocation=e=>setLocation(e.target.value);
  const updateWeb=e=>setWeb(e.target.value);
  const updateBirthday=e=>setBirthday(e);

  return (
    <div className='profile_edit'>
      <Avatar className='photo'/>
      
      <div className='fields'>
      <div className='name'>
      <Typography variant='body1'>Name</Typography>
      <TextField fullWidth variant='outlined' placeholder='Username' value={username} onChange={updateUsername}/>
      </div>
      <div className='bio'>
      <Typography variant='body1'>Bio</Typography>
      <TextField fullWidth variant='outlined' placeholder='Bio' value={bio} onChange={updateBio}/>
      </div>
      <div className='location'>
      <Typography variant='body1'>Location</Typography>
      <TextField fullWidth variant='outlined' placeholder='Location' value={location} onChange={updateLocation}/>
      </div>
      <div className='web'>
      <Typography variant='body1'>Web</Typography>
      <TextField fullWidth variant='outlined' placeholder='Web' value={web} onChange={updateWeb}/>
      </div>
      <div className='birthday'>

      <Typography variant='body1' gutterBottom>Birth Date</Typography>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          label="Birthday"
          value={birthday}
          onChange={updateBirthday}
          renderInput={(params)=><TextField {...params} focused/>}
        /></LocalizationProvider>
      </div>
      </div>

    </div>
  )
}

export default ProfileEdit;