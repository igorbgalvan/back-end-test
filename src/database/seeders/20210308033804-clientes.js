'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Clientes', [
      {
        nome: 'Gabriel Martinez',
        email: 'gabriel@exemplo.com',
        cpf: '098.685.060-85',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01'
      },
      {
        nome: 'Tester da Silva',
        email: 'silva@teste.com',
        cpf: '279.776.250-91',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01'
      },
      {
        nome: 'Develop Beyounger',
        email: 'beyoung@dev.com',
        cpf: '440.069.220-51',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Clientes', null, {});
  }
};
