'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Category_sub_tables', [
      {
        post_id: 1,
        category_id: 1
      },
      {
        post_id: 1,
        category_id: 2
      },
      {
        post_id: 2,
        category_id: 1
      },
      {
        post_id: 2,
        category_id: 3
      },
      {
        post_id: 3,
        category_id: 5
      },
      {
        post_id: 4,
        category_id: 5
      },
      {
        post_id: 4,
        category_id: 1
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Category_sub_tables', {}, null);
  }
};
