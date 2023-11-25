const AWS = require('aws-sdk');
const Log = require('../models/Log');
/**
 * @description Uploads an image to S3
 * @param imageName Image name
 * @param base64Image Image body converted to base 64
 * @param type Image type
 * @return string S3 image URL or error accordingly
 */

// Uploads the image to Amazon s3 bucket and return the image url
async function upload(req, res) {
    const uploadedFile = req.body.image;
    const params = {
        Bucket: process.env.AMAZON_BUCKET_NAME,
        Key: req.body.imageName,
        Body: Buffer.from(uploadedFile.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
        ContentType: 'image/jpeg', // Adjust based on the image type
        ACL : 'public-read'
    };

    let data;
    try {
        data = await promiseUpload(params);
    } catch (err) {
        const logEntry = new Log({
            file: 'amazonController.js', 
            exception: err.message,
          });
          await logEntry.save();
    }
    return data.Location;
}
/**
 * @description Promise an upload to S3
 * @param params S3 bucket params
 * @return data/err S3 response object
 */
async function promiseUpload(params) {
    try{
    const aws_config =
    {
        accessKeyId: process.env.AMAZON_ACCESS_KEY,
        secretAccessKey: process.env.AMAZON_SECRET_KEY,
        region: process.env.AMAZON_REGION,
    }
    const s3 = new AWS.S3(aws_config);
    return new Promise(function (resolve, reject) {
        s3.upload(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}catch(err)
{
    const logEntry = new Log({
        file: 'amazonController.js', 
        exception: err.message,
      });
      await logEntry.save();
}
}

module.exports = { upload };
