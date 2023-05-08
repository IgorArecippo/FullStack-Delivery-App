const express = require('express');
const cors = require('cors');
const routeUser = require('../routes/User.Routes');
const routeRegister = require('../routes/Register.Routes');
const routeProduct = require('../routes/Product.Routes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/login', routeUser);
app.use('/register', routeRegister);
app.use('/customer', routeProduct);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;