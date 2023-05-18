/* eslint-disable max-lines-per-function */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: Sequelize.INTEGER, 
        field: 'user_id',
        references: { model: 'users', key: 'id' }, 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      sellerId: { type: Sequelize.INTEGER,
        field: 'seller_id',
        references: { model: 'users', key: 'id' },
         onDelete: 'CASCADE',
         onUpdate: 'CASCADE' },
      totalPrice: { 
        type: Sequelize.DECIMAL(9, 2),
        allowNull: false,
        field: 'total_price',
      },
      deliveryAddress: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: 'delivery_address',
      },
      deliveryNumber: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'delivery_number',
      },
      saleDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'sale_date',
      },
      status: { type: Sequelize.STRING(50), allowNull: false },
 });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('sales');
  },
};
