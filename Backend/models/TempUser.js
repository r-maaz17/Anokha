const mongoose = require('mongoose');


// Temp User Schema
const tempUserSchema = new mongoose.Schema({
    Username: String,
    Password: String,
    Email: String,
    verificationCode: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: 'unverified',
    },
    tries:
    {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model('TempUser', tempUserSchema);
