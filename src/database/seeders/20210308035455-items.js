'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Items', [
      {
        sku: 'KIT-LOV',
        descricao: 'Kit Beyoung Lover II',
        valor: 329.90,
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01'
      },
      {
        sku: 'KIT-SKI',
        descricao: 'Kit Beyoung Skincare Completo',
        valor: 169.90,
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01'
      },
      {
        sku: 'KIT-MAK-PRO',
        descricao: 'Kit Make Inteligente + Proteção',
        valor: 209.90,
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01'
      },
      {
        sku: 'KIT-PRI',
        descricao: 'Kit BEYOUNG Primers',
        valor: 124.90,
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Items', null, {});
  }
};
