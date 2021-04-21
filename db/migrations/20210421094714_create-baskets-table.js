exports.up = function (knex) {
  return knex.schema.createTable('baskets', (basketsTable) => {
    basketsTable.increments('basket_id').primary();
    basketsTable.string('username').references('users.username').notNullable();
    basketsTable.integer('item_id').references('items.item_id').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('baskets');
};
