/* eslint-disable max-lines-per-function */
const { Sale } = require('../database/models');
// const { Sale, SalesProducts } = require('../database/models');

const createSale = async (data) => {
    const { userId,
        sellerId,
        totalPrice,
        deliveryAddress,
        deliveryNumber,
        status,
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

    // await Promise.all(carrinho.map((saleProduct) => SalesProducts
    //     .create({ saleId: id, productId: saleProduct.id, quantity: saleProduct.quantidade })));
    return id;
};

module.exports = {
    createSale,
};