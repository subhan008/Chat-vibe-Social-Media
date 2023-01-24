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
    
router.post('/upload-post',verifyToken, uploadPost)     
  
router.get('/profile-datas/:userId',verifyToken,getPosts)
         
router.get('/getAllPosts/:id',verifyToken,getAllPosts)
  
router.post('/post-like-Unlike',verifyToken,postLike_Unlike)

router.put('/add-comment',verifyToken,addComment)  

router.get('/suggestions/:id',verifyToken, getSuggestion)

router.post('/follow',verifyToken, followUser)
                                      
router.get('/notification/:id',verifyToken,getNotification)
                                      
router.get('/getFollowing-Followers/:id',verifyToken,getFollowingFollowers)
                                     
router.get('/getChatUsers/:id',verifyToken, getChatUsers)
  
router.post('/addMessage',verifyToken, addMessage)  
                                                                                                      
router.get('/getMessages/:messagerId/:receiverId',verifyToken, getMessages)

router.post('/add-newMessage',verifyToken, addNewMessages)

router.post('/search-user',verifyToken, searchUser)

router.post('/add-profile-photo/:id' ,verifyToken, addProfileImg)

router.put('/remove-profile-photo',verifyToken, removeProfileImg)

router.put('/notification-seened/:id',verifyToken, notificationsSeend)
   
router.put('/unFollow',verifyToken, unFollowUser)

router.put('/edit-profile',verifyToken, editProfile)

router.put('/change-email',verifyToken, changeEmail)
module.exports = router;
 