const express = require("express");
const mongoose = require("mongoose");
const User = require("../schemas/User");
const Post = require("../schemas/Post");
const router = express.Router();

//check first if requester is logged in before serving
// post create , get update delete

router.get("/all", async (req, res) => {
  try {
    const { author } = req.query; //expecting author name
      if(author){
      await Post.find({}).populate("author",{password:0,email:0}).exec(
        (err,posts)=>{
          if(err) throw Error(err.message);
          const filteredPosts= posts.filter((post)=>post.author.name === author);

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
    const foundSession = await mongoose.connection.db
      .collection("sessions")
      .findOne({ _id: author });
    if (foundSession && postID) {
      const selectedPost = await Post.findByIdAndDelete(postID);
      if (selectedPost)
        res.status(200).send({ message: "Post deleted!", post: selectedPost });
      else
        res
          .status(404)
          .send({ message: `Post ${postID} has been already deleted!` });
    } else {
      res.status(401).send({ message: `Session invalid or expired!` });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
