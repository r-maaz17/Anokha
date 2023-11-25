const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Log = require('../models/Log');

require('dotenv').config();


//Generate JWT Token
async function generateJWT(payload, expiresIn = process.env.JWT_TOKEN_EXPIRY_TIME) {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
    }
    catch (err) {
        const logEntry = new Log({
            file: 'authController.js',
            exception: err.message,
        });
        await logEntry.save();
    }
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
        const logEntry = new Log({
            file: 'authController.js',
            exception: err.message,
        });
        await logEntry.save();
    }
};

// Generate JWT token
async function GenerateToken(payload) {
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
        return token;
    }
    catch (err) {
        const logEntry = new Log({
            file: 'authController.js',
            exception: err.message,
        });
        await logEntry.save();
    }
};

//validate jwt token is valid or not and authorization header is present or not
async function validateToken(req, res, next) {
    try {
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
    catch (err) {
        const logEntry = new Log({
            file: 'authController.js',
            exception: err.message,
        });
        await logEntry.save();
    }
}

//Helps to return userId based on the token sent to 
async function getUserAuth(req, res) {
    try {
        const { token } = req.body;
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({});
            }
            // If the token is valid, save the decoded information for later use
            return res.status(200).json(decoded);
        });
    }
    catch (err) {
        const logEntry = new Log({
            file: 'authController.js',
            exception: err.message,
        });
        await logEntry.save();
    }
}


module.exports = {
    generateJWT,
    login,
    getUserAuth,
    validateToken,
};