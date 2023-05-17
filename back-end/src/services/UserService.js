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

const findByName = async (name) => {
  const user = await User.findOne({
    where: {
      name,
    },
  });
  return user;
};

const login = async (email, password) => {
  const user = await findByEmail(email);
  if (!user) throw customError(errorStatus.NOT_FOUND, errorMessages.NOT_FOUND);
  const userPassword = md5(password) === user.password;
  if (!userPassword) throw customError(errorStatus.INVALID_FIELDS, errorMessages.INVALID_FIELDS);
  const token = newToken(user);
  return { token, role: user.role, name: user.name, id: user.id };
};

const register = async (email, password, name) => {
  const all = await User.findAll();
  console.log(all);
  const findEmail = await findByEmail(email);
  const findName = await findByName(name);
  if (findEmail || findName) {
    throw customError(errorStatus.CONFLICT, errorMessages.CONFLICT);
  }
  const passwordHash = md5(password);
  const role = 'customer';
  const infoUser = { name, email, password: passwordHash, role };
  console.log(passwordHash);
  const newUser = await User.create(infoUser);
  console.log(newUser);
  const token = newToken(newUser);
  return { token, role: newUser.role, name: newUser.name, id: newUser.id };
};

module.exports = {
  login,
  register,
};
