const jwt = require('jsonwebtoken');
require('dotenv').config();




// Verify the jwt token
function verifyJWT(token) {
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


// Verify the token is provided and check the validity of token
function verifyTokenMiddleware(req, res, next) {
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
  }
  function verifyAdminMiddleware(req, res, next) {
    const token = req.header('Authorization');
    console.log("token",token)
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    verifyJWT(token)
      .then((decoded) => {
        if (decoded.RoleId === "admin")
        {
        next();
        }
        else{
          return res.status(401).json({ message: 'Access denied' });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }


module.exports = {
  verifyJWT,
  verifyTokenMiddleware,
  verifyAdminMiddleware
};