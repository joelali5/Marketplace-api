exports.up = function (knex) {
  return knex.raw('CREATE EXTENSION pg_trgm');
};

exports.down = function (knex) {
  return knex.raw('DROP EXTENSION pg_trgm');
};
