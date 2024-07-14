'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        try {
            await queryInterface.bulkInsert('article_types', Object.entries({
                1: [ 1, 2, 3, 4, 5 ],
                2: [ 6, 7, 8, 9 ],
                3: [ 10, 11, 12 ],
                4: [ 13, 14, 15, 2, 16 ],
                5: [ 17, 15, 18 ],
                6: [ 10, 11, 19 ],
            })
              .map(([key, values]) => (
                values.map(typeId => ({
                  articleId: Number(key),
                  typeId,
                  createdAt: new Date(),
                  updatedAt: new Date()
                }))
              )).flat());
        }
        catch (e) {
            console.log(e)
        }
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('article_types', null, {});
    }
};
