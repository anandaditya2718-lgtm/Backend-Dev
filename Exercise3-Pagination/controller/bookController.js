const booksData = require('../model/data');

const getAllBooks = (req, res) => {
  const { page, limit } = req.pagination;

  // Calculate skip
  const skip = (page - 1) * limit;

  // Calculate total pages
  const total = booksData.length;
  const totalPages = Math.ceil(total / limit);

  // Validate page doesn't exceed total pages
  if (page > totalPages && totalPages > 0) {
    return res.status(400).json({
      success: false,
      error: 'Page Out of Range',
      message: `Page ${page} exceeds total pages ${totalPages}`,
      totalPages: totalPages,
      validRange: `1-${totalPages}`
    });
  }

  // Get paginated data
  const paginatedBooks = booksData.slice(skip, skip + limit);

  res.json({
    success: true,
    pagination: {
      page: page,
      limit: limit,
      total: total,
      totalPages: totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null
    },
    count: paginatedBooks.length,
    data: paginatedBooks
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

const getPaginationInfo = (req, res) => {
  res.json({
    success: true,
    message: 'Pagination Information',
    paginationRules: {
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
      firstPage: '/api/books',
      firstPageExplicit: '/api/books?page=1&limit=10',
      secondPage: '/api/books?page=2&limit=10',
      customLimit: '/api/books?page=1&limit=5',
      largeLimit: '/api/books?page=1&limit=50'
    },
    totalBooks: booksData.length,
    responseExample: {
      pagination: {
        page: 1,
        limit: 10,
        total: 22,
        totalPages: 3,
        hasNextPage: true,
        hasPrevPage: false,
        nextPage: 2,
        prevPage: null
      }
    }
  });
};

module.exports = { getAllBooks, getBookById, getPaginationInfo };
