import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import './Cars.css';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

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

  const handleBookNow = (car) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }
    if (car.status === 'Rented') {
      alert('This car is currently rented. Please try another car.');
      return;
    }
    navigate(`/book-car/${car.id}`);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="cars-page">
      <div className="cars-header">
        <h1>Available Cars</h1>
        <p>Choose from our wide range of vehicles</p>
      </div>
      <div className="cars-grid">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <div className="car-image-container">
              <img src={car.image} alt={car.name} className="car-image" />
              <div className={`car-status ${car.status.toLowerCase()}`}>
                {car.status}
              </div>
            </div>
            <div className="car-info">
              <h3>{car.name}</h3>
              <div className="car-details">
                <p><strong>Brand:</strong> {car.brand}</p>
                <p><strong>Type:</strong> {car.type}</p>
                <p><strong>Color:</strong> {car.color}</p>
                <p><strong>Fuel:</strong> {car.fuelType}</p>
              </div>
              <div className="car-price">
                <span>${car.price}</span>
                <span className="per-day">/day</span>
              </div>
              <button
                className={`book-now-btn ${car.status === 'Rented' ? 'disabled' : ''}`}
                onClick={() => handleBookNow(car)}
                disabled={car.status === 'Rented'}
              >
                {car.status === 'Rented' ? 'Currently Rented' : 'Book Now'}
                {car.status !== 'Rented' && <FaArrowRight className="arrow-icon" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars; 