const Product = require('../models/products');
const AWS = require('aws-sdk');

// Create a new product
exports.createProduct = async (req, res) => {
  // try {
    console.log(req.body)
    req.body.image = await upload(req.body.image)
    
    const product = new Product({
      ...req.body,
      createdBy: req.user._id || 'unknown',
      updatedBy: req.user._id || 'unknown',
    });
    await product.save();
    console.log("product",product)
    res.status(201).json(product);
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ error: error.message });
  // }
};

async function upload(body,imageName) {
  console.log(body)
  const uploadedFile = body.image;

  const params = {
      Bucket: process.env.AMAZON_BUCKET_NAME,
      Key: body.imageName,
      Body: Buffer.from(uploadedFile.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
      ContentType: 'image/jpeg', // Adjust based on the image type
      ACL : 'public-read'
  };

  let data;
  try {
      data = await promiseUpload(params);
  } catch (err) {
      console.error(err);
      return "";
  }
  return data.Location;
}
function promiseUpload(params) {
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
}

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a product by ProductId
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product by ProductId
exports.updateProduct = async (req, res) => {
  try {
    const updatedBy = req.user._id || 'unknown';
    const product = await Product.findOneAndUpdate(
      { _id: req.params.productId },
      { ...req.body, updatedBy: updatedBy }, // Set the updatedBy field
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product by ProductId
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndRemove({ ProductId: req.params.productId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
