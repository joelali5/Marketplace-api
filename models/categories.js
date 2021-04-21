const db = require('../db/connection');

exports.selectCategories = async () => {
  return db('categories').select('*');
};
