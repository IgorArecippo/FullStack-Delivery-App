module.exports = (sequelize, DataTypes) => {
    const Sale = sequelize.define('Sale', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      sellerId: { type: DataTypes.INTEGER, foreignKey: true },
      totalPrice: DataTypes.DECIMAL(9, 2),
      deliveryAddress: DataTypes.STRING(100),
      deliveryNumber: DataTypes.STRING(50),
      saleDate: { type: DataTypes.DATE },
      status: { type: DataTypes.STRING(50),
    },
    }, { timestamps: false, underscored: true, tableName: 'sales' });
    Sale.associate = (models) => {
        Sale.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
        Sale.belongsTo(models.User, { as: 'seller', foreignKey: 'seller_id' });
        // Sale.hasMany(models.SalesProducts, { as: 'sale', foreignKey: 'saleId' });
    };
    return Sale;
  };