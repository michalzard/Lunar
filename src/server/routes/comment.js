const mongoose = require("mongoose");
const express =require("express");
const router=express.Router();
const Comment = require("../schemas/Comment");

router.get("/:id",(req,res)=>{
    //RETURN COMMENT BY ID
});

router.post("/new",(req,res)=>{
    //CREATE NEW COMMENT
});

router.post("/:id/delete",(req,res)=>{
    //DELETE COMMENT BY ID
});

router.patch("/:id/update",(req,res)=>{
    //UPDATE COMMENT BY ID
});

router.get("/:id",(req,res)=>{});

module.exports = router;