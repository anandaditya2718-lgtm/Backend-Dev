const express = require('express');
const cors = require('cors');
const bookRoutes = require('./router/bookRoutes');
const { getSearchInfo } = require('./controller/bookController');

const app = express();

app.use(express.json());
app.use(cors());

// API routes
app.use('/api/books', bookRoutes);

// Search info endpoint
app.get('/api/search-info', getSearchInfo);

// Root endpoint with API documentation
app.get('/', (req, res) => {
  res.json({
    message: 'Exercise 5: Book Search by Title/Author/Genre',
    description: 'RESTful API with advanced search functionality',
    endpoints: {
      'GET /api/books': 'Get all books',
      'GET /api/books/:id': 'Get single book by ID',
      'GET /api/books/search?q=query': 'Search books by title (default)',
      'GET /api/books/search?q=query&type=title': 'Search by title',
      'GET /api/books/search?q=query&type=author': 'Search by author',
      'GET /api/books/search?q=query&type=genre': 'Search by genre'
    },
    queryParameters: {
      q: {
        type: 'string',
        required: '(for search endpoint)',
        length: '1-100 characters',
        description: 'Search query term'
      },
      type: {
        type: 'string',
        default: 'title',
        validValues: ['title', 'author', 'genre'],
        description: 'Field to search in (optional)'
      }
    },
    searchExamples: {
      'Search title (default)': 'GET /api/books/search?q=gatsby',
      'Search author': 'GET /api/books/search?q=shakespeare&type=author',
      'Search genre': 'GET /api/books/search?q=fantasy&type=genre',
      'Partial match': 'GET /api/books/search?q=lord'
    },
    features: [
      'Case-insensitive search',
      'Partial matching',
      'Results sorted by relevance',
      'Multiple search types (title, author, genre)',
      'Input validation',
      'Error handling'
    ],
    totalBooks: 22
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
      '/api/books/search?q=query',
      '/api/search-info',
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
  console.log(`\n=== Exercise 5: Book Search ===`);
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API documentation: http://localhost:${PORT}`);
  console.log(`Search info: http://localhost:${PORT}/api/search-info`);
  console.log(`\n✓ Search Features:
   - Search by title, author, or genre
   - Case-insensitive search
   - Partial matching
   - Results sorted by relevance
   - 22 sample books\n`);
});
