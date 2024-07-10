'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('profile', [{
      id: 1,
      balance: 0,
      avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
      gender: 'male',
      firstname: 'Sultan',
      lastname: 'Salibaev',
      age: 20,
      currency: 'RUB',
      country: 'Kazakhstan',
      city: 'Semey',
      birth_date: 1046109600000,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('profile', null, {});
  }
};
