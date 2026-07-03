const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customerController')

router.get('/getAllCustomers', CustomerController.getAllCustomers);
router.post('/createCustomer', CustomerController.createCustomer);
router.put('/updateCustomer', CustomerController.updateCustomer);

module.exports = router