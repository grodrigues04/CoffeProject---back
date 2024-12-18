/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("usuarios", function(table){
        table.increments('id').primary( );
        table.string('nome_usuario').unique().notNullable();
        table.string('senha').notNullable();
        table.string('email').unique().notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('usuarios');
};
