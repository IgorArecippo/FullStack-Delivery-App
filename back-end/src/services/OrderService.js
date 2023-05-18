/* eslint-disable max-lines-per-function */
// const { Sale } = require('../database/models');
const { Sale, SalesProducts } = require('../database/models');

const createSale = async (data) => {
    const { userId,
        sellerId, totalPrice, deliveryAddress, 
        deliveryNumber, status, carrinho,
    } = data;
    const sale = await Sale.create({ userId,
        sellerId,
        totalPrice,
        deliveryAddress,
        deliveryNumber,
        saleDate: new Date(),
        status,
    });
    const { id } = sale;
    const newCarrinho = carrinho.map((p) => {
        const obj = { saleId: id, productId: p.id, quantity: p.quantidade };
        return obj;
    });
    await SalesProducts.bulkCreate(newCarrinho);
    return id;
};

module.exports = {
    createSale,
};