/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("estoque", function(table){
    table.increments("id").primary();
    table.string("nome_cafe").notNullable().unique()
    table.float("preco").notNullable()
    table.string("marca").notNullable()
    table.integer("ano_vencimento").notNullable()
    table.string("img")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
