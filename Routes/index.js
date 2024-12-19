const userRoutes = require('./userRoutes');
const coffeRoutes = require('./coffeRoutes');
const carrinhoRoutes = require('./carrinhoRoutes');
const pedidosRoutes = require('./pedidosRoutes');
//Arquivo que centraliza todas as rotas.
const allRoutes = [
  ...userRoutes,
  ...coffeRoutes,
  ...carrinhoRoutes,
  ...pedidosRoutes
];

module.exports = allRoutes;
