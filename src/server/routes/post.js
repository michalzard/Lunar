const express = require("express");
const mongoose = require("mongoose");
const User = require("../schemas/User");
const Post = require("../schemas/Post");
const Comment = require("../schemas/Comment");
const router = express.Router();

const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: path.resolve("src","assets"),
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  // limits:{fileSize:52428800} //50MB limit on uploaded images/videos
})


//check first if requester is logged in before serving
// post create , get update delete

router.get("/all", async (req, res) => {
  try {
    const { author } = req.query; //expecting author name
    if(author && author !== "undefined"){
        await Post.find({}).populate("author",{password:0,email:0}).populate("comments")
        //populate comments array to get author object,reply object
        .populate({ path:"comments", populate:{ path:"author", model:"User"} })
        .populate({ path:"comments", populate:{ path:"replyTo", model:"User"} })
        .exec(
        (err,posts)=>{
          if(err) console.log(err.message);
          const filteredPosts= posts.filter((post)=>{return post.author.displayName === author});
          res.status(200).send({message:`${author} posts`,posts:filteredPosts});
        }
      );}
      else{
        res.status(404).send({message:"Unable to load posts!"});
      }
  } catch (err) {
    console.log(err);
  }
});

router.post("/create",upload.single("media"),async (req, res) => {
  try {
    const { author,tag,content } = req.body;
    
    const foundSession = await mongoose.connection.db.collection("sessions").findOne({ _id: author });
    if (foundSession) {
      const { user_id } = foundSession.session;
      const user = await User.findById(user_id);
      if (user) {
        const createdPost = new Post({ author: user._id, content:content, media:req.file ? req.file.filename : "", tag:tag });
        await createdPost.save();
        if (createdPost) res.status(200).send({ message: "Successfuly created new post" });
      } else {
        res.status(404).send({ message: `Unable to find author` });
      }
    } else {
      res.status(401).send({ message: `Session invalid or expired!` });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { author, postID } = req.query;
    const foundSession = await mongoose.connection.db.collection("sessions").findOne({ _id: author });
    if (foundSession && postID) {
      const selectedPost = await Post.findByIdAndDelete(postID);
      console.log(selectedPost);
      if (selectedPost) res.status(200).send({ message: "Post deleted!" });
      else res.status(200).send({ message: `Post ${postID} has been already deleted!` });

    } else {
      res.status(401).send({ message: `Session invalid or expired!` });
    }
  } catch (err) {
    console.log(err);
  }
});

//Updates likes/reposts
router.patch("/update",async (req,res)=>{
  //sessionID to check if request comes from logged in user
  //like and repost are expected to be +1 or -1
  try{
  const {sessionID,postID,action} = req.body;

  const foundSession = await mongoose.connection.db.collection("sessions").findOne({ _id: sessionID });
  const {user_id} = foundSession.session;
  //if author logged in update target post
  
  if(foundSession && mongoose.isValidObjectId(postID)){
    
    const postToUpdate=await Post.findById(postID);
    if(postToUpdate){
    if(user_id.toString() === postToUpdate.author._id.toString()){
    switch(action){
      case "like" : 
      const liked=postToUpdate.addLike(user_id);
      res.status(200).send({message:"Post liked",result:liked});
      break;
      case "dislike" : 
      const disliked=postToUpdate.removeLike(user_id);
      res.status(200).send({message:"Post disliked",result:disliked});
      break;
      case "repost" :
      const reposted=postToUpdate.addRepost(user_id);
      res.status(200).send({message:"Reposted",result:reposted});
      break;
      case "repost-remove" :
      const removedRepost=postToUpdate.removeRepost(user_id);
      res.status(200).send({message:"Repost removed",result:removedRepost});        
      break;
      default : 
      res.status(400).send({message:"Action missing"});
      break;
    } 
  //if requester isn't author of post
  }else res.status(401).send({message:"Unauthorized"});
  //if post under specific id doesn't exist
  }else res.status(404).send({message:"Resource Unavailable"});
  //if either session or postID is missing or in bad format
  }else res.status(400).send({message:"Bad Request"});
}catch(err){
  console.log(err);
}

})




//handle creating new comment
router.post("/reply", async(req,res)=>{
    //using sessionID again for user validation
    try{
    const {sessionID,postID,comment} = req.body;
    if(!sessionID) res.status(400).send({message:"Bad Request"});
    const foundSession = await mongoose.connection.db.collection("sessions").findOne({ _id: sessionID });
    if(foundSession){
      const {user_id} = foundSession.session;
      if(mongoose.isValidObjectId(user_id) && mongoose.isValidObjectId(postID)){
      const post=await Post.findById(postID);
      
      const newReply=await new Comment({
          author:user_id,
          content:comment,
          replyTo:post.author,
        });
      if(post && newReply){
        post.comments.push(newReply._id);
        post.save();
        newReply.save();
        const excludeOptions = {password:0,email:0};
        const result=await newReply.populate("author",excludeOptions);
        await result.populate("replyTo",excludeOptions);
      res.status(200).send({message:"Reply successfully created",reply:result});
    
      }else res.status(400).send({message:"Unable to create reply"});
     
      
      }else{
        //user id invalid
        res.status(400).send({message:"Bad Request"});
      }
      
    }else res.status(401).send({message:"Unauthorized"});
  }catch(err){
    console.log(err);
  }

})


router.patch("/pin",async (req,res)=>{
  try{
    const {author,postID} = req.body;

    if(!author) res.status(400).send({message:"Bad Request"});
    const foundSession = await mongoose.connection.db.collection("sessions").findOne({ _id: author });
    if(foundSession){
      const {user_id} = foundSession.session;
      if(mongoose.isValidObjectId(user_id) && mongoose.isValidObjectId(postID)){
      const allPosts=await Post.find({});
      let pinnedPost=null;
      console.log(allPosts.length);
      for(let i=0;allPosts.length-1;i++){
        const post=allPosts[i];
       
        if(!post) break;
        
        if(post._id.toString() === postID && !post.pinned) {
          post.pinned = true;
          pinnedPost=true;
          post.save();  
        }
        else {
          post.pinned = false;
          pinnedPost=false;
          post.save();
        } 
        
      }
      
      if(pinnedPost){
        res.status(200).send({message:"Post was pinned"});
      } 
      else res.status(404).send({message:"Unable to find post"});
      
      }else{
        //user id invalid
        res.status(400).send({message:"Bad Request"});
      }
      
    }else res.status(401).send({message:"Unauthorized"});

  }catch(err){
    console.log(err);
  }
})


/**
 * u / username / post / 123456 
 * to have post specific link for preview
 */

router.get("/:id",(req,res)=>{
  //RETURN POST BY ID WITH ALL COMMENTS
})


/**
 * Update Specific comment 
 */


module.exports = router;
