const express = require('express');
const router = express.Router();
const customerController = require('../controller/customerController');

// Create a new customer
router.post('/customers', customerController.createCustomer);

// Get all customers
router.get('/customers', customerController.getCustomers);

// Get a customer by CustomerId
router.get('/customers/:customerId', customerController.getCustomerById);

// Update a customer by CustomerId
router.put('/customers/:customerId', customerController.updateCustomer);

// Delete a customer by CustomerId
router.delete('/customers/:customerId', customerController.deleteCustomer);

module.exports = router;
