const Sequelize = require('sequelize');
const postgres = require('../config/database');

const Cliente = require('./models/Cliente');
const Item = require('./models/Item');
const Pedido = require('./models/Pedido');
const PedidoItem = require('./models/PedidoItem');

const conn = new Sequelize(postgres);

Cliente.init(conn);
Item.init(conn);
Pedido.init(conn);
PedidoItem.init(conn);

module.exports = conn;