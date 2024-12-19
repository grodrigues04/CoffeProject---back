const { default: knex } = require("knex")

const erros = {
    "usuarios_nome_usuario_unique":"O nome de usuario já existe!",
    "usuarios_email_unique":"O email digitado ja foi cadastrado"
}

const cafe_by_id = async (knex, cafeId)=>{
    try{
        return await knex("estoque").where({id:cafeId})
    }
    catch(error){
        console.log("Error na funcao cafe_by_id", error)
    }
}

const gerar_lista_de_cafe = async(knex, itens)=>{
    console.log("Itens chegando:", itens)
    let lista = []
    let resultado = []
    let total_preco = 0
    for(const item of itens){
        console.log("ITEM:", item, "ITENS:", itens)
        if(!lista.includes(item.id_cafe)){
            lista.push(item.id_cafe)
            console.log("item cafe",item.id_cafe)
            const cafe = await cafe_by_id(knex, item.id_cafe)
            resultado.push(cafe[0])
            console.log(cafe[0].preco)
            total_preco = total_preco + cafe[0].preco
        }
    }
    return resultado
}

const pedido = async(knex, lista_pedidos)=>{
    lista_de_itens_do_pedido = []
    for(const pedido of lista_pedidos){
        console.log("PEDIDO:", pedido)
        const itens = await knex("itensPedido")
            .select('id_cafe')
            .where('id_pedido', pedido.id) 
        lista_de_itens_do_pedido.push(itens)

    }
    console.log("Lista da função utils", lista_de_itens_do_pedido)
    return lista_de_itens_do_pedido
}

module.exports = {erros, cafe_by_id, pedido, gerar_lista_de_cafe}