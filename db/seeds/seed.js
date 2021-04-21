exports.seed = async function (knex) {
  await knex.migrate.rollback();
  await knex.migrate.latest();
};
