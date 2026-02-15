const express = require('express');
const cors = require('cors');
const bookRoutes = require('./router/bookRoutes');
const { getValidationInfo } = require('./controller/bookController');

const app = express();

app.use(express.json());
app.use(cors());

// API routes
app.use('/api/books', bookRoutes);

// Validation info endpoint
app.get('/api/validation-info', getValidationInfo);

// Root endpoint with API documentation
app.get('/', (req, res) => {
  res.json({
    message: 'Exercise 2: Input Validation Middleware',
    description: 'Book API with input validation for query parameters (year and author)',
    endpoints: {
      'GET /api/books': 'Get all books (with optional year and author filtering)',
      'GET /api/books?year=1949': 'Filter books by year (must be 1000-2100)',
      'GET /api/books?author=Austen': 'Filter books by author (must be 2-100 chars)',
      'GET /api/books?year=1949&author=Orwell': 'Filter by both year and author',
      'GET /api/books/:id': 'Get single book by ID',
      'GET /api/validation-info': 'Get validation rules and examples'
    },
    validationRules: {
      year: {
        type: 'number',
        range: '1000-2100',
        required: false,
        description: 'Must be a valid integer within the range'
      },
      author: {
        type: 'string',
        length: '2-100 characters',
        required: false,
        description: 'Partial match search (case-insensitive)'
      }
    },
    examples: {
      valid: {
        allBooks: 'GET /api/books',
        filterByYear: 'GET /api/books?year=1949',
        filterByAuthor: 'GET /api/books?author=Austen',
        filterByBoth: 'GET /api/books?author=Brontë&year=1848'
      },
      invalid: {
        invalidYear: 'GET /api/books?year=3000 (returns 400)',
        invalidAuthor: 'GET /api/books?author=a (returns 400)',
        nonNumericYear: 'GET /api/books?year=abc (returns 400)'
      }
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    availableEndpoints: [
      '/api/books',
      '/api/books/:id',
      '/api/validation-info',
      '/'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: err.message
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n=== Exercise 2: Input Validation Middleware ===`);
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API documentation: http://localhost:${PORT}`);
  console.log(`Validation info: http://localhost:${PORT}/api/validation-info`);
  console.log(`\n✓ Middleware validates:
   - Year: Must be a number between 1000-2100
   - Author: Must be 2-100 characters\n`);
});
