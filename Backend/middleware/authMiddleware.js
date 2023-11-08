const jwt = require('jsonwebtoken');
require('dotenv').config();


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

function verifyTokenMiddleware(req, res, next) {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    verifyJWT(token)
      .then((decoded) => {
        req.user = decoded;
        next();
      })
      .catch((err) => {
        return res.status(401).json({ message: 'Invalid token.' });
      });
  }


module.exports = {
  verifyJWT,
  verifyTokenMiddleware,
};