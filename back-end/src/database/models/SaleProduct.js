module.exports = (sequelize, DataTypes) => {
    const SalesProducts = sequelize.define('SalesProducts', {
        saleId: { type: DataTypes.INTEGER, primaryKey: true },
        productId: { type: DataTypes.INTEGER, primaryKey: true },
        quantity: DataTypes.INTEGER,
    }, { timestamps: false, tableName: 'sales_products', underscored: true });
    SalesProducts.associate = (models) => {
          models.Product.belongsToMany(
            models.Sale,
            { foreignKey: 'productId', otherKey: 'saleId', through: SalesProducts, as: 'sales' },
            );
            models.Sale.belongsToMany(models.Product, {
                foreignKey: 'saleId', 
                otherKey: 'productId',
                through: SalesProducts,
                as: 'products',
            });
    };
    return SalesProducts;
};