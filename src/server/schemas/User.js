const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name:{
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    profile:{
        tag:{
            type: String,
            trim: true,
        },
        bio:{
            type:String,
            trim:true,
            default:'',
        },
        location:{
            type:String,
            trim:true,
            default:'',
        },
        web:{
            type:String,
            trim:true,
            default:'',
        },
        birthday:{
            type:Date,
            default:Date.now(),
        },
        followers:{
            followedBy:[{type:mongoose.Types.ObjectId,ref:"User",default:[]}],
            followedByCount:{
                type:Number,
                default:0,
            },
            following:[{type:mongoose.Types.ObjectId,ref:"User",default:[]}],
            followingCount:{
                type:Number,
                default:0,
            }
        },
        bookmarks:[{type:mongoose.Types.ObjectId,ref:"Bookmark",default:[]}],

    }
    
}, { timestamps: true })


module.exports = mongoose.model("User", userSchema);