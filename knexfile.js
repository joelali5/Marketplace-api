const { DATABASE_URL, NODE_ENV } = process.env;

const dbConfig = {
  client: 'pg',
  connection: {
    connectionString: DATABASE_URL,
  },
};

if (NODE_ENV === 'production') {
  dbConfig.connection.ssl = {
    rejectUnauthorized: false,
  };
}

module.exports = dbConfig;
