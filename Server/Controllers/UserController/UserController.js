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
   .catch((err)=>{
   })
});

const userLogin = ((req,res)=>{
  console.log(req.body,'login data');
  try {
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
  } catch (error) {
    console.log('ujujujujuju');
    res.status(500).json(error)
  }  

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
      res.status(500).json(error)
    }
});
                        
const getPosts = ((req,res)=>{    
  console.log(req.params.userId);
  try { 
     postHelpers.getPosts(req.params.userId).then(async(posts)=>{
      const userData = await schema.userData.findOne({_id:req.params.userId})
      const conn = await schema.connectionData.findOne({userId:req.params.userId})
      const followers = conn.followers.length    
      const following = conn.following.length    
    res.send({data:posts,followers:followers,following:following,user:userData})
  })
  } catch (error) {
    res.status(500).json(error)
  }
   
});
        
const postLike_Unlike = ((req,res)=>{
console.log(req.body,'dsdss');        
try {    
  postHelpers.postLike_Unlike(req.body).then(async(liked)=>{
  if(liked && req.body?.profilePage != true){
  const userData  = await schema.userData.findOne({_id:req.body.likedUserId}) 
  console.log(userData,'kkkk');
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
  else if(req.body.searchPage){
    const postData = await schema.postData.findOne({_id:req.body.postId})
    res.send({message:"success",data:postData,liked:liked}) 
  }
    })
} catch (error) {
  res.status(500).json(error)
}
    
});
  
const addComment = ((req,res)=>{
  console.log(req.body,'000000000');
  try {
     postHelpers.addComment(req.body).then(async ()=>{
    await userHelpers.doNotification(req.body.recieverId , req.body.commentedUserID,`commented on your post'${req.body.comment}'`,req.body.user)
    console.log('////////////');
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
  } catch (error) {
    res.status(500).json(error)
  }
  
})
  
const getSuggestion = (async (req,res)=>{
  try {
      const users = await schema.userData.find().limit(30)
    
    res.send({data:users})
  } catch (error) {
    res.status(500).json(error)

  }
})

const followUser =((req,res)=>{
  console.log('l,l,l,l,,');
  try {
    userHelpers.followUser(req.body).then(async()=>{
    console.log('0000000');
    const userData  = await schema.userData.findOne({_id:req.body.userId})
  await userHelpers.doNotification(req.body.followedUserId , req.body.userId,`${userData.fname} started following you`)
   res.send({message:'success'})  
  })
  } catch (error) {
    res.status(500).json(error)
  }
     
})

const getAllPosts = ((req,res)=>{
    console.log('212121212');
    try {
        postHelpers.getAllPosts().then(async (posts)=>{
      const userData = await schema.userData.findOne({_id:req.params.id})
      res.send({posts:posts,userData:userData}) 
    })
    } catch (error) {
      res.status(500).json(error)

    }
  
})

const getNotification = (async (req,res)=>{
  try {
    const data = await schema.notfiData.findOne({userId:req.params.id})
   data.notifications.reverse()
   res.send({data:data?.notifications}) 
  } catch (error) {
    res.status(500).json(error)

  }
    
})  

const getFollowingFollowers = ((req,res)=>{                      
   try {
      userHelpers.getFollowing(req.params.id).then((following)=>{
    userHelpers.getFollowers(req.params.id).then((followers)=>{
            res.send({followingUsers:following,followersUsers:followers})
    
    })
  })
   } catch (err) {
    res.status(500).json(error)
   }

})

const addMessage = ((req,res)=>{
  try {
    userHelpers.addMessage(req.body).then(async()=>{
   const chatData = await schema.chatData.findOne({$and:[{chaterIds:req.body.messagerId},{chaterIds:req.body.receiverId}]   })
   res.send({messages:chatData.chat})
  })
  } catch (error) {
    res.status(500).json(error)

  }
  
})
const getMessages = (async(req,res)=>{
  try {
    const chatData = await schema.chatData.findOne({$and:[{chaterIds:req.params.messagerId},{chaterIds:req.params.receiverId}]   })
  console.log(chatData,'dsddsdsds');
  if(chatData){
    res.send({messages:chatData.chat})
    }
  } catch (error) {
    res.status(500).json(error)

  }
  
})

const getChatUsers = (async (req,res)=>{
  console.log(req.params.id);
  try {
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
  } catch (error) {
      res.status(500).json(error)  
  }
   
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
   const oldEmail = req.body.oldEmail
   const email = req.body.email  
    console.log(email,'&&&&&&&');

   userHelpers.editProfile(req.body).then(()=>{
    console.log('mnmnmnmn');
    if(oldEmail != email){
      console.log('mkmkm');
      otpHelper.verification(req.body.email).then((otp)=>{
        console.log(otp,'otppppp');
        res.send({message:"User created successfully",newEmail:true,otp:otp})          
      })  
    }else{  
            res.send({message:'success',newEmail:false}) 
    }
   })   
})      

const changeEmail = ((req,res)=>{
  console.log(req.body,'jujjj');
  schema.userData.updateOne({_id:req.body._id},{
    $set:{
      email:req.body.email
    }
  }).then(()=>{  
    console.log('kmkm');
    res.send({message:'success'})  
  })
})
       
module.exports  = {
   userLogin,userSignup,uploadPost,getPosts,postLike_Unlike,getAllPosts,addComment,getSuggestion,followUser,getNotification,editProfile,
   getFollowingFollowers,addMessage,getMessages,getChatUsers,addNewMessages,searchUser,addProfileImg,removeProfileImg,notificationsSeend,unFollowUser,
   changeEmail
}