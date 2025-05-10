import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import FeaturedCars from '../../components/Dashboard/Customer/FeaturedCars';
import './Home.css';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCars = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/api/cars');
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }
      const data = await response.json();
      setCars(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch cars');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return (
    <div className="home">
      <section className="hero-section home-landing">
        <div className="landing-left">
          <div className="search-card glass-effect">
            <div className="search-title">Looking for car rentals?</div>
            <div className="search-subtitle">
              <b>Explore self-drive cars in <span className="city-highlight">Your Location</span></b>
            </div>
            <form className="search-form" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="location">Location</label>
              <input id="location" type="text" placeholder="Enter your location" />
              <div className="date-row">
                <div className="date-group">
                  <label>Trip Starts</label>
                  <input type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
                </div>
                <div className="date-group">
                  <label>Trip Ends</label>
                  <input type="date" defaultValue={new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)} />
                </div>
              </div>
              <div className="pickup-row">
                <input type="checkbox" id="pickup" />
                <label htmlFor="pickup">Delivery & Pick-up, from anywhere</label>
              </div>
              <button onClick={() => navigate('/cars')} className="search-btn" type="submit">SEARCH</button>
            </form>
          </div>
        </div>
        <div className="landing-right">
          <div className="drive-title">
            <span className="drive-main">DRIVE</span>
            <span className="drive-main">ANYTIME</span>
            <span className="drive-main">ANYWHERE</span>
          </div>
          <div className="drive-desc">
            With no commitment, unlimited options and hassle-free booking, your road to adventure!
          </div>
          <div className="car-images-row">
            <img src="https://imgd.aeplcdn.com/370x208/n/cw/ec/174423/sonet-exterior-right-front-three-quarter-11.jpeg?isig=0&q=80" alt="Car 1" className="car-img" />
            <img src="https://imgd.aeplcdn.com/370x208/n/cw/ec/131825/be-6e-exterior-right-front-three-quarter-5.jpeg?isig=0&q=80" alt="Car 2" className="car-img" />
            <img src="https://imgd.aeplcdn.com/370x208/n/cw/ec/42355/xuv700-exterior-right-front-three-quarter-4.jpeg?isig=0&q=80" alt="Car 3" className="car-img" />
          </div>
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
          <FeaturedCars cars={cars.slice(0, 3)} />
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