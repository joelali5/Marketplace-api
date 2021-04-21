const yup = require('yup');

exports.newUser = yup.object().shape({
  username: yup.string().max(255).required(),
  avatar_url: yup.string(),
});
