const mongoose=require("mongoose");


const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    photoURL:{
        type:String,
        default:"",
    },    
},{timestamps:true});



module.exports=mongoose.model("User",userSchema);