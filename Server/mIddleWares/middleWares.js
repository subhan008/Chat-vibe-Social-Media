const jwt = require("jsonwebtoken");

require('dotenv').config();     


const verifyToken = async (req, res, next) => {
  try {
  const authorization = req.headers['authorization']
  if (!authorization) {
      // throw new Error ('You need to login')
      return res.status(500).json({ data: 'you need to login' })
  }
  const token = authorization.split(' ')[1]
  console.log(token,'jiijijijij');
  console.log(process.env.SECRET_KEY,'exsasasasasas');
  console.log(jwt.verify(token, process.env.SECRET_KEY),'kikikikiki');
  
  const  userId  = await verify(token,process.env.SECRET_KEY)
  console.log(userId,"ahhhhhhhhhhhhhh");
      if (userId != null) {
          next()
      }
  } catch (error) {
      console.log("fsndjsndjsdsnj",error);
      res.status(500).send({ error: "Authentication failed" })
  }
  // verify(token, process.env.JWT_SECRET_TOKEN, function (err) {
  //     if (err) {
  //         res.status(500).send({ error: "Authentication failed" })
  //     }
  //     else {
  //         console.log('token verified');
  //         next();
  //     }
  // })
}


module.exports = {
    verifyToken,
  
  };