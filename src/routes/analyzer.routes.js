const express = require('express');
const { body } = require('express-validator');
const analyzerController = require('../controllers/analyzer.controller');
const auth = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Analyzer
 *   description: Web page analysis endpoints
 */

/**
 * @swagger
 * /api/analyzer/analyze:
 *   post:
 *     summary: Analyze a web page and extract elements
 *     description: Fetches a web page and extracts form elements like inputs, selects, and buttons
 *     tags: [Analyzer]
 *     security:
 *       - BearerAuth: []
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnalyzeRequest'
 *     responses:
 *       200:
 *         description: Page analysis results
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnalyzeResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  '/analyze',
  auth,
  [
    body('url').trim().isURL().withMessage('Valid URL is required'),
    validateRequest
  ],
  analyzerController.analyzePage
);

module.exports = router;