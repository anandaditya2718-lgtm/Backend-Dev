// Search Validation Middleware
// Validates search query parameters for book title search

const validateSearchQuery = (req, res, next) => {
  const { q, type = 'title' } = req.query;

  // Check if search query is provided
  if (!q) {
    return res.status(400).json({
      success: false,
      error: 'Missing Query Parameter',
      message: 'Search query parameter "q" is required',
      example: '/api/books/search?q=gatsby',
      usage: '/api/books/search?q=searchTerm&type=title'
    });
  }

  // Validate search query is a string
  if (typeof q !== 'string' || q.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Invalid Search Query',
      message: 'Search query must be a non-empty string',
      receivedValue: q
    });
  }

  // Validate search query length (min 1, max 100)
  if (q.trim().length < 1 || q.trim().length > 100) {
    return res.status(400).json({
      success: false,
      error: 'Invalid Query Length',
      message: 'Search query must be between 1 and 100 characters',
      receivedLength: q.trim().length,
      validRange: '1-100 characters'
    });
  }

  // Validate search type
  const validTypes = ['title', 'author', 'genre'];
  if (!validTypes.includes(type)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid Search Type',
      message: 'Search type must be one of: title, author, genre',
      receivedValue: type,
      validTypes: validTypes
    });
  }

  // Attach validated search parameters to request
  req.searchParams = {
    query: q.trim(),
    type: type,
    queryLower: q.trim().toLowerCase()
  };

  next();
};

module.exports = { validateSearchQuery };
