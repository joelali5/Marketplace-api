const yup = require('yup');
const { noAdditionalKeys } = require('./utils/objects');

exports.getItemQueries = yup.object().shape({
  sort_by: yup
    .string()
    .oneOf(['item_id', 'item_name', 'price', 'category_name']),
  order: yup.string().oneOf(['asc', 'desc']),
});
