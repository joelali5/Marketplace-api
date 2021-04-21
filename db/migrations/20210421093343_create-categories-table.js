exports.up = function (knex) {
  return knex.schema.createTable('categories', (categoriesTable) => {
    categoriesTable.increments().primary();
    categoriesTable.string('category_name').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('categories');
};
