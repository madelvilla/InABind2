import React, { useState, useEffect } from 'react';
import './Books.css';

const BooksComponent = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [filter, setFilter] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/books')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setBooks(data);
                    setFilteredBooks(data);
                } else {
                    console.error('Unexpected data format:', data);
                    setError('Unexpected data format');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            });
    }, []);

    const handleFilter = (criteria) => {
        let filtered = [...books];
        switch (criteria) {
            case 'Price Low to High':
                filtered.sort((a, b) => a.Price - b.Price);
                break;
            case 'Price High to Low':
                filtered.sort((a, b) => b.Price - a.Price);
                break;
            case 'Price under $20':
                filtered = filtered.filter(book => book.Price < 20);
                break;
            default:
                filtered = [...books];
                break;
        }
        setFilteredBooks(filtered);
        setFilter(criteria);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div id="books-page">
            <div id="dropdown-container">
                <button id="dropdown-button" onClick={toggleDropdown}>
                    Filters
                </button>
                {dropdownOpen && (
                    <div id="dropdown-menu">
                        <button className="filter-link" onClick={() => handleFilter('')}>Show All</button>
                        <button className="filter-link" onClick={() => handleFilter('Price Low to High')}>Price Low to High</button>
                        <button className="filter-link" onClick={() => handleFilter('Price High to Low')}>Price High to Low</button>
                        <button className="filter-link" onClick={() => handleFilter('Price under $20')}>Price under $20</button>
                    </div>
                )}
            </div>
            <div id="main-content">
                <div id="filter-container">
                    <button className="filter-link" onClick={() => handleFilter('')}>Show All</button>
                    <button className="filter-link" onClick={() => handleFilter('Price Low to High')}>Price Low to High</button>
                    <button className="filter-link" onClick={() => handleFilter('Price High to Low')}>Price High to Low</button>
                    <button className="filter-link" onClick={() => handleFilter('Price under $20')}>Price under $20</button>
                </div>
                <div id="books-container">
                    {filteredBooks.length === 0 ? (
                        <p>No books available</p>
                    ) : (
                        filteredBooks.map((book, index) => (
                            <div key={index} className="book">
                                <div className="bookInfo">
                                    <img src={book.book_cover} alt={book.Title} className="book-cover" />
                                    <div className="text">
                                        <h2 className="title">{book.Title}</h2>
                                        <p className="author">By: {book.Author}</p>
                                        <p className="Format">{book.Format}</p>
                                        <p className="overview">Overview: {book.Overview}</p>
                                        <p className="price">Price: {book.Price}</p>
                                        <button className="add">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default BooksComponent;

