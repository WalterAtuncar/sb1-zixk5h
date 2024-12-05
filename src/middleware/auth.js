const jwt = require('jsonwebtoken');
const { createError } = require('../utils/error');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

module.exports = (req, res, next) => {
  // Check if authentication is disabled
  if (process.env.DISABLE_AUTH === 'true') {
    return next();
  }

  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw createError(401, 'Authentication required');
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(createError(401, 'Invalid or expired token'));
  }
};