const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createError } = require('../utils/error');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const TOKEN_EXPIRY = '24h';

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // In a real application, validate against database
    // This is just for demonstration
    if (username !== 'demo' || password !== 'demo123') {
      throw createError(401, 'Invalid credentials');
    }

    const token = jwt.sign({ username }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRY
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
};