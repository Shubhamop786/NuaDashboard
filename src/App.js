import React, { useState, useEffect } from 'react';
import BookTable from './Components/BookTable'; 
import { fetchBooks } from './api'; 
import './app.css';

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBooks();
      setBooks(data);
    };
    fetchData();
  }, []);

  const handleDownloadCSV = () => {
    const csvContent = convertToCSV(books);
    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'books.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const convertToCSV = (data) => {
    const header = Object.keys(data[0]).join(',');
    const body = data.map(book => Object.values(book).join(',')).join('\n');
    return `${header}\n${body}`;
  };

  return (
    <>
    <h1>Admin Dashboard</h1>
      <button className="download-button" onClick={handleDownloadCSV}>Download CSV</button>
    <div className="container">
      
      <div className="table-container">
        <BookTable books={books} />
      </div>
      <h3>Created By Shubham Singh</h3>
    </div>
    </>
  );
};

export default App;
