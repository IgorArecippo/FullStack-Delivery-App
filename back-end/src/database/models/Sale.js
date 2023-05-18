/* eslint-disable max-lines-per-function */
/* eslint-disable camelcase */
module.exports = (sequelize, DataTypes) => {
    const Sale = sequelize.define('Sale', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { 
        type: DataTypes.INTEGER,
         foreignKey: true },
      sellerId: { 
        type: DataTypes.INTEGER,
         foreignKey: true },
      totalPrice: {
        type: DataTypes.DECIMAL(9, 2),
      },
      deliveryAddress: DataTypes.STRING(100),
      deliveryNumber: DataTypes.STRING(50),
      saleDate: { type: DataTypes.DATE },
      status: { type: DataTypes.STRING(50),
    },
    }, { timestamps: false, underscored: true, tableName: 'sales' });
    Sale.associate = (models) => {
        Sale.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
        Sale.belongsTo(models.User, { as: 'seller', foreignKey: 'sellerId' });
        // Sale.hasMany(models.SalesProducts, { as: 'sale', foreignKey: 'saleId' });
    };
    return Sale;
  };