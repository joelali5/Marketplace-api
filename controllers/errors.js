exports.withErrorHandling = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next({ status: 400, msg: err.errors.join(', ') });
    } else next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status)
    res.status(err.status).send({ msg: err.msg || 'Bad request' });
  else next(err);
};

exports.handleInternalErrors = (err, req, res, next) => {
  console.log(err, '<< 500 unhandled error');
  res.status(500).send({ msg: 'Internal Server Error' });
};
