import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="links-container">
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="social-media">
        <a href="https://tiktok.com"><img src="/assets/tiktok-icon.webp" className="icons" alt="tiktok icon" /></a>
        <a href="https://instagram.com"><img src="/assets/instagram-icon.webp" className="icons" alt="instagram icon" /></a>
        <a href="https://twitter.com"><img src="/assets/twitter-icon.webp" className="icons" alt="twitter icon" /></a>
      </div>
      <div className="copyright">
        <p>© 2024 In A Bind Books. All rights reserved.</p>
      </div>
    </footer>
  );
}
