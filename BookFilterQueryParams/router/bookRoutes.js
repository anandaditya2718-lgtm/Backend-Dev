const express = require('express');
const { getAllBooks, getBookById } = require('../controller/bookController');

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);

module.exports = router;
