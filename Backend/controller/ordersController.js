const Order = require('../models/orders');
const user = require('../models/user');

// Create a new order
exports.createOrder = async (req, res) => {
  // try {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(today.getDate()).padStart(2, '0');

  const todayDate = `${year}-${month}-${day}`;
  var email = await user.findOne({ _id: req.userId.replace(/"/g, '') });
  console.log("USER ", email)
  email = email.Email;
  req.body.userEmail = email;
  req.body.userId = req.userId.replace(/"/g, '')
  req.body.Status = 'Pending';
  req.body.OrderDate = todayDate;
  console.log("body", req.body);
  const order = new Order(req.body);
  await order.save();
  res.status(201).json(order);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an order by OrderId
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ OrderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.setOrderStatus = async (req, res) => {
    const updatedBy = req.userId;
    if (req.body.status === "approve" || req.body.status === "reject")
    {
    const message = await Order.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { Status: req.body.status,updatedBy: updatedBy.replace(/"/g, '')} },
      { new: true } // This ensures that the updated document is returned
    );
    res.status(200).json(message);
    }

  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
};
// Update an order by OrderId
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { OrderId: req.params.orderId },
      req.body,
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an order by OrderId
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndRemove({ OrderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
