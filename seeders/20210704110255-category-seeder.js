'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        title: "some title",
        description: "some description"
      },
      {
        title: "some title1",
        description: "some description1"
      },
      {
        title: "some title2",
        description: "some description2"
      },
      {
        title: "some title3",
        description: "some description3"
      },
      {
        title: "some title4",
        description: "some description4"
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', {}, null);
  }
};
