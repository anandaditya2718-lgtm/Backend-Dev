const booksData = require('../model/booksData');

// Search books by query and type
const searchBooks = (req, res) => {
  try {
    const { query, type, queryLower } = req.searchParams;

    let results = [];

    // Search based on type
    switch (type) {
      case 'title':
        results = booksData.filter(book =>
          book.title.toLowerCase().includes(queryLower)
        );
        break;

      case 'author':
        results = booksData.filter(book =>
          book.author.toLowerCase().includes(queryLower)
        );
        break;

      case 'genre':
        results = booksData.filter(book =>
          book.genre.toLowerCase().includes(queryLower)
        );
        break;

      default:
        results = booksData.filter(book =>
          book.title.toLowerCase().includes(queryLower)
        );
    }

    // Calculate relevance score (exact match scores higher)
    results = results.map(book => {
      let score = 0;
      const searchField = type === 'title' ? book.title :
                         type === 'author' ? book.author :
                         book.genre;
      const searchFieldLower = searchField.toLowerCase();

      // Exact match
      if (searchFieldLower === queryLower) {
        score = 100;
      }
      // Starts with query
      else if (searchFieldLower.startsWith(queryLower)) {
        score = 80;
      }
      // Contains query
      else {
        score = 50;
      }

      return { ...book, relevanceScore: score };
    });

    // Sort by relevance score (highest first)
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Remove relevance score from response
    results = results.map(book => {
      const { relevanceScore, ...bookData } = book;
      return bookData;
    });

    res.json({
      success: true,
      search: {
        query: query,
        type: type,
        totalResults: results.length
      },
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error performing search',
      error: error.message
    });
  }
};

// Get all books (no search)
const getAllBooks = (req, res) => {
  try {
    res.json({
      success: true,
      count: booksData.length,
      data: booksData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching books',
      error: error.message
    });
  }
};

// Get single book by ID
const getBookById = (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching book',
      error: error.message
    });
  }
};

// Get search info
const getSearchInfo = (req, res) => {
  res.json({
    success: true,
    message: 'Book Search Information',
    searchEndpoint: '/api/books/search',
    queryParameters: {
      q: {
        type: 'string',
        required: true,
        length: '1-100 characters',
        description: 'Search query term',
        example: 'gatsby'
      },
      type: {
        type: 'string',
        required: false,
        default: 'title',
        validValues: ['title', 'author', 'genre'],
        description: 'Field to search in',
        example: 'title'
      }
    },
    searchExamples: {
      searchByTitle: '/api/books/search?q=gatsby',
      searchByTitleExplicit: '/api/books/search?q=gatsby&type=title',
      searchByAuthor: '/api/books/search?q=shakespeare&type=author',
      searchByGenre: '/api/books/search?q=fantasy&type=genre',
      partialMatch: '/api/books/search?q=lord'
    },
    responseFields: {
      success: 'Boolean indicating success',
      search: {
        query: 'The search term used',
        type: 'The field searched',
        totalResults: 'Number of results found'
      },
      data: 'Array of matching books with id, title, author, year, genre'
    },
    searchFeatures: [
      'Case-insensitive search',
      'Partial matching support',
      'Results sorted by relevance',
      'Support for multiple search types',
      'Exact matches ranked higher'
    ]
  });
};

module.exports = {
  searchBooks,
  getAllBooks,
  getBookById,
  getSearchInfo
};
