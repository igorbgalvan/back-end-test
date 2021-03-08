const { Model, DataTypes } = require('sequelize');

class PedidoItems extends Model {
  static init(sequelize) {
    super.init({
      pedido_id: DataTypes.INTEGER,
      item_id: DataTypes.INTEGER,
      quantidade: DataTypes.INTEGER,
      valor: DataTypes.FLOAT
    }, {
      sequelize
    })
  }
}

module.exports = PedidoItems;