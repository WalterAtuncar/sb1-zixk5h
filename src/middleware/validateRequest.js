const { validationResult } = require('express-validator');
const { createError } = require('../utils/error');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(createError(400, 'Validation error', errors.array()));
    return;
  }
  next();
};