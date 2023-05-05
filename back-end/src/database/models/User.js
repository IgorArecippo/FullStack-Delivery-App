module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'User',
   {
    id: { primaryKey: true, 
      autoIncrement: true,
     type: DataTypes.INTEGER },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
{ underscored: true, timestamps: false, tableName: 'users' },
);
  Users.associate = (models) => {
    Users.hasMany(models.Sale, { forreignKey: 'userId', as: 'selUser' });
    Users.hasMany(models.Sale, { foreignKey: 'sellerId', as: 'saleSeller' });
  };

  return Users;
};