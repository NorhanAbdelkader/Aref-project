require('dotenv').config();
const express =require("express");
//import express from 'express'
//import mongoose from 'mongoose'
//import User from "./database/models/userModel.js"
//const User =require("./database/models/userModel.js");
const connectDB =require("./database/connection.js");
const userRoutes = require('./modules/user/userRouter');
const app = express();
const PORT = process.env.PORT || 3000;
// Connect to MongoDB
connectDB();
app.use(express.json());
// Define authentication routes
app.use('/', userRoutes);
// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
//server.timeout = 5000; // 5 seconds
//app.use("api/auth",authPath)
/** 
app.post('/register',async (req,res)=>{
    try{
        //const{email,password}= req.body
      const{email,password}= req.body
       const findUser = users.find((data)=>email==data.email)
        if(findUser){
            res.status(400).send("Wrong email or password")
              }
        const hashedPassword = await bcrypt.hash(password,10)
        users.push({email:email,password:hashedPassword});
        res.send("Registered successfully",req.body)
        
    }catch(error){
        res.send({message:error.message})
    }
})
*/
/** 
app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  });
  var routes = require('./routes/userRouter');
  routes(app);
  
  app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
  });
  
app.listen(port,()=>{
    console.log("Server started on port 3000")
})
*/