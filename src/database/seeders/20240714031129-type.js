'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        try {
            await queryInterface.bulkInsert('types', [
                {
                    name: "JavaScript",
                    description: "A high-level, interpreted scripting language used in web development.",
                },
                {
                    name: "IT",
                    description: "Information Technology, encompassing all forms of technology used to create, store, exchange, and use information.",
                },
                {
                    name: "Polotics",
                    description: "The activities, actions, and policies used to gain and hold power in a government or to influence the government.",
                },
                {
                    name: "Science",
                    description: "The systematic study of the structure and behavior of the physical and natural world through observation and experiment.",
                },
                {
                    name: "Economics",
                    description: "The social science that studies the production, distribution, and consumption of goods and services.",
                },
                {
                    name: "Python",
                    description: "A high-level programming language known for its readability and versatility.",
                },
                {
                    name: "Программирование",
                    description: "The process of designing and building an executable computer program to accomplish a specific task.",
                },
                {
                    name: "Компиляторы",
                    description: "Programs that translate source code written in a programming language into machine code.",
                },
                {
                    name: "Управление разработкой",
                    description: "The process of managing software development, including planning, monitoring, and controlling the production of software.",
                },
                {
                    name: "Разработка под iOS",
                    description: "Development of applications for Apple's iOS operating system.",
                },
                {
                    name: "Разработка под Android",
                    description: "Development of applications for Google's Android operating system.",
                },
                {
                    name: "VueJS",
                    description: "A JavaScript framework for building user interfaces and single-page applications.",
                },
                {
                    name: "Web Development",
                    description: "The creation and maintenance of websites and web applications.",
                },
                {
                    name: "Frontend",
                    description: "The client-side development of web applications, focusing on user interface and user experience.",
                },
                {
                    name: "Backend",
                    description: "The server-side development of web applications, focusing on server logic, database management, and API integration.",
                },
                {
                    name: "Technology",
                    description: "The application of scientific knowledge for practical purposes, especially in industry.",
                },
                {
                    name: "Node.js",
                    description: "A JavaScript runtime built on Chrome's V8 JavaScript engine, used for building server-side applications.",
                },
                {
                    name: "API",
                    description: "Application Programming Interface, a set of rules that allow software applications to communicate with each other.",
                },
                {
                    name: "ReactJS",
                    description: "A JavaScript library for building user interfaces, maintained by Facebook.",
                },
            ].map((type, i) => ({
                id: i+1,
                ...type,
                createdAt: new Date(),
                updatedAt: new Date()
            })));
        }
        catch (e) {
            console.log(e)
        }
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('types', null, {});
    }
};
