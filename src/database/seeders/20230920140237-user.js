'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      id: 1,
      username: 'Sula',
      phone: '87789857552',
      email: 'in7678523@gmail.com',
      password: '$2a$05$sTlVywmyJBenZfz81Qja/efZ4tKBg/4/RI9k7ZFhbws0XFZlfvd0K',
      isActivated: true,
      activationLink: "42a0bf5f-2ff4-430d-ba44-37ef0700459d",
      createdAt: new Date(),
      updatedAt: new Date(),
      banned: false,
      banReason: null,
      refreshToken: null,
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
