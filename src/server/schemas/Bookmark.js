const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required:true,
    },
    title: {
      type: String,
      trim: true,
      minlength:1,
      maxlength:100,
      required:true,
    },
    description: {
      type: String,
      trim: true,
      minlength:1,
      maxlength:200,
      required:true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    markedPosts: [{ type: mongoose.Types.ObjectId, ref: "Post", default: [] }], //ref post Schema
  },
  { timestamps: true }
);

bookmarkSchema.methods.addMarkedPost=function(postId){
    //TODO
    // push post id to markedPosts array
    if(mongoose.isValidObjectId(postId) && !this.markedPosts.includes(postId)){
      this.markedPosts.push(postId);
      this.save();
      return this;
    }else return null;
}
bookmarkSchema.methods.removeMarkedPost=function(postId){
  if(mongoose.isValidObjectId(postId) && this.markedPosts.includes(postId)){
    const index = this.markedPosts.indexOf(postId);
    this.markedPosts.splice(index,1);
    this.save();
    return this;
  }else return null;
}

module.exports = mongoose.model("Bookmark", bookmarkSchema);
