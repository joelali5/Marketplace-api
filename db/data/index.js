const { NODE_ENV = 'dev' } = process.env;
const testData = require('./test');

const data = {
  test: testData,
  dev: testData,
  production: testData,
};

module.exports = data[NODE_ENV];
