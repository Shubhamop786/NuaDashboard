import React, { useState, useEffect } from 'react';
import { fetchBooks } from '../api';
import './BookTable.css';

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBooks();
      setBooks(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    
    const filtered = books.filter(book =>
      book.author_name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [books, searchText]);

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (!sortColumn) return 0;
    if (sortDirection === 'asc') {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    }
    return a[sortColumn] < b[sortColumn] ? 1 : -1;
  });

  const startIndex = (currentPage - 1) * 10;
  const paginatedBooks = sortedBooks.slice(startIndex, startIndex + 10);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="book-table">
      <input type="text" placeholder="Search by author..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('ratings_average')}>Ratings Average</th>
            <th onClick={() => handleSort('author_name')}>Author Name</th>
            <th onClick={() => handleSort('title')}>Title</th>
            <th onClick={() => handleSort('first_publish_year')}>First Publish Year</th>
            <th onClick={() => handleSort('subject')}>Subject</th>
            <th onClick={() => handleSort('author_birth_date')}>Author Birth Date</th>
            <th onClick={() => handleSort('author_top_work')}>Author Top Work</th>
          </tr>
        </thead>
        <tbody>
          {paginatedBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.ratings_average}</td>
              <td>{book.author_name}</td>
              <td>{book.title}</td>
              <td>{book.first_publish_year}</td>
              <td>{book.subject}</td>
              <td>{book.author_birth_date}</td>
              <td>{book.author_top_work}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={() => setCurrentPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

export default BookTable;
