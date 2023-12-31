const express = require('express');
const OrderController = require('../controllers/OrderController');
const validateToken = require('../middlewares/authValidation');

const route = express.Router();

route.post('/orders', validateToken, OrderController.createSale);
// route.post('/orders', OrderController.createSale);

module.exports = route;