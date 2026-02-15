const booksData = require('../model/data');

const getAllBooks = (req, res) => {
  const author = req.validatedAuthor;
  const year = req.validatedYear;

  let filteredBooks = booksData;

  // Apply author filter if provided
  if (author) {
    filteredBooks = filteredBooks.filter(book =>
      book.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  // Apply year filter if provided
  if (year) {
    filteredBooks = filteredBooks.filter(book => book.year === year);
  }

  res.json({
    success: true,
    filters: {
      author: author || null,
      year: year || null
    },
    count: filteredBooks.length,
    data: filteredBooks
  });
};

const getBookById = (req, res) => {
  const book = booksData.find(b => b.id === parseInt(req.params.id));

  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found',
      bookId: req.params.id
    });
  }

  res.json({
    success: true,
    data: book
  });
};

const getValidationInfo = (req, res) => {
  res.json({
    success: true,
    message: 'Validation Rules Information',
    validationRules: {
      year: {
        type: 'number',
        required: false,
        minValue: 1000,
        maxValue: 2100,
        errorMessages: [
          'Year must be a valid number',
          'Year must be between 1000 and 2100'
        ]
      },
      author: {
        type: 'string',
        required: false,
        minLength: 2,
        maxLength: 100,
        matchType: 'partial (case-insensitive)',
        errorMessages: [
          'Author must be a non-empty string',
          'Author name must be between 2 and 100 characters'
        ]
      }
    },
    examples: {
      allBooks: '/api/books',
      filterByYear: '/api/books?year=1949',
      filterByAuthor: '/api/books?author=Austen',
      filterByBoth: '/api/books?author=Brontë&year=1848',
      invalidYear: '/api/books?year=3000 (will return 400 error)',
      invalidAuthor: '/api/books?author=a (will return 400 error - too short)'
    }
  });
};

module.exports = { getAllBooks, getBookById, getValidationInfo };
