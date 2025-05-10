import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaStar } from 'react-icons/fa';
import './FeaturedCars.css';

const FeaturedCars = ({ cars }) => {
  const navigate = useNavigate();

  if (!cars || cars.length === 0) {
    return (
      <div className="featured-cars-section">
        <div className="featured-cars-header">
          <h2>Available Cars</h2>
        </div>
        <div className="no-cars-message">No cars available at the moment.</div>
      </div>
    );
  }

  return (
    <div className="featured-cars-section">
      <div className="featured-cars-header">
        <h2>Available Cars</h2>
        <button className="view-all-button" onClick={() => navigate('/cars')}>
          View All Cars
          <FaArrowRight />
        </button>
      </div>
      <div className="featured-cars-grid">
        {cars.map((car) => (
          <div key={car.id} className="featured-car-card">
            <div className="featured-car-image">
              <img src={car.image} alt={car.name} />
              {/* <div className="featured-badge">
                <FaStar />
              </div> */}
            </div>
            <div className="featured-car-info">
              <h3>{car.name}</h3>
              <p>{car.brand} • {car.type}</p>
              <div className="featured-car-price">
                <span>${car.price}</span>
                <span className="per-day">/day</span>
              </div>
              <button 
                className="view-details-btn"
                onClick={() => navigate(`/book-car/${car.id}`)}
              >
                View Details
                <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCars; 