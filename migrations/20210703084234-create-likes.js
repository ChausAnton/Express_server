'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Likes', {
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
        allowNull: true,
        references: {
          model: 'Posts',
          key: 'id',
        }
      },
      comment_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Comments',
          key: 'id',
        }
      },
      type: {
        type: Sequelize.ENUM('like', 'dislike')
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
    await queryInterface.dropTable('Likes');
  }
};