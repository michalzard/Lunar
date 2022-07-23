const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    tag: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profile: {
      bio: {
        type: String,
        trim: true,
        default: "",
      },
      location: {
        type: String,
        trim: true,
        default: "",
      },
      web: {
        type: String,
        trim: true,
        default: "",
      },
      birthday: {
        type: Date,
        default: Date.now(),
      },
      followers: {
        followedBy: [
          { type: mongoose.Types.ObjectId, ref: "User", default: [] },
        ],
        followedByCount: {
          type: Number,
          default: 0,
        },
        following: [
          { type: mongoose.Types.ObjectId, ref: "User", default: [] },
        ],
        followingCount: {
          type: Number,
          default: 0,
        },
      },
      blockedBy: [{ type: mongoose.Types.ObjectId, ref: "User", default: [] }],
      
      // muted: [{ type: mongoose.Types.ObjectId, ref: "User", default: [] }],
      bookmarks: [
        { type: mongoose.Types.ObjectId, ref: "Bookmark", default: [] },
      ],
    },
  },
  { timestamps: true }
);

userSchema.methods.block=async function(requesterId){
  if(mongoose.isValidObjectId(requesterId) && !this.profile.blockedBy.includes(requesterId)){
    this.profile.blockedBy.push(requesterId);
    this.save();
    return this.profile.blockedBy;
  }else return this.profile.blockedBy;
}
userSchema.methods.unBlock=async function(requesterId){
  if(mongoose.isValidObjectId(requesterId) && this.profile.blockedBy.includes(requesterId)){
    if(this.profile.blockedBy.includes(requesterId)){
      const unblockID=this.profile.blockedBy.indexOf(requesterId);
      this.profile.blockedBy.splice(unblockID,1);
    }
    this.save();
    return this.profile.blockedBy;
  }else return this.profile.blockedBy;
}
module.exports = mongoose.model("User", userSchema);
