// import Platform from '../models/Platform';
import {User} from "src/entities/users/users.model";

module.exports = {
  up: async (queryInterface) => {
    queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      banned: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
  },
  down: async (queryInterface) => {
    return queryInterface.dropTable('users');
  }
};