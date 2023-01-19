var express = require('express');
var router = express.Router();
const {userLogin,userSignup,uploadPost,getPosts,postLike_Unlike,getAllPosts,addComment,getSuggestion,followUser,getNotification,
    getFollowingFollowers,addMessage,getMessages,getChatUsers,addNewMessages,searchUser,addProfileImg,removeProfileImg,notificationsSeend
    ,unFollowUser,editProfile,changeEmail} = require('../Controllers/UserController/UserController')
const jwt = require('jsonwebtoken')
const multer  = require('multer')
const path = require('path');
const { verifyToken } = require("../middleWares/middleWares")
require('dotenv').config(); 

console.log(verifyToken);

router.post('/signup',userSignup)      
  
router.post('/login', userLogin)      
  
router.post('/upload-post', uploadPost)     
  
router.get('/profile-datas/:userId',getPosts)
         
router.get('/getAllPosts/:id',getAllPosts)
  
router.post('/post-like-Unlike',postLike_Unlike)

router.put('/add-comment',addComment)  

router.get('/suggestions/:id', getSuggestion)

router.post('/follow', followUser)
                                      
router.get('/notification/:id',getNotification)
                                      
router.get('/getFollowing-Followers/:id',getFollowingFollowers)
                                     
router.get('/getChatUsers/:id', getChatUsers)
  
router.post('/addMessage', addMessage)  
                                                                                                      
router.get('/getMessages/:messagerId/:receiverId', getMessages)

router.post('/add-newMessage', addNewMessages)

router.post('/search-user', searchUser)

router.post('/add-profile-photo/:id' , addProfileImg)

router.put('/remove-profile-photo', removeProfileImg)

router.put('/notification-seened/:id', notificationsSeend)
   
router.put('/unFollow', unFollowUser)

router.put('/edit-profile', editProfile)

router.put('/change-email', changeEmail)
module.exports = router;
 