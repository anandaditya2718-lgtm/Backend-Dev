const express = require('express');
const {
  validateYearQuery,
  validateAuthorQuery,
  validateBothQueryParams
} = require('../middleware/validationMiddleware');
const { getAllBooks, getBookById, getValidationInfo } = require('../controller/bookController');

const router = express.Router();

// Apply validation middleware to the books listing endpoint
router.get('/', validateBothQueryParams, getAllBooks);

// Get single book by ID
router.get('/:id', getBookById);

module.exports = router;
