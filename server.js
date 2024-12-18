'use strict';
require('dotenv').config();

const Hapi = require('@hapi/hapi'); //importa o modulo hapi
const knexConfig = require('./knexfile'); // Importa as configurações do Knex
const knex = require('knex')(knexConfig.development); // Inicializa o Knex com o ambiente de desenvolvimento(Docker config)
const allRoutes = require("./Routes") //Pega automaticamente o arquivo index.js


 

const init = async () => {
    const server = Hapi.server({
        //port:3000,
        
        port:8000,
        //host:'0.0.0.0', - DOCKER
        host:"localhost",
        routes: {
            cors: {
            origin: ['*'], // Permite qualquer origem
                headers: ['Accept', 'Content-Type'], 
                additionalHeaders: ['Authorization'], 
            },
        },
    })
    server.route(allRoutes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err)=>{ 
    console.log(err);
    process.exit(1);
})

init();