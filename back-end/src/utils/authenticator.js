const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const file = path.resolve(__dirname, '../../jwt.evaluation.key');

const secret = fs.readFileSync(file, 'utf8');

const JWT_CONFIG = {
  algorithm: 'HS256',
  expiresIn: '5d',
};

const createToken = (data) => jwt.sign({ data }, secret, JWT_CONFIG);

const verifyToken = (token) => jwt.verify(token, secret);

const newToken = (user) => {
  const token = createToken({ email: user.email, role: user.role, userId: user.id });
  return token;
};
module.exports = { createToken, verifyToken, newToken };