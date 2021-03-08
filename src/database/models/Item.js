const { Model, DataTypes } = require('sequelize');

class Item extends Model {
  static init(sequelize) {
    super.init({
      sku: DataTypes.STRING,
      descricao: DataTypes.STRING,
      valor: DataTypes.FLOAT,
    }, {
      sequelize
    })
  }
}

module.exports = Item;