const express = require('express');
const ProductController = require('../controllers/ProductController');

const route = express.Router();

route.get('/products', ProductController.getAll);

module.exports = route;