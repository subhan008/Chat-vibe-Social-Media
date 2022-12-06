var express = require('express');
var router = express.Router();
const {userLogin,userSignup,uploadPost,getPosts,postLike_Unlike,
      getAllPosts,addComment,getSuggestion,followUser,getNotification,getFollowing} = require('../Controllers/UserController/UserController')
const jwt = require('jsonwebtoken')
const multer  = require('multer')
const path = require('path');
  
require('dotenv').config();     

router.post('/signup',userSignup)      

router.post('/login', userLogin)    

router.post('/upload-post', uploadPost)     

router.get('/profile-datas/:userId',getPosts)

router.get('/getAllPosts',getAllPosts)

router.post('/post-liked',postLike_Unlike)

router.put('/add-comment',addComment)

router.get('/suggestions', getSuggestion)

router.post('/follow', followUser)

router.get('/notification/:id',getNotification)

router.get('/getFollowing-Followers/:id',getFollowing)

module.exports = router;
 