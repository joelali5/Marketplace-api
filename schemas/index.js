const yup = require('yup');

exports.newCategory = yup.object().shape({
  category_name: yup.string().max(255).required(),
});

exports.newUser = yup.object().shape({
  username: yup.string().max(255).required(),
  avatar_url: yup.string(),
});
