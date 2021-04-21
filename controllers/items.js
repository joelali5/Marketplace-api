const { selectCategoryByName } = require('../models/categories');
const { selectItems } = require('../models/items');
const schemas = require('../schemas');

exports.getItems = async (req, res, next) => {
  const { category_name } = req.query;
  await schemas.getItemQueries.validate(req.query);
  const dbQueries = [selectItems({ ...req.query })];
  if (category_name) dbQueries.push(selectCategoryByName(category_name));
  const [items] = await Promise.all(dbQueries);
  res.send({ items });
};
