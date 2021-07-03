'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
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
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      likes: {
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
    await queryInterface.dropTable('Posts');
  }
};