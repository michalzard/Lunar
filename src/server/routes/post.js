const express = require("express");
const mongoose = require("mongoose");
const User = require("../schemas/User");
const Post = require("../schemas/Post");
const Comment = require("../schemas/Comment");
const router = express.Router();

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

router.post("/create", async (req, res) => {
  try {
    const { author, content, media, tag } = req.body;
    const foundSession = await mongoose.connection.db.collection("sessions").findOne({ _id: author });
    if (foundSession) {
      const { user_id } = foundSession.session;
      const user = await User.findById(user_id);
      if (user) {
        const createdPost = new Post({ author: user._id, content, media, tag });
        await createdPost.save();
        if (createdPost)
          res.status(200).send({ message: "Successfuly created new post" });
      } else {
        res.status(404).send({ message: `Unable to find author` });
      }
    } else {
      res.status(401).send({ message: `Session invalid or expired!` });
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { author, postID } = req.body;
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
  const {sessionID,postID,like,repost} = req.body;

  const foundSession = await mongoose.connection.db.collection("sessions").findOne({ _id: sessionID });
  //if author logged in update target post
  
  if(foundSession && mongoose.isValidObjectId(postID)){
    const {user_id} = foundSession.session;
    //add Like
    const postToUpdate=await Post.findById(postID);
    //@TODO: REFACTOR TO MAKE IT CLEANER
    if(like && !repost){
    if(like === 1) {
      const postUpdate = postToUpdate.addLike(user_id);
      if(postUpdate)res.status(200).send({message:"Like Added",updatedLikes:postUpdate.likes,updatedCount:postUpdate.count});
      else res.status(401).send({message:"Bad Request"});
    }else if(like === -1){
      const postUpdate = postToUpdate.removeLike(user_id);
      if(postUpdate)res.status(200).send({message:"Like Removed",updatedLikes:postUpdate.likes,updatedCount:postUpdate.count});
      else res.status(401).send({message:"Bad Request"});
    }}
    
    else if(repost && !like){
      if(repost === 1) {
        const postUpdate = postToUpdate.addRepost(user_id);
        if(postUpdate)res.status(200).send({message:"Repost Added",updatedReposts:postUpdate.reposts,updatedCount:postUpdate.count});
        else res.status(401).send({message:"Bad Request"});
      }else if(repost === -1){
        const postUpdate = postToUpdate.removeRepost(user_id);
        if(postUpdate)res.status(200).send({message:"Repost Removed",updatedReposts:postUpdate.reposts,updatedCount:postUpdate.count});
        else res.status(401).send({message:"Bad Request"});
      }
    }
    else{
      res.status(401).send({message:"Bad Request"});
    }
  }
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
      
      console.log(postID);

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
 * Update Specific comment 
 */


module.exports = router;
