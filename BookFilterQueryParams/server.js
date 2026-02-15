const express = require('express');
const cors = require('cors');
const bookRoutes = require('./router/bookRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Book Filter API',
    endpoints: {
      'GET /api/books': 'Get all books (filter by ?author=name and/or ?year=year)',
      'GET /api/books/:id': 'Get single book by ID'
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
