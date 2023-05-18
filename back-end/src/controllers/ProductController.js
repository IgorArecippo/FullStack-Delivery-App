const ProductService = require('../services/ProductService');

const getAll = async (req, res, _next) => {
    try {
        const products = await ProductService.getAll();
        return res.status(200).json(products);
    } catch (error) {
    return res.status(400).json(error.message);
    }
};

module.exports = {
    getAll,
};