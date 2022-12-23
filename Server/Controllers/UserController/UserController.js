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
       const token = jwt.sign({_id:user._id},process.env.SECRET_KEY,{expiresIn:"1d"}) 
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
      const userData = await schema.userData.findOne({_id:req.params.userId})
      const conn = await schema.connectionData.findOne({userId:req.params.userId})
      const followers = conn.followers.length
      const following = conn.following.length
    res.send({data:posts,followers:followers,following:following,user:userData})
  })
});

const postLike_Unlike = ((req,res)=>{
console.log(req.body,'dsdss');        
postHelpers.postLike_Unlike(req.body).then(async(liked)=>{
  if(liked){
  const userData  = await schema.userData.findOne({_id:req.body.likedUserId}) 
  await userHelpers.doNotification(req.body.postedUserId , req.body.likedUserId,`liked your post`,userData.fname)
  }
  if(req.body.profilePage){
    const postData = await schema.postData.findOne({_id:req.body.postId})
    res.send({message:"success",data:postData}) 
  }
  else if(req.body.homePage){
    postHelpers.getAllPosts().then(async (posts)=>{
      res.send({message:"success",data:posts,liked:liked})
    })
  }
    })
});
  
const addComment = ((req,res)=>{
  console.log(req.body,'000000000');
   postHelpers.addComment(req.body).then(async ()=>{
    if(req.body.profilePage){
       const postData = await schema.postData.findOne({_id:req.body.postId})
       res.send({message:"comment added successfuly",data:postData}) 
    }
    else if(req.body.homePage){
      postHelpers.getAllPosts().then((posts)=>{
        res.send({message:"success",data:posts})
      })
    }
         
   })   
})
  
const getSuggestion = (async (req,res)=>{
  const users = await schema.userData.find().limit(30)
    
    res.send({data:users})
  
})

const followUser =((req,res)=>{
  console.log('l,l,l,l,,');
  userHelpers.followUser(req.body).then(async()=>{
    console.log('0000000');
    const userData  = await schema.userData.findOne({_id:req.body.userId})
  await userHelpers.doNotification(req.body.followedUserId , req.body.userId,`${userData.fname} started following you`)
   res.send({message:'success'})  
  })   
})

const getAllPosts = ((req,res)=>{
    console.log('212121212');
    postHelpers.getAllPosts().then(async (posts)=>{
      const userData = await schema.userData.findOne({_id:req.params.id})
      res.send({posts:posts,userData:userData}) 
    })
})

const getNotification = (async (req,res)=>{
   const data = await schema.notfiData.findOne({userId:req.params.id})
   data.notifications.reverse()
   res.send({data:data?.notifications})
})  

const getFollowingFollowers = ((req,res)=>{                      

  userHelpers.getFollowing(req.params.id).then((following)=>{
    userHelpers.getFollowers(req.params.id).then((followers)=>{
            res.send({followingUsers:following,followersUsers:followers})
    
    })
  })
})

const addMessage = ((req,res)=>{
  userHelpers.addMessage(req.body).then(async()=>{
   const chatData = await schema.chatData.findOne({$and:[{chaterIds:req.body.messagerId},{chaterIds:req.body.receiverId}]   })
   res.send({messages:chatData.chat})
  })
})
const getMessages = (async(req,res)=>{
  const chatData = await schema.chatData.findOne({$and:[{chaterIds:req.params.messagerId},{chaterIds:req.params.receiverId}]   })
  console.log(chatData,'dsddsdsds');
  if(chatData){
    res.send({messages:chatData.chat})
  }
})

const getChatUsers = (async (req,res)=>{
  console.log(req.params.id);
    var chatUsers = await schema.chatData.find({chaterIds:req.params.id})
    let data = [ ]
    for ( i = 0; i < chatUsers.length; i++) {
       
      const user = await schema.userData.findOne({_id:chatUsers[i].chaterIds[1]})
      const messagerUser = await schema.userData.findOne({_id:chatUsers[i].chaterIds[0]})
      console.log(chatUsers[i].chaterIds[1],'ooo');   
      if(chatUsers[i].chaterIds[1] !== req.params.id){
        console.log('kkkkk');
      data.push({id:chatUsers[i].chaterIds[1],user:user.fname})
      }
      else{
        if(chatUsers[i].chaterIds[0] !== req.params.id){
          data.push({id:chatUsers[i].chaterIds[0],user:messagerUser.fname})
        }
      }
    }
    
    console.log(data,'oioioii');   
    res.send({data:data})
})
 
const addNewMessages = (async(req,res)=>{
  console.log(req.body,'lkklkkkl');   
  const chatExist = await schema.chatData.findOne({$and:[{chaterIds:req.body.messagerId},{chaterIds:req.body.receiverId}]   })
  console.log(chatExist,'77777');
  if(chatExist){
    res.send({message:'success',chatUser:chatExist}) 
  }else{
      schema.chatData({chaterIds:[req.body.messagerId,req.body.receiverId]}).save() 
      const data = await schema.chatData.findOne({$and:[{chaterIds:req.body.messagerId},{chaterIds:req.body.receiverId}]   })
      
      console.log('8888');
      res.send({message:'success',chatUser:data})
  }
  console.log('444444');
})

const searchUser = (async(req,res)=>{
  const user = await schema.userData.findOne({fname:req.body.user})
  console.log(user);
  if(user){
    res.send({user:user})
  }
  else res.send({user:null,message:'user not found'})
})

const addProfileImg = ((req,res)=>{
  const userId = req.params.id
   console.log(req.params.id,'77777');
   try {
    const storage = multer.diskStorage({
      destination: path.join(__dirname, '../../public/images/profile-images'),
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + req.params.id + '.png'); 
      },  
    });            
      
    const upload = multer({ storage: storage }).single('file');
          
    upload(req, res, (err) => {
      if (!req.file) {
        console.log('no image');
        res.json({ noImage: 'select image' });
      } else {
        console.log(req.file.filename,'popoppp');
        /*inserting porfile img in DB */
        schema.userData.updateOne({_id:userId},{
          $set:{
            profileImg:req.file.filename
          }
        }).then(()=>{ 
          console.log('nnnn');
          res.send({message:"success"})
        })
      }
    });
  } catch (error) {
    console.log(error);
  }
})

const removeProfileImg = ((req,res)=>{
      schema.userData.updateOne({_id:req.body.userId},{
        $unset:{profileImg:1}
      }).then(()=>{
          res.send({message:"success"})
      })
})

const notificationsSeend = ((req,res)=>{
  console.log('444',req.params.id);
  schema.notfiData.updateOne({userId:req.params.id},{
     $set: { notifications : [] } 
  }).then(()=>{
    console.log('mnmn');
    res.send({})
  })
})

const unFollowUser = ((req,res)=>{
    schema.connectionData.updateOne({userId:req.body.userId},{
      $pull:{
        following:req.body.id
      }
    }).then(()=>{
      res.send({message:'success'})
    })       
})  

const editProfile = ((req,res)=>{
   console.log(req.body,'&&&&&&&');
   userHelpers.editProfile(req.body).then(()=>{
      res.send({message:'success'}) 
   })
})

module.exports  = {
   userLogin,userSignup,uploadPost,getPosts,postLike_Unlike,getAllPosts,addComment,getSuggestion,followUser,getNotification,editProfile,
   getFollowingFollowers,addMessage,getMessages,getChatUsers,addNewMessages,searchUser,addProfileImg,removeProfileImg,notificationsSeend,unFollowUser
}