const { categories, items, users, baskets, orders } = require(`../data`);

exports.seed = async function (knex) {
  await knex.migrate.rollback();
  await knex.migrate.latest();
  await Promise.all([
    knex('categories').insert(categories),
    knex('items').insert(items),
    knex('users').insert(users),
  ]);
  await Promise.all([
    knex('baskets').insert(baskets),
    knex('orders').insert(orders),
  ]);
};
