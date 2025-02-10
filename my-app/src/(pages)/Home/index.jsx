import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { cars } from '../../mockdata/cars';

// Mock data for car listings
const carListings = cars;

function Home() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredCars = carListings.filter(car => {
    if (activeTab === 'all') return true;
    return car.category.toLowerCase() === activeTab;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070" 
            alt="Luxury Car"
            className="hero-image"
          />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Find Your Perfect AutoVoyage
          </h1>
          <p className="hero-subtitle">
            Experience luxury and performance with our premium car collection. Book your dream car today.
          </p>
          <div className="hero-actions">
            <Link to="/cars" className="primary-button">
              Explore Cars
            </Link>
            <Link to="/list-your-car" className="secondary-button">
              List Your Car
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Cars</h2>
          <p className="section-subtitle">
            Discover our most popular vehicles
          </p>

          {/* Category Tabs */}
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Cars
            </button>
            <button
              className={`tab ${activeTab === 'electric' ? 'active' : ''}`}
              onClick={() => setActiveTab('electric')}
            >
              Electric
            </button>
            <button
              className={`tab ${activeTab === 'sport' ? 'active' : ''}`}
              onClick={() => setActiveTab('sport')}
            >
              Sport
            </button>
            <button
              className={`tab ${activeTab === 'luxury' ? 'active' : ''}`}
              onClick={() => setActiveTab('luxury')}
            >
              Luxury
            </button>
          </div>

          {/* Car Grid */}
          <div className="car-grid">
            {filteredCars.map((car) => (
              <Link to={`/cars/${car.id}`} className="car-card" key={car.id}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={car.image}
                    alt={car.name}
                    className="car-image"
                  />
                  <span className="car-category">
                    {car.category}
                  </span>
                </div>

                <div className="car-content">
                  <h3 className="car-title">{car.name}</h3>
                  
                  <div className="car-rating">
                    <div className="stars">
                      {'★'.repeat(Math.floor(car.rating))}
                      {'☆'.repeat(5 - Math.floor(car.rating))}
                    </div>
                    <span>({car.reviews} reviews)</span>
                  </div>

                  <div className="car-specs">
                    <div className="spec-item">
                      👥 {car.specs.seats} seats
                    </div>
                    <div className="spec-item">
                      ⚙️ {car.specs.transmission}
                    </div>
                    <div className="spec-item">
                      🚀 {car.specs.power}
                    </div>
                  </div>

                  <div className="car-price">
                    <div>
                      <span className="price-amount">₹{car.price}</span>
                      <span className="price-period">/day</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home; 