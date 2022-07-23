const express= require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require("../schemas/User");
const Bookmark = require("../schemas/Bookmark");


//get all user profile bookmarks
// all?author=103091230
router.get("/all",async (req,res)=>{
    try{
    const{author} = req.query;
    const foundSession = await mongoose.connection.db.collection("sessions").findOne({ _id: author });

    if(foundSession){
        const {user_id} = foundSession.session;
        const foundUser = await User.findById(user_id).populate("profile.bookmarks");

        if(foundUser){
            const {bookmarks} = foundUser.profile;
            res.send({message:"Found bookmarks",bookmarks});
        }else res.status(404).send({message:"Unable to load bookmarks"});

    }else res.status(401).send({message:"Session invalid or expired!"});
    }catch(err){
        console.log(err);
    }
});

//create new bookmark
router.post("/new",async (req,res)=>{
    try{
    const {requestID,title,description,isPublic} = req.body;

    //push it to user.profile.bookmarks
    const foundSession = await mongoose.connection.db.collection("sessions").findOne({ _id: requestID });
    if(foundSession){
        const {user_id} = foundSession.session;
        const foundUser = await User.findById(user_id);

        if(foundUser){
            const {bookmarks} = foundUser.profile;
            //author -> user._id;
            const nBookmark = await new Bookmark({author:user_id,title,description,isPublic});
            console.log(nBookmark);
            if(nBookmark){
                bookmarks.push(nBookmark);
                foundUser.save();
                nBookmark.save();
                res.send({message:"Found bookmarks",bookmark:nBookmark});
            }else res.send({message:"Unable to create bookmark"});
        }else res.status(404).send({message:"Unable to load bookmarks"});

    }else res.status(401).send({message:"Session invalid or expired!"});
}catch(err){
    console.log(err);
}
});


router.post("/update",async(req,res)=>{
    try{
        const {requestID,title,description,isPublic} = req.body;
        const foundSession = await mongoose.connection.db.collection("sessions").findOne({ _id: requestID });
        if(foundSession){
            const {user_id} = foundSession.session;
            const foundUser = await User.findById(user_id);
    
            if(foundUser){
            //TODO : udpate logic for 
            
            }else res.status(404).send({message:"Unable to load bookmarks"});
    
        }else res.status(401).send({message:"Session invalid or expired!"});
    }catch(err){
        console.log(err);
    }
});



module.exports = router;