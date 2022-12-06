var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const multer  = require('multer')
const path = require('path');
const userHelpers = require('../../Helpers/userHelpers')
const postHelpers = require('../../Helpers/postHelpers')
const schema = require('../../dbSchema/userSchema')
const otpHelper = require('../OTP verification/otp-verification')
const nodemailer = require('nodemailer');
require('dotenv').config();     

const userSignp = ((req,res)=>{
   
 });         

 const userSignup = ((req,res)=>{  

    console.log(req.body,'---------------');
    userHelpers.doSignup(req.body).then((status)=>{
     
     console.log(status.userAdded);
       
     if (status.userAdded) {   
      otpHelper.verification(req.body.email).then((otp)=>{
        console.log(otp,'otppppp');
        res.status(201).send({message:"User created successfully",userAdded:true,otp:otp})
      })
       
     } else{
       res.send({message:"Email Already Exist",userAdded:false})
     }
   })
});

const userLogin = ((req,res)=>{
    console.log(req.body,'login data');
  
    userHelpers.doLogin(req.body).then((user)=>{
     console.log('222');
     
     if (user) {    
       console.log(user,'pop');   
       const token = jwt.sign({_id:user._id},process.env.SECRET_KEY,{expiresIn:"1h"}) 
       return res.send({token: token,message:"User logined successfully",user,valid:true})
     } 
     else{ 
      return res.send({message:"Invalid Email Or Password",valid:false})          
     }   
   })  
});

const uploadPost = ((req,res)=>{
    const data = req.query
    console.log(data,'-------------');    
  
    try {
      const storage = multer.diskStorage({
        destination: path.join(__dirname, '../../public/images'),
        filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + data.userId + '.png'); 
        },  
      });            
        
      const upload = multer({ storage: storage }).single('file');
            
      upload(req, res, (err) => {
        if (!req.file) {
          console.log('no image');
          res.json({ noImage: 'select image' });
        } else {
          console.log('popoppp');
          data.image = req.file.filename;
          postHelpers.uploadPost(data).then(()=>{
            res.send({message:"upload posted"})
          })
        }
      });
    } catch (error) {
      console.log(error);
    }
});

const getPosts = ((req,res)=>{
    console.log(req.params.userId);
    postHelpers.getPosts(req.params.userId).then(async(posts)=>{
      const conn = await schema.connectionData.findOne({userId:req.params.userId})
      const followers = conn.followers.length
      const following = conn.following.length
    res.send({data:posts,followers:followers,following:following})
  })
});

const postLike_Unlike = ((req,res)=>{
console.log('dsdss');        
postHelpers.postLike_Unlike(req.body).then(async()=>{
  const postData = await schema.postData.findOne({_id:req.body.postId})
    res.send({message:"success",data:postData})   
    })
});
  
const addComment = ((req,res)=>{
   postHelpers.addComment(req.body).then(async ()=>{
    const postData = await schema.postData.findOne({_id:req.body.postId})
    res.send({message:"comment added successfuly",data:postData})       
   })
})
  
const getSuggestion = (async (req,res)=>{
  const users = await schema.userData.find().limit(10)
  res.send({data:users})
})

const followUser =((req,res)=>{
  console.log('l,l,l,l,,');
  userHelpers.followUser(req.body).then(async()=>{
    console.log('0000000');
  await userHelpers.doNotification(req.body)
   res.send({message:'success'})  
  })   
})

const getAllPosts = ((req,res)=>{
    
})

const getNotification = (async (req,res)=>{
   console.log(req.params.id,'heiiddsdsdsds');
   const data = await schema.notfiData.findOne({userId:req.params.id})
   console.log(data);
   res.send({data:data?.notifications})
})  

const getFollowing = ((req,res)=>{ 
   console.log(req.params.id,'mmmmm');

  userHelpers.getFollowing(req.params.id).then((following)=>{
    userHelpers.getFollowers(req.params.id).then((followers)=>{
            res.send({followingUsers:following,followersUsers:followers})

    })
  })
})

module.exports  = {
   userLogin,userSignup,uploadPost,getPosts,postLike_Unlike,getAllPosts,addComment,getSuggestion,followUser,getNotification,
   getFollowing
}