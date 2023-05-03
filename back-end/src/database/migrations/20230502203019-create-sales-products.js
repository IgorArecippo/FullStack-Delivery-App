module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales_products', {
      saleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'sales', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'products', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
      },
      quantity: { type: Sequelize.INTEGER },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales_products');
  },
};
