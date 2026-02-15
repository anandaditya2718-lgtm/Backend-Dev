const express = require('express');
const cors = require('cors');
const authorRoutes = require('./router/authorRoutes');
const { getCRUDInfo } = require('./controller/authorController');

const app = express();

app.use(express.json());
app.use(cors());

// API routes
app.use('/api/authors', authorRoutes);

// CRUD info endpoint
app.get('/api/crud-info', getCRUDInfo);

// Root endpoint with API documentation
app.get('/', (req, res) => {
  res.json({
    message: 'Exercise 4: Full CRUD Operations for Authors',
    description: 'RESTful API with complete Create, Read, Update, Delete operations',
    crudOperations: {
      'POST /api/authors': 'Create a new author',
      'GET /api/authors': 'Get all authors',
      'GET /api/authors/:id': 'Get single author by ID',
      'PUT /api/authors/:id': 'Update author (replace entire record)',
      'PATCH /api/authors/:id': 'Partial update author (update specific fields)',
      'DELETE /api/authors/:id': 'Delete author by ID'
    },
    endpoints: {
      info: '/api/crud-info'
    },
    authorFields: {
      name: 'Author name (string, 2-100 chars)',
      birthYear: 'Birth year (number, 1000-current year)',
      nationality: 'Author nationality (string, 2-50 chars)',
      genre: 'Primary genre (string, 2-50 chars)',
      booksCount: 'Number of books (number, >= 0)'
    },
    examples: {
      create: {
        method: 'POST',
        url: '/api/authors',
        body: {
          name: 'J.R.R. Tolkien',
          birthYear: 1892,
          nationality: 'British',
          genre: 'Fantasy',
          booksCount: 15
        }
      },
      readAll: 'GET /api/authors',
      readById: 'GET /api/authors/1',
      update: {
        method: 'PUT',
        url: '/api/authors/1',
        body: {
          name: 'J.R.R. Tolkien',
          birthYear: 1892,
          nationality: 'British',
          genre: 'Fantasy/Adventure',
          booksCount: 16
        }
      },
      partialUpdate: {
        method: 'PATCH',
        url: '/api/authors/1',
        body: {
          booksCount: 17
        }
      },
      delete: 'DELETE /api/authors/1'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    availableEndpoints: [
      '/api/authors',
      '/api/authors/:id',
      '/api/crud-info',
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
  console.log(`\n=== Exercise 4: Full CRUD Operations ===`);
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API documentation: http://localhost:${PORT}`);
  console.log(`CRUD info: http://localhost:${PORT}/api/crud-info`);
  console.log(`\n✓ Operations:
   - CREATE: POST /api/authors
   - READ: GET /api/authors, GET /api/authors/:id
   - UPDATE: PUT /api/authors/:id (full), PATCH /api/authors/:id (partial)
   - DELETE: DELETE /api/authors/:id
   - 5 sample authors in database\n`);
});
