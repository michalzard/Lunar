const mongoose = require("mongoose");


const bookmarkSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
    },
    isPublic:{
        type:Boolean,
        default:true,
    },
    markedPosts:[{type:mongoose.Types.ObjectId,ref:'Post',default:[]}], //ref post Schema
},{timestamps:true});

module.exports = mongoose.model("Bookmark", bookmarkSchema);