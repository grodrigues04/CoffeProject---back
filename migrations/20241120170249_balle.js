/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("estoque", function(table){
        table.increments('id');
        table.string("nome_cafe");
        table.float("preco");
        table.string("marca");
        table.integer("ano_vencimento");
        table.string('img');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
