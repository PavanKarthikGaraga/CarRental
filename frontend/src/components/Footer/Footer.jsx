import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>CarRental</h3>
          <p>Your trusted partner for car rentals. We provide the best vehicles at competitive prices.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/cars">Cars</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@carrental.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 Car Street, Auto City</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 CarRental. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 