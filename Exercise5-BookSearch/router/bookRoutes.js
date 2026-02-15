const express = require('express');
const { validateSearchQuery } = require('../middleware/searchMiddleware');
const {
  searchBooks,
  getAllBooks,
  getBookById
} = require('../controller/bookController');

const router = express.Router();

// GET all books
router.get('/', getAllBooks);

// Search endpoint with validation
router.get('/search', validateSearchQuery, searchBooks);

// GET single book by ID
router.get('/:id', getBookById);

module.exports = router;
