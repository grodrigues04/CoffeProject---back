'use strict';
const knexConfig = require('../knexfile'); // Importa as configurações do Knex
const knex = require('knex')(knexConfig.development); // Inicializa o Knex com o ambiente de desenvolvimento
const utils = require("./utils")

const carrinhoRoutes = [
    {
        method:"POST",
        path:"/novoItemCarrinho",
        handler:async(request, h) =>{
            console.log(request.payload)
            const {id_item, id_user} = request.payload.body;
            console.log(id_user)
            try{
                const id_carrinho = await knex('carrinho')  
                    .select('id') 
                    .where('id_usuario', id_user) 
                    .first(); 

                
                const [id] = await knex('itensCarrinho').insert({
                    id_cafe:id_item,
                    id_carrinho:id_carrinho.id
                }).returning('id')
                


                console.log("Adicionado ao carrinho! ")

            }
            catch(error){
                console.log(error)
            }
            return h.response({message:"ok, recebido"}).code(200)
        }
    },
    {
        method:"GET",
        path:"/ItensCarrinho/{id}",
        handler:async(request, h)=>{
            const user_id_front = request.params.id
            
            try{
                //Pegando o carrinho associado ao usuaro
                const id_carrinho_user = await knex('carrinho')  
                    .select('id') 
                    .where('id_usuario', user_id_front) 
                    .first();
                console.log("id carrinho",id_carrinho_user)

                //Pega todos os itens das linhas que tem o id "id_carrinho_user"
                const itens = await knex('itensCarrinho')  
                    .select('id_cafe') 
                    .where('id_carrinho', id_carrinho_user.id) 
                
                console.log(itens)
                let lista = []
                let resultado = []
                let total_preco = 0
                console.log("rodei")
                for(const item of itens){

                    if(!lista.includes(item.id_cafe)){
                        lista.push(item.id_cafe)
                        const cafe = await utils.cafe_by_id(knex, item.id_cafe)
                        resultado.push(cafe[0])
                        console.log(cafe[0].preco)
                        total_preco = total_preco + cafe[0].preco
                    }
                }
                console.log(total_preco > 0)
                //preco vai ser sempre o ultimo item do array resultado

                console.log(total_preco)
                const data_info = {"resultado":resultado, "preco_total":total_preco}
                return h.response({message:"Tudo certo",data_info}).code(200)

            }
            catch(error){
                return h.response({message:"error", error:error}).code(400)
            }
        }
    }
]

module.exports = carrinhoRoutes