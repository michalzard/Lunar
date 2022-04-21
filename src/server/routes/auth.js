const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const router = express.Router();
const User=require("../schemas/User");
// const axios= require('axios');


/*
auth workflow - /auth/
/login - checks db for user checks credentials,returns session ID
/register - checks db for duplicates,saves user object,returns session ID
/session - checks db for existing session object if not found do nothing else log user in
*/

//TODO: ADD handling for email duplicate
router.post('/register',async (req,res)=>{
    try{
    const {email,name,password}=req.body;
    if(name && email){
         const duplicates=await User.find({name,email});
         if(duplicates.length>0) res.status(200).send({message:"Username or email already in use"});
         else{
            const hashedPw=await bcrypt.hash(password,12);
            const registeredUser=new User({email,name,password:hashedPw});
            if(registeredUser){
            await registeredUser.save();
            req.session.user_id=registeredUser._id;
            
            res.status(200).send({message:"User registered successfully",sessionID:req.session.id});
            }
         }
    }else{
        res.status(404).send({message:"Bad Request"});
    }
   
    }catch(err){
    console.log(err.message);
    }
});

router.post('/login',async(req,res)=>{
try{
const {name,password}=req.body;
const foundUser=await User.findOne({name});

if(foundUser){
req.session.user_id=foundUser._id;
req.session.save();
const validatedPw=await bcrypt.compare(password,foundUser.password);
mongoose.connection.db.collection("sessions").findOne({'session.user_id':foundUser._id}).then(data=>{
if(data._id !== req.sessionID) req.session.destroy(); // remove extra session created due to request
const {_id} = data;
if(validatedPw) res.status(200).send({message:"Login successful",sessionID:_id});
else res.status(200).send({message:"Username or password you entered is incorrect"});    

});            
}else res.send({message:"Username or password you entered is incorrect"});
}catch(err){
    console.log(err.message);
}
});

router.post('/logout',async (req,res)=>{
try{
    const{id}=req.body;
    const removedSession=await mongoose.connection.db.collection("sessions").findOneAndDelete({_id:id});
    req.session.destroy(err=>{if(err){console.log(err)}}); //removes old session object if it didnt expire yet
    if(removedSession.value){res.status(200).send({message:"User successfully logged out!"});}
    else{res.status(404).send({message:"Session expired!"});}
}catch(err){
    console.log(err.message);
}
});


/*request send everytime user visits websites
if their last session is still active,go to website,
if not send response back to delete last session and make them log in*/

router.get('/session',async(req,res)=>{
    const {id}=req.body;
    try{
    const foundSession=await mongoose.connection.db.collection("sessions").findOne({_id:id});
    if(foundSession){
    const{_id}=foundSession;
    res.status(200).send({message:"Session found",sessionID:_id});
    }else{
    res.status(200).send({message:"Session expired!"});
    }
    }catch(err){
    console.log(err.message);
    }
});



module.exports=router;