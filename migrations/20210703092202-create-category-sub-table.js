'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Category_sub_tables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      post_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts',
          key: 'id',
        }
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Category_sub_tables');
  }
};