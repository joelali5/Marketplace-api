const { selectItems } = require('../models/items');
const schemas = require('../schemas');

exports.getItems = async (req, res, next) => {
  await schemas.getItemQueries.validate(req.query);
  const items = await selectItems({ ...req.query });
  res.send({ items });
};
