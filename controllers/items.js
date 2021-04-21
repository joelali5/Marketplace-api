const { selectItems } = require('../models/items');
const schemas = require('../schemas');

exports.getItems = async (req, res, next) => {
  const items = await selectItems({ ...req.query });
  res.send({ items });
};
