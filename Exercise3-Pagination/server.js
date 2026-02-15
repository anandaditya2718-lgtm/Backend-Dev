const express = require('express');
const cors = require('cors');
const bookRoutes = require('./router/bookRoutes');
const { getPaginationInfo } = require('./controller/bookController');

const app = express();

app.use(express.json());
app.use(cors());

// API routes
app.use('/api/books', bookRoutes);

// Pagination info endpoint
app.get('/api/pagination-info', getPaginationInfo);

// Root endpoint with API documentation
app.get('/', (req, res) => {
  res.json({
    message: 'Exercise 3: Pagination with Query Parameters',
    description: 'Book API with pagination support for large datasets',
    endpoints: {
      'GET /api/books': 'Get paginated books (default: page=1, limit=10)',
      'GET /api/books?page=1': 'Get specific page',
      'GET /api/books?limit=5': 'Get custom number of items per page',
      'GET /api/books?page=2&limit=15': 'Get page 2 with 15 items per page',
      'GET /api/books/:id': 'Get single book by ID',
      'GET /api/pagination-info': 'Get pagination rules and examples'
    },
    queryParameters: {
      page: {
        type: 'number',
        default: 1,
        minValue: 1,
        description: 'Page number to retrieve'
      },
      limit: {
        type: 'number',
        default: 10,
        minValue: 1,
        maxValue: 100,
        description: 'Number of items per page'
      }
    },
    examples: {
      'GET /api/books': 'First page with 10 items',
      'GET /api/books?page=2&limit=10': 'Second page with 10 items',
      'GET /api/books?page=1&limit=5': 'First page with 5 items',
      'GET /api/books?limit=20': 'First page with 20 items'
    },
    paginationResponse: {
      pagination: {
        page: 1,
        limit: 10,
        total: 22,
        totalPages: 3,
        hasNextPage: true,
        hasPrevPage: false,
        nextPage: 2,
        prevPage: null
      },
      count: 10,
      data: '...'
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
      '/api/pagination-info',
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
  console.log(`\n=== Exercise 3: Pagination ===`);
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API documentation: http://localhost:${PORT}`);
  console.log(`Pagination info: http://localhost:${PORT}/api/pagination-info`);
  console.log(`\n✓ Pagination features:
   - Default: page=1, limit=10
   - Max limit: 100 items per page
   - Includes: hasNextPage, hasPrevPage, nextPage, prevPage
   - Total: 22 books in database\n`);
});
