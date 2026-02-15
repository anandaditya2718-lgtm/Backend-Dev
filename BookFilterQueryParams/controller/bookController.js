const booksData = require('../model/data');

const getAllBooks = (req, res) => {
  const { author, year } = req.query;
  
  let filteredBooks = booksData;

  if (author) {
    filteredBooks = filteredBooks.filter(book =>
      book.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  if (year) {
    filteredBooks = filteredBooks.filter(book => book.year === parseInt(year));
  }

  res.json({
    success: true,
    count: filteredBooks.length,
    data: filteredBooks
  });
};

const getBookById = (req, res) => {
  const book = booksData.find(b => b.id === parseInt(req.params.id));
  
  if (!book) {
    return res.status(404).json({ success: false, message: 'Book not found' });
  }
  
  res.json({ success: true, data: book });
};

module.exports = { getAllBooks, getBookById };
