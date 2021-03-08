const express = require('express');
const routes = require('./routes');

require('dotenv').config()
require('./database');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.APP_PORT, '0.0.0.0', function() {
    console.log('Rodando na porta ' + process.env.APP_PORT)
});