const jwt = require("jsonwebtoken");

require('dotenv').config();     


const verifyToken = async (req, res, next) => {
  try { 
     console.log('aaaaaaa');

  const authorization = req.headers['authorization']
  console.log(authorization,'aaaaaaa');

  if (!authorization) {
    
      // throw new Error ('You need to login')
      return res.json({ data: 'you need to login' })
  }
  console.log('aaaaaaa');

  const tok = authorization.split(' ')[1]
  const token  = tok.replace(/['"]+/g, '')
  console.log(token,'jiijijijij');           
      
  const user = jwt.verify(token, process.env.SECRET_KEY)
  console.log(user,'ooooooooo');
      if (user != null) {
        console.log('mkmkm');   
          next()           
      }
  } catch (error) {          
      console.log("fsndjsndjsdsnj",error);
      res.send({ err:true,error: "Authentication failed" })
  }
  
}


module.exports = {
    verifyToken,
  
  };         