const userRoutes = require('./userRoutes');
const coffeRoutes = require('./coffeRoutes');
const carrinhoRoutes = require('./carrinhoRoutes');
//Arquivo que centraliza todas as rotas.
const allRoutes = [
  ...userRoutes,
  ...coffeRoutes,
  ...carrinhoRoutes
];

module.exports = allRoutes;
