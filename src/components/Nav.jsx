import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './Nav.css';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/assets/logo.png" className="logo" alt="In A Bind Books logo" />
        </Link>
      </div>
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/Books" onClick={() => setIsOpen(false)}>Books</Link></li>
          <li><Link to="/Contact" onClick={() => setIsOpen(false)}>Contact Us</Link></li>
          <li><Link to="/Cart" onClick={() => setIsOpen(false)}>Cart</Link></li>

        </ul>
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </div>
    </nav>
  );
}

export default Nav;
