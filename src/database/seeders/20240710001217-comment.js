'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('comments', [{
      id: 1,
      text: "\"Интересно\" - это эвфемизм?",
      articleId: 1,
      userId: 1,
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
  }
};
