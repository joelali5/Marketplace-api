const yup = require('yup');
const { noAdditionalKeys, bothLimitAndPage } = require('./utils/objects');

exports.getItemQueries = yup
  .object()
  .shape({
    sort_by: yup
      .string()
      .oneOf(['item_id', 'item_name', 'price', 'category_name']),
    order: yup.string().oneOf(['asc', 'desc']),
    category_name: yup.string(),
    limit: yup.number().integer(),
    p: yup.number().integer(),
  })
  .test('limit and p', 'Must contain limit and p', bothLimitAndPage);

exports.newItem = yup
  .object()
  .shape({
    item_name: yup.string().max(255).required(),
    description: yup.string().max(500),
    img_url: yup.string().required(),
    price: yup.number().integer().required(),
    category_name: yup.string().required(),
  })
  .test('no-unknown', 'Unknown keys', noAdditionalKeys);

exports.newBasketItem = yup
  .object()
  .shape({
    item_id: yup.number().integer().required(),
  })
  .test('no-unknown', 'Unknown keys', noAdditionalKeys);

exports.newOrderItem = yup
  .object()
  .shape({
    item_id: yup.number().integer().required(),
  })
  .test('no-unknown', 'Unknown keys', noAdditionalKeys);

exports.itemId = yup.number().integer();
