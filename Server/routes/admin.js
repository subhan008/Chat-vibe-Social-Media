var express = require('express');
var router = express.Router();
const {login,reportUser,getReportedUsers,block_unBlock,getReportedPosts,deleteReportedPost} = require('../Controllers/AdminController/adminController')
const { verifyToken } = require("../middleWares/middleWares")


  

router.post('/admin/login',login );      
 

router.get('/admin/reported-users',verifyToken,getReportedUsers );      

router.put('/admin/block',verifyToken, block_unBlock)
  
router.put('/admin/unblock',verifyToken block_unBlock)

router.get('/admin/reported-posts',verifyToken, getReportedPosts)

router.put('/admin/delete-post',verifyToken, deleteReportedPost)

module.exports = router;
   