module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
  'Products',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    price: DataTypes.DECIMAL(4, 2),
    urlImage: DataTypes.STRING,
  },
  { underscored: true, timestamps: false, tableName: 'products' },
);

  return Products;
};