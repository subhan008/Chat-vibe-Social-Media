const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    console.log('dededed');
  let authHeader = req.headers.token;
  console.log(req.headers,"req.headers in vrify token middleware");
  if (authHeader) {
 // authHeader = authHeader.replaceAll('"', "");
    const token = authHeader.split(" ")[1];
    console.log(token,"user tokennnnn");
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err, "invalid token");
        res.status(403).json({ authError: true });
      } else {
        console.log("inside");
        next();
      }
    });  
  } else {
    console.log('mkmkmkk');
    return res.status(401).json({ authError: true ,message:"you are not authenticated"});
  }
};


module.exports = {
    verifyToken,
  
  };