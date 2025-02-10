import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CarListing.css';
import { cars } from '../../mockdata/cars';

const categories = ['all', 'Electric', 'Sport', 'Luxury'];
const sortOptions = [
  { value: 'price', label: 'Sort by Price' },
  { value: 'rating', label: 'Sort by Rating' }
];

function CarListing() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('price');

  const filteredCars = cars
    .filter(car => selectedCategory === 'all' || 
      car.category.toLowerCase() === selectedCategory.toLowerCase())
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="car-listing">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <span>Car Listing</span>
        </div>

        {/* Hero Section */}
        <div className="listing-hero">
          <div className="hero-content">
            <h1 className="hero-title">Explore Our Fleet</h1>
            <p className="hero-subtitle">
              Choose from our collection of {cars.length} premium vehicles for your next adventure
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="filters">
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'All Cars' : category}
              </button>
            ))}
          </div>
          
          <div className="sort-filter">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="results-count">
          Showing {filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'}
          {selectedCategory !== 'all' && ` in ${selectedCategory}`}
        </p>

        {/* Car Grid */}
        {filteredCars.length > 0 ? (
          <div className="car-grid">
            {filteredCars.map(car => (
              <Link to={`/cars/${car.id}`} key={car.id} className="car-card">
                <div className="car-image">
                  <img src={car.image} alt={car.name} loading="lazy" />
                </div>
                <div className="car-info">
                  <h3>{car.name}</h3>
                  <p className="model">{car.model}</p>
                  <div className="specs">
                    <span>⚡ {car.specs.power}</span>
                    <span>🛡️ {car.specs.transmission}</span>
                    <span>👥 {car.specs.seats} seats</span>
                    {car.specs.engine && <span>🔧 {car.specs.engine}</span>}
                    {car.specs.range && <span>🔋 {car.specs.range}</span>}
                  </div>
                  <div className="price-rating">
                    <span className="price">₹{car.price.toLocaleString()}/day</span>
                    <span className="rating">⭐ {car.rating.toFixed(1)} ({car.reviews})</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-icon">🔍</span>
            <h2>No cars found</h2>
            <p>Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CarListing; 