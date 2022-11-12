var express = require('express');
var router = express.Router();
const userHelpers = require('../Helpers/userHelpers')
const jwt = require('jsonwebtoken')
require('dotenv').config();

router.post('/signup',(req,res)=>{ 
  console.log(req.body,'---------------');

   userHelpers.doSignup(req.body).then((status)=>{

    console.log(status.userAdded);
      
    if (status.userAdded) {   
      res.status(201).send({message:"User created successfully",userAdded:true})
    } else{
      res.send({message:"Email Already Exist",userAdded:false})
    }
  })
})

router.post('/login',(req,res)=>{ 
  console.log(req.body,'login data');
  
   userHelpers.doLogin(req.body).then((user)=>{
    console.log('222');
    
    if (user) {    
      console.log(user,'pop');  
      const token = jwt.sign({_id:user._i},process.env.SECRET_KEY,{expiresIn:"5s"}) 
      return res.send({token: token,message:"User logined successfully",user,valid:true})
    } 
    else{ 
     return res.send({message:"Invalid Email Or Password",valid:false})          
    }
  })    
})    


   
  
   
module.exports = router;
 