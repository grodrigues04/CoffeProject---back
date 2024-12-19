const erros = {
    "usuarios_nome_usuario_unique":"O nome de usuario já existe!",
    "usuarios_email_unique":"O email digitado ja foi cadastrado"
}

const cafe_by_id = async (knex, cafeId)=>{
    return await knex("estoque").where({id:cafeId})
}

module.exports = {erros, cafe_by_id}