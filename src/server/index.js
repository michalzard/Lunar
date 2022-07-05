const express=require("express");
const app=express();
const cors=require('cors');
const session=require("express-session");
const mongoose = require("mongoose");
const mongoDBStore=require("connect-mongodb-session")(session);
require("dotenv").config();
//connect to db before everything
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("database connected")).catch(err=>console.log(err));

const mongoStore=new mongoDBStore({
    uri:process.env.DATABASE_URI,
    collection:"sessions",
})
//session config
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    cookie:{
        maxAge:1000*60 * 60 * 8,//8 hours
        httpOnly:true,
        secure:true,
    },
    saveUninitialized:false,
    store:mongoStore,
}));

app.use(cors());
//cannot receive json in response body w/o this
app.use(express.json());

//Routes
const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/user');
const postRoutes=require('./routes/post');

app.use('/auth',authRoutes);
app.use('/u',userRoutes);
app.use('/post',postRoutes);

//You need to specificy SERVER_PORT as key:value in .env file
app.listen(process.env.SERVER_PORT,()=>{console.log(`Web Server ~ ${process.env.SERVER_PORT}`)});


