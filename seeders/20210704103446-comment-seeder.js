'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comments', [
      {
        author_id: 1,
        post_id: 2,
        content: 'some comment',
        likes: 0,
        status: 'active'
      },
      {
        author_id: 3,
        post_id: 1,
        content: 'some comment',
        likes: 0,
        status: 'inactive'
      },
      {
        author_id: 4,
        post_id: 1,
        content: 'some comment',
        likes: -1,
        status: 'active'
      },
      {
        author_id: 1,
        post_id: 2,
        content: 'some comment',
        likes: 0,
        status: 'active'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', {}, null);
  }
};
