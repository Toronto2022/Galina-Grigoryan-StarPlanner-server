/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("username", 50).notNullable().unique();
    table.string("name", 255).notNullable();
    table.string("email", 50).notNullable().unique();
    table.string("password", 50).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
