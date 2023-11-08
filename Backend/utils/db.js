const mongoose = require('mongoose')
require('dotenv').config();
mongoose.set('strictQuery',true);


mongoose.connect(process.env.DATABASE_MONGO_URI,{
    useNewUrlParser: true,
    // useUnifiedTopolgy: true,
});

const db = mongoose.connection;
db.on('error',(err)=>{
    console.log("Failed to connect with db");
})
db.once('open',()=>{
    console.log("connected with db");
})