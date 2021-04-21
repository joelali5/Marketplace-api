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
