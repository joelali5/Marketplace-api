const { NODE_ENV = 'dev' } = process.env;
const testData = require('./test');

const data = {
  test: testData,
  dev: testData,
  prod: testData,
};

module.exports = data[NODE_ENV];
