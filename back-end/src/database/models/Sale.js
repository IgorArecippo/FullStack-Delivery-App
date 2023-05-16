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
      total_price: DataTypes.DECIMAL(9, 2),
      delivery_address: DataTypes.STRING(100),
      delivery_number: DataTypes.STRING(50),
      sale_date: { type: DataTypes.DATE },
      status: { type: DataTypes.STRING(50),
    },
    }, { timestamps: false, underscored: false, tableName: 'sales' });
    Sale.associate = (models) => {
        Sale.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
        Sale.belongsTo(models.User, { as: 'seller', foreignKey: 'seller_id' });
        // Sale.hasMany(models.SalesProducts, { as: 'sale', foreignKey: 'saleId' });
    };
    return Sale;
  };