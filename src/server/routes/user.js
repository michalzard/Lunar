const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const User = require('../schemas/User');

/**
 * user - /u/
/name - GET,PATCH member info
/name/collections - GET collections(filter out private ones)
/name/collections/:id - GET specific collection , returns nothing if its not public
 */

//sent sessionID over to server,lookup ID of player linked to it
// return user data

// expected format /?id=somerequestid
router.get('/session',async(req,res)=>{
    const {id} = req.query;
    try{
    if(!id) res.status(404).send({message:"Bad Request"});
    const foundSession=await mongoose.connection.db.collection("sessions").findOne({_id:id});
    if(foundSession){
        const {user_id} = foundSession.session;
        const userByID=await User.findById(user_id,{password:0,__v:0,_id:0});
        if(userByID) res.status(200).send({message:'User found',user:userByID});
        else res.status(200).send({message:'User cannot be found'});
    } 
    else res.status(200).send({message:'Session expired!'});
    }catch(err){
        console.log(err);
    }
});

router.get('/:name/',async(req,res)=>{
    const {name} = req.params;
    try{
    if(!name) res.status(404).send({message:"Bad Request"});
    const foundUser=await User.findOne({name});
    if(foundUser)res.status(200).send({message:"User found",user:foundUser});
    else res.status(200).send({message:"User not found"})
    }catch(err){
        console.log(err);
    }
});



module.exports = router;
