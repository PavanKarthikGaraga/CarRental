import { useState } from 'react';
import { Link } from 'react-router-dom';
import { favorites as mockFavorites } from '../../../mockdata/cars';
import './Favorites.css';

function Favorites() {
  const [sortBy, setSortBy] = useState('name');
  const [favorites, setFavorites] = useState(mockFavorites);

  const sortedFavorites = [...favorites].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.name.localeCompare(b.name);
  });

  const handleRemove = (id) => {
    setFavorites(favorites.filter(car => car.id !== id));
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>Favorite Cars</h1>
        <p>Your collection of saved vehicles</p>
      </div>

      {/* Sort Controls */}
      <div className="sort-controls">
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Favorites Grid */}
      <div className="favorites-grid">
        {sortedFavorites.map((car) => (
          <div key={car.id} className="car-card">
            <div className="car-image-container">
              <img src={car.image} alt={car.name} className="car-image" />
              <button
                className="remove-button"
                onClick={() => handleRemove(car.id)}
                title="Remove from favorites"
              >
                ❌
              </button>
            </div>

            <div className="car-content">
              <h2>{car.name}</h2>
              
              <div className="car-rating">
                <span className="stars">⭐</span>
                <span>{car.rating.toFixed(1)}</span>
              </div>

              <div className="car-specs">
                {Object.entries(car.specs).map(([key, value]) => (
                  <div key={key} className="spec-item">
                    <span className="spec-icon">
                      {key === 'range' ? '🔋' : key === 'engine' ? '🚗' : key === 'power' ? '⚡' : '👥'}
                    </span>
                    <span className="spec-value">{value}</span>
                  </div>
                ))}
              </div>

              <div className="car-price">
                <span>₹{car.price.toFixed(2)}</span>
                <span className="price-period">/day</span>
              </div>

              <Link to={`/cars/${car.id}`} className="view-details">
                View Details
              </Link>
            </div>
          </div>
        ))}

        {sortedFavorites.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">❤️</span>
            <h2>No favorites yet</h2>
            <p>Start adding cars to your favorites list</p>
            <Link to="/cars" className="browse-button">
              Browse Cars
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites; 