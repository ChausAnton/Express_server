'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      author: {
        type: Sequelize.STRING
      },
      author_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        }
      },
      post_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts',
          key: 'id',
        }
      },
      content: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive')
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
    await queryInterface.dropTable('Comments');
  }
};