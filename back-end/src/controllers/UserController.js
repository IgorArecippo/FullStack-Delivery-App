const UserService = require('../services/UserService');

const login = async (req, res, _next) => {
  try {
    const { email, password } = req.body;
    const data = await UserService.login(email, password);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(error.status).json(error.message);
    // next(error);
  }
};

const register = async (req, res, _next) => {
  const { email, password, name } = req.body;
  try {
    const data = await UserService.register(email, password, name);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(error.status).json(error.message);
  }
};

// const register = async (req, res, _next) => res.status(222).json('ok');

module.exports = {
  login,
  register,
};