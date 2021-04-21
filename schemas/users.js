const yup = require('yup');
const { noAdditionalKeys } = require('./utils');

exports.newUser = yup
  .object()
  .shape({
    username: yup.string().max(255).required(),
    avatar_url: yup.string(),
  })
  .test('no-unknown', 'Unknown keys', noAdditionalKeys);
