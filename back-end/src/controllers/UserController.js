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

module.exports = {
  login,
};