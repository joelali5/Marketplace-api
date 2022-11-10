exports.up = function (knex) {
  return knex.raw("CREATE EXTENSION IF NOT EXISTS pg_trgm");
};

exports.down = function (knex) {
  return Promise.resolve();
};
