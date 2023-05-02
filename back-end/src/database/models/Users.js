module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
'Users', 
{
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
{
      underscored: true,
      timestamps: false,
    },
);
  Users.associate = (models) => {
    Users.hasMany(models.Sales, { foreignKey: 'user_id', as: 'user_id' });
  };
  return Users;
};