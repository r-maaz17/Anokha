const express = require('express');
const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload');

const cors = require('cors');
require('./utils/db');
require('dotenv').config();


const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use(bodyparser.json())
app.use(cors())

app.use(fileUpload());

const productsRouter = require('./routes/productsRoutes');
const userRouter = require('./routes/userRoutes');
const amazonRouter = require('./routes/amazonRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/CartRoutes')
const stripeRoutes = require('./routes/stripeRoutes');
const messageRoutes = require('./routes/messageRoutes');
const orderRoutes = require('./routes/ordersRoutes');
const PORT = process.env.PORT;

app.use('/api/v1',productsRouter);
app.use('/api/v1',userRouter);
app.use('/api/v1',authRoutes);
app.use('/api/v1',amazonRouter);
app.use('/api/v1',cartRoutes);
app.use('/api/v1',stripeRoutes);
app.use('/api/v1',messageRoutes);
app.use('/api/v1',orderRoutes);

app.listen(PORT,()=>{
    console.log("SERVER STARTED SUCCESSFULLY");
})