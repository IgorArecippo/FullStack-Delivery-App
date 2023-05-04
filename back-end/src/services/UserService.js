const md5 = require('md5');
const { User } = require('../database/models');
const { newToken } = require('../utils/authenticator');
const { customError, errorMessages, errorStatus } = require('../utils/erros');

const findByEmail = async (email) => {
    const user = await User.findOne({
       where: { 
        email,
      },
      });
    return user;
};

const login = async (email, password) => {
  const user = await findByEmail(email);
  if (!user) throw customError(errorStatus.INVALID_FIELDS, errorMessages.INVALID_FIELDS);
  const userPassword = md5(password) === user.password;
  if (!userPassword) throw customError(errorStatus.NOT_FOUND, errorMessages.INVALID_FIELDS);
  const token = newToken(user);
  return { token, role: user.role, name: user.name };
};

module.exports = {
  login,
};
