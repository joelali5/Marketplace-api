const { NODE_ENV = 'dev' } = process.env;
require('dotenv').config({ path: `./${NODE_ENV}.env` });

const { DATABASE_URL } = process.env;

const dbConfig = {
  client: 'pg',
  connection: {
    database: NODE_ENV === 'test' ? 'nc_marketplace_test' : 'nc_marketplace',
  },
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

if (NODE_ENV === 'production') {
  dbConfig.connection = {
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

module.exports = dbConfig;
