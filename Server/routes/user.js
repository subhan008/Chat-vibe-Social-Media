var express = require('express');
var router = express.Router();
const {userLogin,userSignup,uploadPost,getPosts,postLike_Unlike,getAllPosts,addComment,getSuggestion,
    followUser,getNotification,getFollowingFollowers,addMessage,getMessages,getChatUsers,addNewMessages} = require('../Controllers/UserController/UserController')
const jwt = require('jsonwebtoken')
const multer  = require('multer')
const path = require('path');
require('dotenv').config(); 

router.post('/signup',userSignup)      

router.post('/login', userLogin)      
  
router.post('/upload-post', uploadPost)     

router.get('/profile-datas/:userId',getPosts)

router.get('/getAllPosts',getAllPosts)

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
module.exports = router;
 