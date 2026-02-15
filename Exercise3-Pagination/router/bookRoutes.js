const express = require('express');
const { validatePageQuery } = require('../middleware/paginationMiddleware');
const { getAllBooks, getBookById } = require('../controller/bookController');

const router = express.Router();

// Apply pagination validation middleware
router.get('/', validatePageQuery, getAllBooks);

// Get single book by ID
router.get('/:id', getBookById);

module.exports = router;
