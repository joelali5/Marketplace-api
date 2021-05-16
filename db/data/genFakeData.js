const testData = require('./test');
const { genFakeUsers } = require('./utils/fakeData');

// 10 users total
const updateData = async () => {
  const categories = testData.categories;
  const users = genFakeUsers(7, testData.users);
};

updateData();
