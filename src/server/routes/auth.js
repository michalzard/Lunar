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

router.post('/register',async (req,res)=>{
    try{
    const {email,name,password}=req.body;
    if(name && email && password){
        //validate email as string@string.string
        const validEmail=/\S+@\S+\.\S+/.test(email);
        //find if there's already user with same name or email
        const duplicates=await User.find({'$or':[{displayName:name},{email}]});
        if(!validEmail) res.status(200).send({message:"Email is invalid"});
        else if(duplicates.length>0) res.status(200).send({message:"Username or email already in use"});
        else{
            const hashedPw=await bcrypt.hashSync(password,12);
            const registeredUser=new User({email,displayName:name,tag:name,password:hashedPw});
            if(registeredUser){
            await registeredUser.save();
            req.session.user_id=registeredUser._id;
            
            res.status(200).send({message:"User registered successfully",sessionID:req.session.id});
            }
         }
    }else{
        res.status(400).send({message:"Bad Request"});
    }
   
    }catch(err){
    console.log(err.message);
    }
});

router.post('/login',async(req,res)=>{
try{
const {name,password}=req.body;
const userQuery=await User.find({displayName:name});
const foundUser=userQuery[0];

if(foundUser){
req.session.user_id=foundUser._id;
req.session.save();
const validatedPw=await bcrypt.compare(password,foundUser.password);
const foundSession=await mongoose.connection.db.collection("sessions").findOne({_id:req.sessionID});

if(foundSession){
const {_id}  = foundSession;
if(_id !== req.sessionID) req.session.destroy();
if(validatedPw) res.status(200).send({message:"Login successful",sessionID:_id});
else res.status(200).send({message:"Username or password you entered is incorrect"});  

}
}else res.status(200).send({message:"Username or password you entered is incorrect"});  
}catch(err){
    console.log(err);
}
});


router.post('/logout',async (req,res)=>{
try{
    const{id}=req.body;
    const removedSession=await mongoose.connection.db.collection("sessions").findOneAndDelete({_id:id});
    req.session.destroy(err=>{if(err){console.log(err)}}); //removes old session object if it didnt expire yet
    console.log(removedSession);
    if(removedSession.value){res.status(200).send({message:"User successfully logged out!"});}
    else{res.status(200).send({message:"Session expired!"});}
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