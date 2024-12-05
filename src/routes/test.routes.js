const express = require('express');
const { body } = require('express-validator');
const testController = require('../controllers/test.controller');
const auth = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tests
 *   description: Test execution endpoints
 */

/**
 * @swagger
 * /api/tests/execute:
 *   post:
 *     summary: Execute test cases
 *     description: Executes a batch of test cases and returns the results
 *     tags: [Tests]
 *     security:
 *       - BearerAuth: []
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TestCaseRequest'
 *     responses:
 *       200:
 *         description: Test execution results
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestExecutionResponse'
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
  '/execute',
  auth,
  [
    body('testCases').isArray().withMessage('Test cases must be an array'),
    validateRequest
  ],
  testController.executeTests
);

module.exports = router;