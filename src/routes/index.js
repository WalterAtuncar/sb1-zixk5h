const express = require('express');
const authRoutes = require('./auth.routes');
const analyzerRoutes = require('./analyzer.routes');
const testRoutes = require('./test.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/analyzer', analyzerRoutes);
router.use('/tests', testRoutes);

module.exports = router;