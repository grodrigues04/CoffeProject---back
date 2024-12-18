// userRoutes.js
const knexConfig = require('../knexfile'); // Importa as configurações do Knex
const knex = require('knex')(knexConfig.development); // Inicializa o Knex com o ambiente de desenvolvimento
const bcrypt = require('bcrypt');
const erros = require("./utils")

async function Password(senha) {
  const saltRound = 10
  const hashedPassword = await bcrypt.hash(senha, saltRound)
  console.log("Retornado senha protegida...")
  return hashedPassword
}

async function verifyPassword(senha, criptSenha) {
  const isMatch = await bcrypt.compare(senha, criptSenha);
  return isMatch; // Retorna true se a senha for correta, false caso contrário.
}

const userRoutes = [
    {
      method: 'GET',
      path: '/users',
      handler: async(request, h) => {
        
        try{
          const usuarios = await knex('usuarios').select("*")
          return h.response(usuarios).code(200)
        }
        catch(error){
          console.log("Ocorreu um erro:", error)
          return h.response({message:"Ocorreu um erro ao buscar os usuarios", erro:error}).code(500);
        }
      },
    },

    {//CRIAR USUARIO
      method: 'POST',
      path: '/cadastro',
      handler: async (request, h) => {
        console.log("Request de criação e usuario recebido")
        console.log("payload:", request.payload)
        try{
          const body = JSON.parse(request.payload.body);
          let {nome_usuario, email, senha} = body;
          console.log("Definição de variaveis..")
          console.log(nome_usuario, email, senha)
          senha = await Password(senha) //protegendo a senha
          console.log("variavel senha ta ficano assim:", senha)
          try{
            const [id] = await knex('usuarios').insert({
              nome_usuario,
              email,
              senha
            }).returning('id')
          }
          catch(erro){
            if(erro.constraint in erros){
              console.log(`ERRO!! ${erros[erro.constraint]}`)
              return h.response({message:erros[erro.constraint]}).code(409);
            }
          }
          // console.log("Adicionado ao banco:", senha)

          // const [id_carrinho] = await knex("carrinho").insert({
          //   id_usuario:id
          // }).returning('id')
          // console.log("Criando carrinho para o usuario:", senha)

          // const [id_user] = await knex('usuarios').insert({
          //   id_carrinho:id_carrinho
          // }).returning('id')
          // console.log("Carrinho criado", senha)

          // console.log("Usuario criado com sucesso!")
          console.log("Usuario criado!")
          return h.response({message:"Usuario criado com sucesso"}).code(201);
        }
        catch(error){
          return h.response({message:'erro na criacao do usuario', erro: error}).code(500);
        }
      },
    },
    {
      method:"POST",
      path:"/login",
      handler:async(request, h)=>{
        const body = JSON.parse(request.payload.body);
        const {nome_usuario, senha} = body

        try{
          let usuario = await knex('usuarios')
            .where('nome_usuario', nome_usuario)

          if(usuario){
              usuario = usuario[0]

              if (verifyPassword(senha, usuario.senha)){
                console.log("Vou retornar 302 - Deu tudo certo")
                return h.response({message:"Usuario encontrado com sucesso", user:usuario }).code(200)
                
              } //senha do BD, senha do forms
              console.log("Vou retornar 401")
              return h.response({message:"Senha incorreta"}).code(401)
            }
          else{
              console.log("Vou retornar 404")
              return h.response({message:"Usuario não encontrado"}).code(404)
            }
        }
        catch(error){
          console.log("Ocorreu um erro na consulta:", error)
        }
      }
    }
  ];
  
  module.exports = userRoutes;
  