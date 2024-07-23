import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Newsletter from '../components/Newsletter';

const Home = () => {
    const [comingSoonBooks, setComingSoonBooks] = useState([]);
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchComingSoonBooks = async () => {
            try {
                const response = await fetch('http://localhost:5000/coming-soon');
                const data = await response.json();
                setComingSoonBooks(data);
            } catch (error) {
                console.error('Error fetching coming soon books:', error);
            }
        };

        fetchComingSoonBooks();
    }, []);

    const nextSlide = () => {
        setCurrentIndex(prevIndex => {
            const maxIndex = Math.max(0, comingSoonBooks.length - 5);
            return prevIndex >= maxIndex ? 0 : prevIndex + 1;
        });
    };

    const prevSlide = () => {
        setCurrentIndex(prevIndex => {
            const maxIndex = Math.max(0, comingSoonBooks.length - 5);
            return prevIndex <= 0 ? maxIndex : prevIndex - 1;
        });
    };

    return (
        <>
        <div className='hero-image-container'>
            <h1>Welcome to In a Bind Books</h1>
            <h3>Explore Our Latest Collection</h3>
            <Link to="/books">
                <button type="button">Our Books</button>
            </Link>
        </div>
        <div>
            <h2>Coming Soon</h2>
            <div className="carousel-container">
                <button className="carousel-button prev" onClick={prevSlide}>&#10094;</button>
                <div className="carousel">
                    <div 
                        className="carousel-inner" 
                        style={{ transform: `translateX(-${currentIndex * (100 / 5)}%)` }}
                    >
                        {comingSoonBooks.map(book => (
                            <div key={book.id} className="carousel-item">
                                <img src={book.NewTitles} alt={book.BookTitle} />
                                <p>{book.BookTitle}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="carousel-button next" onClick={nextSlide}>&#10095;</button>
            </div>
            <Newsletter />
        </div>
        </>
    );
};

export default Home;
