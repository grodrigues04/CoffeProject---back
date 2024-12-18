/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("pedidos", function(table) {
        table.dropColumn("itens_pedido"); // Remover a coluna
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table("pedidos", function(table) {
        table.json("itens_pedido").notNullable(); // Recria a coluna em caso de rollback
    });
};
