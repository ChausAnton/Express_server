'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Posts', [
      {
        author_id: 3,
        title: 'some title',
        content: 'some content',
        likes: 1,
        status: 'active'
      },
      {
        author_id: 4,
        title: 'some title',
        content: 'some content',
        likes: 2,
        status: 'active'
      },
      {
        author_id: 2,
        title: 'some title',
        content: 'some content',
        likes: 1,
        status: 'active'
      },
      {
        author_id: 1,
        title: 'some title',
        content: 'some content',
        likes: 0,
        status: 'inactive'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', {}, null);
  }
};
