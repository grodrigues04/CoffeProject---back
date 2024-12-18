/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("pedidos", function(table){
        table.increments("id").primary();
        table.json("itens_pedido").notNullable();
        table
            .integer('id_usuario') // 
            .unsigned()//Apenas valores positivos
            .notNullable()
            .references('id')
            .inTable('usuarios')
            .onDelete('CASCADE') 
            .onUpdate('CASCADE'); 
        })
    };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('usuarios');

};
