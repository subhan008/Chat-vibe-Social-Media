const jwt = require("jsonwebtoken");

require('dotenv').config();     


const verifyToken = async (req, res, next) => {
  try {
  const authorization = req.headers['authorization']
  if (!authorization) {
      // throw new Error ('You need to login')
      return res.status(500).json({ data: 'you need to login' })
  }
  var token = req.headers.authorization.split(' ')[1];
  console.log(token,'jiijijijij');         
   
  const user = jwt.verify(token, process.env.SECRET_KEY, {}, (err,dec)=>{
    if(err){
        console.log('llplp',err);      
        return res.status(500).json({ data: 'Authentication failed' })
      }
  })
      if (user != null) {
        console.log('mkmkm');   
          next()    
      }
  } catch (error) {   
      console.log("fsndjsndjsdsnj",error);
      res.status(500).send({ error: "Authentication failed" })
  }
  
}


module.exports = {
    verifyToken,
  
  };         