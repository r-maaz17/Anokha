const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();


//Generate JWT Token
async function generateJWT(payload, expiresIn = process.env.JWT_TOKEN_EXPIRY_TIME) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
}


// Login and save the jwt token in the system
async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ Email: email });
        if (!user) return res.status(404).json({ error: 'User not found' });
        if (user.Password != password) return res.status(401).json({ error: 'Invalid credentials' });
        const token = await GenerateToken(JSON.stringify(user));
        user.token = token;
        await user.save();
        return res.status(200).json({
            message: 'Logged in successfully',
            email: email,
            token: token
        });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

// Generate JWT token
async function GenerateToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
    return token;
};

//validate jwt token is valid or not and authorization header is present or not
function validateToken(req, res, next) {
    var token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    token = token.split(' ')[1]; //it is good to write such codes in try catch to handle proper exceptions
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        // If the token is valid, save the decoded information for later use
        req.user = JSON.parse(decoded);
        next();
    });
}

//Helps to return userId based on the token sent to 
async function getUserAuth(req, res) {
    const { token } = req.body;
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({});
        }
        // If the token is valid, save the decoded information for later use
        return res.status(200).json(decoded);
    });
}


module.exports = {
    generateJWT,
    login,
    getUserAuth,
    validateToken,
};