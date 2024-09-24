'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('environments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      softwareType: {
        type: Sequelize.ENUM('erp','sgbd')
      },
      expirationDate: {
        type: Sequelize.DATE
      },
      usuario_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: 'usuarios' , key: 'uuid' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('environments');
  }
};