const express = require('express');
const {
  validateAuthorCreation,
  validateAuthorUpdate
} = require('../middleware/validationMiddleware');
const {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor
} = require('../controller/authorController');

const router = express.Router();

// CREATE - POST /api/authors
router.post('/', validateAuthorCreation, createAuthor);

// READ - GET /api/authors
router.get('/', getAllAuthors);

// READ - GET /api/authors/:id
router.get('/:id', getAuthorById);

// UPDATE - PUT /api/authors/:id (replace entire author)
router.put('/:id', validateAuthorUpdate, updateAuthor);

// UPDATE - PATCH /api/authors/:id (partial update)
router.patch('/:id', validateAuthorUpdate, updateAuthor);

// DELETE - DELETE /api/authors/:id
router.delete('/:id', deleteAuthor);

module.exports = router;
