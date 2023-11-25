const jwt = require('jsonwebtoken');
const Log = require('../models/Log');
require('dotenv').config();




// Verify the jwt token
async function verifyJWT(token) {
  try{
    return new Promise((resolve, reject) => {
      jwt.verify(token,process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }
  catch(err){
    const logEntry = new Log({
      file: 'authMiddleWare.js', 
      exception: err.message,
    });
    await logEntry.save();
  }
  }


// Verify the token is provided and check the validity of token
async function verifyTokenMiddleware(req, res, next) {
  try{
    const token = req.header('Authorization');
    console.log("token",token)
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    verifyJWT(token)
      .then((decoded) => {
        req.user = decoded;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
    }catch(err)
    {
      const logEntry = new Log({
        file: 'authMiddleware.js', 
        exception: err.message,
      });
      await logEntry.save();
    }
    
  }
 async function verifyAdminMiddleware(req, res, next) {
    try{
    const token = req.header('Authorization');
    console.log("token",token)
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    verifyJWT(token)
      .then((decoded) => {
        if (decoded.RoleId === "admin")
        {
          req.user = decoded;
        next();
        }
        else{
          return res.status(401).json({ message: 'Access denied' });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }catch(err)
    {
      const logEntry = new Log({
        file: 'authMiddleware.js', 
        exception: err.message,
      });
      await logEntry.save();
    }
  }


module.exports = {
  verifyJWT,
  verifyTokenMiddleware,
  verifyAdminMiddleware
};