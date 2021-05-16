const testData = require('./test');
const { genFakeUsers } = require('./utils/fakeData');

genFakeUsers(20, testData.users);
