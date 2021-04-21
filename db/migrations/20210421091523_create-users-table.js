exports.up = function (knex) {
  return knex.schema.createTable('users', (usersTable) => {
    usersTable.increments().primary();
    usersTable.string('username').notNullable();
    usersTable.string('full_name').notNullable();
    usersTable.text('avatar_url');
    usersTable.integer('kudos').defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
