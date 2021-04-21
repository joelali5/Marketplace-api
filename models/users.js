const db = require('../db/connection');

exports.selectUsers = async () => {
  return db('users').select('*');
};
