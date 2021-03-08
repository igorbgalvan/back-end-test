const { Model, DataTypes } = require('sequelize');

class Pedido extends Model {
  static init(sequelize) {
    super.init({
      cliente_id: DataTypes.INTEGER,
      cep: DataTypes.STRING,
      frete: DataTypes.FLOAT,
      valor: DataTypes.FLOAT
    }, {
      sequelize
    })
  }
}

module.exports = Pedido;