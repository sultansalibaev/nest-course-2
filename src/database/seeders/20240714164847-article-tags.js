'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        try {
            await queryInterface.bulkInsert('article_tags', Object.entries({
                1: [ 1, 2, 3 ],
                2: [ 4, 5, 6 ],
                3: [ 7, 8, 9, 10 ],
                4: [ 11, 12, 13, 14 ],
                5: [ 15, 16, 17, 14 ],
                6: [ 18, 19, 9, 10 ],
            })
              .map(([key, values]) => (
                values.map(tagId => ({
                  articleId: Number(key),
                  tagId,
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
        await queryInterface.bulkDelete('article_tags', null, {});
    }
};
