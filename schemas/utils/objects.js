const _ = require('lodash');
const yup = require('yup');

exports.noAdditionalKeys = function (value) {
  const providedKeys = Object.keys(value);
  const knownKeys = Object.keys(this.schema.fields);
  const unknownKeys = _.without(providedKeys, ...knownKeys); // lodash

  if (unknownKeys.length) {
    const err = new yup.ValidationError(
      `Unexpected additional key${
        unknownKeys.length > 1 ? 's' : ''
      }: ${unknownKeys.join(', ')}`
    );
    throw err;
  }
  return true;
};
