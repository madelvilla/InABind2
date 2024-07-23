import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Books from './pages/Books';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div className='nav-container'>
        <Nav />
        <div className='page-content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/books' element={<Books />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
