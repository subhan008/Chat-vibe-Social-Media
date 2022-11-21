var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const multer  = require('multer')
const path = require('path');
const userHelpers = require('../../Helpers/userHelpers')

const userSignp = ((req,res)=>{
   
 });

 const userSignup = ((req,res)=>{
    console.log(req.body,'---------------');
    userHelpers.doSignup(req.body).then((status)=>{
     
     console.log(status.userAdded);
       
     if (status.userAdded) {   
       res.status(201).send({message:"User created successfully",userAdded:true})
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
       const token = jwt.sign({_id:user._i},process.env.SECRET_KEY,{expiresIn:"1h"}) 
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
          userHelpers.uploadPost(data).then(()=>{
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
  userHelpers.getPosts(req.params.userId).then((posts)=>{
    res.send({data:posts})
  })
});

const postLiked = ((req,res)=>{

    console.log(req.body,'bodyyyyeyreyrh');
   userHelpers.postLiked(req.body).then(()=>{
              
   })
});

module.exports  = {
   userLogin,userSignup,uploadPost,getPosts,postLiked
}