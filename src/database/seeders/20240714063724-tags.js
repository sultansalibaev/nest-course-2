'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        try {
            await queryInterface.bulkInsert('tags', [
                {
                    name: "JavaScript",
                    description: "A high-level, interpreted scripting language used in web development.",
                },
                {
                    name: "es2022",
                    description: "The latest version of the ECMAScript standard, including new features.",
                },
                {
                    name: "ecmascript 2022",
                    description: "The 2022 edition of the ECMAScript language specification.",
                },
                {
                    name: "Python",
                    description: "A high-level programming language known for its readability and versatility.",
                },
                {
                    name: "JIT-компилятор",
                    description: "Just-In-Time compiler, a feature that improves the runtime performance of programs.",
                },
                {
                    name: "JIT",
                    description: "Just-In-Time compilation, a technique for improving the performance of executed code.",
                },
                {
                    name: "VueJS",
                    description: "A JavaScript framework for building user interfaces and single-page applications.",
                },
                {
                    name: "ionic",
                    description: "A framework for building cross-platform mobile apps using web technologies.",
                },
                {
                    name: "mobile",
                    description: "Refers to mobile devices such as smartphones and tablets, and the technology associated with them.",
                },
                {
                    name: "app",
                    description: "Short for application, a program or piece of software designed to fulfill a particular purpose.",
                },
                {
                    name: "Web Development",
                    description: "The creation and maintenance of websites and web applications.",
                },
                {
                    name: "trends 2024",
                    description: "The anticipated developments and directions in technology and society for the year 2024.",
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
                    name: "nestjs",
                    description: "A progressive Node.js framework for building efficient and scalable server-side applications.",
                },
                {
                    name: "mongodb",
                    description: "A NoSQL database known for its scalability and flexibility.",
                },
                {
                    name: "API",
                    description: "Application Programming Interface, a set of rules that allow software applications to communicate with each other.",
                },
                {
                    name: "react-native",
                    description: "A framework for building native mobile apps using React.",
                },
                {
                    name: "typescript",
                    description: "A typed superset of JavaScript that compiles to plain JavaScript.",
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
        await queryInterface.bulkDelete('tags', null, {});
    }
};
