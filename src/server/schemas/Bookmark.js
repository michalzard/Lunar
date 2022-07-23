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
    },
    description: {
      type: String,
      trim: true,
      minlength:1,
      maxlength:200,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    markedPosts: [{ type: mongoose.Types.ObjectId, ref: "Post", default: [] }], //ref post Schema
  },
  { timestamps: true }
);

bookmarkSchema.methods.addMarkedPost=function(){
    //TODO
    // push post id to markedPosts array
}

module.exports = mongoose.model("Bookmark", bookmarkSchema);
