const express = require('express');
const bodyparser = require('body-parser')
require('./utils/db');
require('dotenv').config();


const app = express();

app.use(bodyparser.json())

const ordersRouter = require('./routes/ordersRoutes');
const PORT = process.env.PORT;

app.use('/api/v1/',ordersRouter);
app.listen(PORT,()=>{
    console.log("SERVER STARTED SUCCESSFULLY");
})