const mongoose = require("mongoose");
const express =require("express");
const router=express.Router();
const Comment = require("../schemas/Comment");

router.get("/:id",(req,res)=>{
    //RETURN COMMENT BY ID
});


router.delete("/:id/delete",async(req,res)=>{
    //DELETE COMMENT BY ID
    try{
        const {sessionID} = req.query;
        //comment id
        const {id} = req.params;
        const foundSession = await mongoose.connection.collection("sessions").findOne({_id:sessionID});
        console.log(foundSession);
        if(foundSession){
            const deletedComment = await Comment.findByIdAndDelete(id);
            if(deletedComment) res.status(200).send({message:"Comment deleted"});
            else res.status(404).send({message:"Resource unavailable"});
        }else res.status(401).send({message:"Unauthorized"});

    }catch(err){
        console.log(err);
    }
});

router.patch("/:id/update", async (req,res)=>{
    //UPDATE COMMENT BY ID
    try{
        const {sessionID,userID,action} = req.body;
        //comment id
        const {id} = req.params;
        const foundSession = await mongoose.connection.collection("sessions").findOne({_id:sessionID});

        if(foundSession){
            const {user_id} = foundSession.session;
            const comment = await Comment.findById(id);
        if(comment && mongoose.isValidObjectId(userID)){
            if(user_id.toString() === comment.author._id.toString()){

            switch(action){
                case "like" : 
                const liked=comment.addLike(userID);
                res.status(200).send({message:"Comment liked",result:liked});
                break;
                case "dislike" : 
                const disliked=comment.removeLike(userID);
                res.status(200).send({message:"Comment disliked",result:disliked});
                break;
                case "repost" :
                const reposted=comment.addRepost(userID);
                res.status(200).send({message:"Comment reposted",result:reposted});
                break;
                case "repost-remove" :
                const removedRepost=comment.removeRepost(userID);
                res.status(200).send({message:"Comment repost removed",result:removedRepost});        
                break;
                default : res.status(400).send({message:"Action missing"});
                break;
                }
            }else res.status(401).send({message:"Unauthorized"});
            }else res.status(400).send({message:"Bad Request"});
        }else res.status(401).send({message:"Unauthorized"});

    }catch(err){
        console.log(err);
    }
});


module.exports = router;