const knexConfig = require('../knexfile'); // Importa as configurações do Knex
const knex = require('knex')(knexConfig.development); // Inicializa o Knex com o ambiente de desenvolvimento
const pedidosRoutes = [
    {
        method:"GET",
        path:"/pedido",
        handler:async(request, h) =>{
            console.log(request)
            return h.response({message:"ok, recebido"}).code(200)

        }
    },
    {
        method:"POST",
        path:"/criarPedido",
        handler:async(request, h)=>{
            console.log("payload",request.payload) 
            //recebe usuario e itens
            const {user, itens} = request.payload
            console.log("criando um pedido na tabela pedido", user.id)
            try{
                // criando um pedido na tabela pedido
                let id_pedido = await knex('pedidos').insert({
                    id_usuario:user.id
                }).returning('id')
                console.log("Criado")
                console.log("Adicionando os itens na tabela itensPedido")
                id_pedido = id_pedido[0].id
                // Adicionando os itens na tabela itensPedido
                for(const item of itens){
                    console.log("Adicionando:", id_pedido, item.id)
                    await knex('itensPedido').insert({
                        id_pedido:id_pedido,
                        id_cafe:item.id
                    })
                }
                console.log("Itens adicionados")

            }catch(error){
                return h.response({message:"falha", err:error}).code(200)
            }   
            return h.response({message:"ok, recebido"}).code(200)
        }
    }
]
module.exports = pedidosRoutes;