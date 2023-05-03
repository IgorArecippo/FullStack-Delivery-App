const express = require('express');
const userController = require('../controllers/UserController');

const route = express.Router();

route.post('/', userController.login);

module.exports = route;