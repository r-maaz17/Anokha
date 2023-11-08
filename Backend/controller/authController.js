const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateJWT(payload, expiresIn = '6h') {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
}


module.exports = {
    generateJWT,
};