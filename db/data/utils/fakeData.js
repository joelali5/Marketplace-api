const faker = require('faker');

exports.genFakeUsers = (userCount = 20, users = []) => {
  for (let i = 0; i < userCount; i++) {
    const fakeUser = {
      username: faker.internet.userName(),
      avatar_url: faker.image.avatar(),
    };
    users.push(fakeUser);
  }
  console.log(users);
  return users;
};
