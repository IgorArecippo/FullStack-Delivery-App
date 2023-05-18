const OrderService = require('../services/OrderService');

const createSale = async (req, res, _next) => {
  const {
    userId,
    sellerId, totalPrice, deliveryAddress, deliveryNumber,
    status, carrinho } = req.body;
  try {
    const sale = await OrderService.createSale({
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      status,
      carrinho,
    });
      return res.status(201).json(Number(sale));
  } catch (error) {
     return res.status(400).json(error.message);
  }
};

module.exports = {
    createSale,
  };