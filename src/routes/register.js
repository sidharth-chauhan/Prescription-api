const express=require('express');
const router= express.Router();
const User=require('../models/User');
const {jwtAuthMiddleware, generateJwt}= require('../utils/jwt');
const bcrypt = require('bcrypt');


router.post('/register', async(req,res)=>{
  try{
    const data =req.body;
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = new User({
      name: data.name,
      email: data.email,
      passwordHash: hashedPassword
    });

    //save user to db
    const savedUser= await user.save();
    console.log('User registered successfully:');

    //response 
    res.status(201).json({
      message:'User registered successfully',
    });

  }catch(err){
    console.error('Error during user registration:',err);
    res.status(500).json({message:'Internal server error'})
  }
})

router.post('/login',async(req,res)=>{
  try{
    const {email,password}=req.body;

    //compare email
    const user=await User.findOne({email:email});
    if(!user){
      return res.status(401).json({message:'Invalid email or password'});
    }

    //compare password
    const pass=await bcrypt.compare(password, user.passwordHash);

    if(!pass){
      return res.status(401).json({message:'Invalid email or password'});
    }
    

    //generate jwt token
    const payload={
      id:user._id,
      email:user.email,
      name:user.name
    };
    const token=generateJwt(payload);

    console.log('User logged in successfully');
    res.status(200).json({
      message:'User logged in successfully',
      token:token
    });


  }catch(err){
    console.error('Error during user login:',err);
    res.status(500).json({message:'Internal server error'})

  }
})

module.exports=router;