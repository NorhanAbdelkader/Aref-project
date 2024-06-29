const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth =require("../../middleware/auth.js")
const {User,validateRegisterUser,validateLoginUser} = require("../../database/models/userModel")
const express =require("express");
//register
const register =async(req,res)=>{
  const {error} = validateRegisterUser(req.body)
  if(error){
      return res.status(404).send(error.details[0].message);
  }
  let UserRegistered=await User.findOne({email: req.body.email})
  if(UserRegistered){
    return res.status(404).send("User already have an account");
  }
  const user= new User({
    name: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    },
      email: req.body.email,
      password: req.body.password,
  
  });

  try {
    user.password=await bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    await user.save();
    const token=jwt.sign({_id:user._id,isAdmin:user.isAdmin},"privateKey")
    res.header('auth-token',token).send(user)
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {  res.status(500).json({ message: 'Failed to register user', error: error.message });
  }}


// Login with an existing user
const login =async(req,res)=>{
  const {error} = validateLoginUser(req.body)
  if(error){
      return res.status(404).send(error.details[0].message);
  }
  let user=await User.findOne({email: req.body.email})
  if(!user){
    return res.status(404).send("Invalid email or password");
  }
 const checkPassword= await bcrypt.compare(req.body.password,user.password)
 if(!checkPassword){
  return res.status(404).send("Invalid email or password");
 }
 const token=jwt.sign({_id:user._id,isAdmin:user.isAdmin},"privateKey")
 return res.send(token)
  };

module.exports = { register, login };
