var express = require('express');
var router = express.Router();
const userHelpers = require('../Helpers/userHelpers')
const adminHelpers = require('../Helpers/adminHelpers')
const schema = require('../dbSchema/userSchema')

const jwt = require('jsonwebtoken')
/* GET users listing. */
const  Admin = {
  name:"admin",   
  password:'123'  
}

router.post('/admin/admin-login',async function(req, res, next) {  
   
  console.log(req.body,'sasasas');
  if(req.body.name == Admin.name && req.body.password == Admin.password){
    console.log('hi');
    const token = await jwt.sign({_id:req.bod},"123",{expiresIn:"2h"})
    console.log(token);
    res.send({token: token,admin:true});  
  }
  else res.send({admin:false,message:'Invalid name or password'})
});      





  
module.exports = router;
