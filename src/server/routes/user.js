const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../schemas/User");

/**
 * user - /u/
/name - GET,PATCH member info
/name/collections - GET collections(filter out private ones)
/name/collections/:id - GET specific collection , returns nothing if its not public
 */

//sent sessionID over to server,lookup ID of player linked to it
// return user data

// expected format /?id=somerequestid
router.get("/session", async (req, res) => {
  const { id } = req.query;
  try {
    if (!id) res.status(404).send({ message: "Bad Request" });
    const foundSession = await mongoose.connection.db
      .collection("sessions")
      .findOne({ _id: id });
      console.log(foundSession);
    if (foundSession) {
      const { user_id } = foundSession.session;
      const userByID = await User.findById(user_id, { password: 0, __v: 0});
      if (userByID) res.status(200).send({ message: "User found", user: userByID });
      else res.status(404).send({ message: "User cannot be found" });
    } else res.status(401).send({ message: "Session expired!" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:name", async (req, res) => {
  const { name } = req.params;
  try {
    if (!name) res.status(404).send({ message: "Bad Request" });
    const foundUser = await User.findOne(
      { displayName:name },
      { password: 0, __v: 0 }
    );
    if (foundUser)
      res.status(200).send({ message: "User found", user: foundUser });
    else res.status(404).send({ message: "User not found" });
  } catch (err) {
    console.log(err);
  }
});

router.patch("/update", async (req, res) => {
  const { id, tag, bio, location, web, birthday } = req.body;
  //CHECK SESSION WITH ID
  //IF ACTIVE PULL UP USER OBJECT
  //MAKE UPDATES,MAKE RESPONSE,DONE
  //IF NOT ACTIVE,MAKE RESPONSE THAT YOU CANNOT UPDATE

  try {
    if (!id) res.status(404).send({ message: "Bad Request" });
    const foundSession = await mongoose.connection.db.collection("sessions").findOne({ _id: id });
    if (foundSession) {
      const { user_id } = foundSession.session;
      const updateData = {
        ["profile.tag"]: tag,
        ["profile.bio"]: bio,
        ["profile.location"]: location,
        ["profile.web"]: web,
        ["profile.birthday"]: birthday,
      };
      const userUpdated = await User.findOneAndUpdate(
        { _id: user_id.valueOf() },
        { $set: updateData }
      );
      if (userUpdated) {
        userUpdated.save();
        const { profile } = userUpdated;
        res.status(200).send({ message: "User updated", update: profile });
      } else res.status(200).send({ message: "User update failed" });
    } else {
      res.send({ message: "Sign in to update" });
    }
    // const foundUser=await User.findOne({name},{password:0,__id:0,__v:0,_id:0});
    // if(foundUser)res.status(200).send({message:"User found",user:foundUser});
    // else res.status(200).send({message:"User not found"})
  } catch (err) {
    console.log(err);
  }
});

router.post('/block',async (req,res)=>{
  //author is sessionID of user that is requesting to block another user
  const {requesterId,blockId} = req.body;

  const foundSession = await mongoose.connection.db.collection("sessions").findOne({ _id: requesterId });
  if(foundSession){
    const {user_id} = foundSession.session;
    const userToBlock = await User.findById(blockId);
    if(userToBlock){
      const blockedUser=await userToBlock.block(user_id);
      console.log(blockedUser);
      if(blockedUser)res.status(200).send({message:"User blocked",update:blockedUser});
      else res.status(404).send({message:"Unable to block user"});
    }
  }else{
    res.status(400).send({message:"Bad Request"});
  }

})

//TODO: unblock
router.post('/unblock',async (req,res)=>{
  //author is sessionID of user that is requesting to block another user
  const {requesterId,blockId} = req.body;

  const foundSession = await mongoose.connection.db.collection("sessions").findOne({ _id: requesterId });
  console.log("unblock",requesterId);
  if(foundSession){
    const {user_id} = foundSession.session;
    const userToUnblock = await User.findById(blockId);
    if(userToUnblock){
      const unblockedUser=await userToUnblock.unBlock(user_id);
      if(unblockedUser)res.status(200).send({message:"User unblocked",update:unblockedUser});
      else res.status(404).send({message:"Unable to unblock user"});
    }
  }else{
    res.status(400).send({message:"Bad Request"});
  }

})


module.exports = router;
