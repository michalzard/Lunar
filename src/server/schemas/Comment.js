const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required:true,
    trim:true,
    minlength:1,
    maxlength:200,
  },
  replyTo:{
    type:mongoose.Types.ObjectId,
    ref:"User",
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  likeCount: {
    type: Number,
    default: 0,
  },
  reposts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  repostCount: {
    type: Number,
    default: 0,
  },
},{timestamps:true});

commentSchema.methods.addLike = function (userId) {
  if (mongoose.isValidObjectId(userId)) {
    //if already in like array,return
    if (this.likes.includes(userId)) return {likes:this.likes,count:this.likeCount};
    //if isnt in array,add it and return
    else {
      this.likes.push(userId);
      this.likeCount++;
      this.save();
      return {likes:this.likes,count:this.likeCount};
    }
  } else return null;
};
commentSchema.methods.removeLike = function (userId) {
  if (mongoose.isValidObjectId(userId)) {
    //if already in like array,remove it,return
    if (this.likes.includes(userId)) {
      const userIndex = this.likes.indexOf(userId);
      this.likes.splice(userIndex, 1);
      this.likeCount--;
      this.save();
      return {likes:this.likes,count:this.likeCount};
    }
    //if isnt in array,return
    else return {likes:this.likes,count:this.likeCount};
  } else return null;
};

commentSchema.methods.addRepost = function (userId) {
  if (mongoose.isValidObjectId(userId)) {
    //if already in like array,return
    if (this.reposts.includes(userId)) return {reposts:this.reposts,count:this.repostCount};
    //if isnt in array,add it and return
    else {
      this.reposts.push(userId);
      this.repostCount++;
      this.save();
      return {reposts:this.reposts,count:this.repostCount};
    }
  } else return null;
};

commentSchema.methods.removeRepost = function (userId) {
  if (mongoose.isValidObjectId(userId)) {
    //if already in like array,remove it,return
    if (this.reposts.includes(userId)) {
      const userIndex = this.reposts.indexOf(userId);
      this.reposts.splice(userIndex, 1);
      this.repostCount--;
      this.save();
      return {reposts:this.reposts,count:this.repostCount};
    }
    //if isnt in array,return
    else return {reposts:this.reposts,count:this.repostCount};
  } else return null;
};

module.exports = mongoose.model("Comment", commentSchema);
