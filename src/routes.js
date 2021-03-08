const express = require('express');
const ClientesController = require('./controllers/ClientesController');
const ItemsController = require('./controllers/ItemsController');
const PedidosController = require('./controllers/PedidosController');

const routes = express.Router();

routes.post('/clientes', ClientesController.add);
routes.get('/clientes', ClientesController.listar);
routes.get('/clientes/:id', ClientesController.get);
routes.delete('/clientes/:id', ClientesController.delete);

routes.post('/itens', ItemsController.add);
routes.get('/itens', ItemsController.listar);
routes.get('/itens/:id', ItemsController.get);
routes.delete('/itens/:id', ItemsController.delete);

routes.post('/pedidos', PedidosController.add);
routes.get('/pedidos', PedidosController.listar);
routes.get('/pedidos/:id', PedidosController.get);
routes.delete('/pedidos/:id', PedidosController.delete);

module.exports = routes;