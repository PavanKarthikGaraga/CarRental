import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">CarRental</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/cars">Cars</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login" className="login-btn">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar; 