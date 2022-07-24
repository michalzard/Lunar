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
//id returns specific bookmark collection

router.get("/:id",async (req,res)=>{
    try{
    const {id} = req.params;
    const {session} = req.query;
    if(mongoose.isValidObjectId(id)){
        //check if in session
        // compare if bookmark author is the same as requester
        //if not check if bookmark is public otherwise, return not public response
        const foundSession = await mongoose.connection.db.collection("sessions").findOne({ _id: session });
        if(foundSession){
            const {user_id} = foundSession.session;
            const foundRequester = await User.findById(user_id);
            if(foundRequester){
                const foundBookMark = await Bookmark.findById(id).populate("author",{email:0,password:0,profile:0}).populate("markedPosts");
                
                if(foundRequester._id.toString() === foundBookMark.author._id.toString()){
                    if(foundBookMark) res.status(200).send({message:"Found bookmark",bookmark:foundBookMark});
                    else res.status(400).send({message:"Bad Request"});
                }else{
                if(foundBookMark.isPublic) res.status(200).send({message:"Found bookmark",bookmark:foundBookMark});
                else res.status(200).send({message:"Bookmark is private"});
                }
                        
            }else res.status(401).send({message:"Unauthorized"});
        }else res.status(400).send({message:"Bad Request"});        
    }else res.status(404).send({message:"Unable to find bookmark"});
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

//add post to bookmark markedPosts array

router.post("/markPost",async(req,res)=>{
    try{
    const {session,postID} = req.body;
        console.log(session,postID);
        const foundSession = await mongoose.connection.db.collection("sessions").findOne({ _id: requestID });
        if(foundSession){
            //grab postID and push it to bookmark markedPosts array
        }
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