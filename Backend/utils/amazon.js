const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const json = express.json();
const port = 4000
const AWS = require('aws-sdk');
require('dotenv').config();


app.use(json)
app.use(fileUpload())


app.post('/upload', async (req, res) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
  
      const uploadedFile = req.files.image;
      const s3 = new AWS.S3();
  
      const params = {
        Bucket: 'your-s3-bucket-name',
        Key: uploadedFile.name,
        Body: uploadedFile.data,
      };
  
      const data = await s3.upload(params).promise();
      console.log('File uploaded to S3:', data);
  
      res.send('File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send('Internal Server Error');
    }
  });