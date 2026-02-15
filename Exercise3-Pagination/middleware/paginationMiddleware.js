// Pagination Validation Middleware
// Validates page and limit query parameters

const validatePageQuery = (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  // Validate page
  if (isNaN(page) || page <= 0) {
    return res.status(400).json({
      success: false,
      error: 'Invalid Page',
      message: 'Page must be a positive number greater than 0',
      receivedValue: page,
      example: '/api/books?page=1'
    });
  }

  // Validate limit
  if (isNaN(limit) || limit <= 0 || limit > 100) {
    return res.status(400).json({
      success: false,
      error: 'Invalid Limit',
      message: 'Limit must be a number between 1 and 100',
      receivedValue: limit,
      validRange: '1-100',
      example: '/api/books?limit=10'
    });
  }

  // Attach validated values to request
  req.pagination = {
    page: parseInt(page),
    limit: parseInt(limit)
  };

  next();
};

module.exports = { validatePageQuery };
