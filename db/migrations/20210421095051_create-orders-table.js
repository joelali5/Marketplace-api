exports.up = function (knex) {
  return knex.schema.createTable('orders', (ordersTable) => {
    ordersTable.increments().primary();
    ordersTable.string('username').references('users.username').notNullable();
    ordersTable.integer('item_id').references('items.item_id').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('orders');
};
