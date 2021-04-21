const yup = require('yup');

exports.newCategory = yup.object().shape({
  category_name: yup.string().max(255).required(),
});
