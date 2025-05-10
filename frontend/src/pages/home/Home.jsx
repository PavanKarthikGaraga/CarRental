import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeaturedCars from '../../components/Dashboard/Customer/FeaturedCars';
import './Home.css';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/cars');
        const data = await response.json();
        setCars(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cars');
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Ride</h1>
          <p>Choose from our wide range of vehicles for your next adventure</p>
          <Link to="/cars" className="cta-button">Browse Cars</Link>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="feature-icon">🚗</i>
            <h3>Wide Selection</h3>
            <p>Choose from various car types and models</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon">💰</i>
            <h3>Best Prices</h3>
            <p>Competitive rates and transparent pricing</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon">⭐</i>
            <h3>Quality Service</h3>
            <p>Well-maintained vehicles and excellent support</p>
          </div>
          <div className="feature-card">
            <i className="feature-icon">🔒</i>
            <h3>Secure Booking</h3>
            <p>Safe and easy booking process</p>
          </div>
        </div>
      </section>

      <section className="available-cars">
        {/* <h2>Available Cars</h2> */}
        {loading ? (
          <div className="loading">Loading cars...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <FeaturedCars cars={cars} />
        )}
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Choose Your Car</h3>
            <p>Browse our collection and select your preferred vehicle</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Book Online</h3>
            <p>Select dates and complete the booking process</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Pick Up & Drive</h3>
            <p>Collect your car and enjoy your journey</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 