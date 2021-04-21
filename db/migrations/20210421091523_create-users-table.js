exports.up = function (knex) {
  return knex.schema.createTable('users', (usersTable) => {
    usersTable.increments().primary();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
