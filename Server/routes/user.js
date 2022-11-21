var express = require('express');
var router = express.Router();
const {userLogin,userSignup,uploadPost,getPosts,postLiked} = require('../Controllers/UserController/UserController')
const jwt = require('jsonwebtoken')
const multer  = require('multer')
const path = require('path');

require('dotenv').config();     

router.post('/signup',userSignup)

router.post('/login', userLogin)    

router.post('/upload-post', uploadPost)     

router.get('/getPosts/:userId',getPosts)

router.post('/post-liked',postLiked)


module.exports = router;
 