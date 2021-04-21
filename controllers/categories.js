const { selectCategories, insertCategory } = require('../models/categories');

exports.getCategories = async (req, res, next) => {
  const categories = await selectCategories();
  res.send({ categories });
};

exports.postCategory = async (req, res, next) => {
  const newCategory = req.body;
  const category = await insertCategory(newCategory);
  res.status(201).send({ category });
};
