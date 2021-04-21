const db = require('../db/connection');

exports.selectCategories = async () => {
  return db('categories').select('*');
};

exports.insertCategory = async (newCategory) => {
  const [insertedCategory] = await db('categories')
    .insert(newCategory)
    .returning('*');
  return insertedCategory;
};
