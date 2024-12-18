/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("itensPedido", function(table){
    table.increments("id").primary();
    table
        .integer('id_cafe')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('estoque')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    table
        .integer('id_pedido')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('pedidos')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('itensPedido');
};
