import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (auth = '', yr = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (auth) params.append('author', auth);
      if (yr) params.append('year', yr);
      
      const response = await axios.get(
        `/api/books${params.toString() ? '?' + params.toString() : ''}`
      );
      setBooks(response.data.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(author, year);
  };

  const handleReset = () => {
    setAuthor('');
    setYear('');
    fetchBooks();
  };

  return (
    <div className="app">
      <h1>📚 Book Library</h1>
      
      <div className="filter-section">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by author..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="number"
            placeholder="Search by year..."
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <button type="submit">Search</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </form>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Year:</strong> {book.year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
