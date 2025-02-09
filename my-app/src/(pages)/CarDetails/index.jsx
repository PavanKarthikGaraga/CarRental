import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CarDetails.css';

// Mock data for car details
const carDetails = {
  id: 1,
  name: 'Ford Mustang GT',
  description: 'The Ford Mustang GT is a powerful and stylish sports car that offers an exhilarating driving experience. With its 5.0L V8 engine, the Mustang GT delivers impressive performance, while its iconic design and premium features make it a head-turning choice for car enthusiasts.',
  images: [
    'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1920',
  ],
  features: [
    { id: 1, name: '5.0L V8 Engine' },
    { id: 2, name: '6-Speed Manual Transmission' },
    { id: 3, name: 'Leather Seats' },
    { id: 4, name: 'B&O Sound System' },
  ],
  specifications: [
    { name: 'Engine', value: '5.0L V8' },
    { name: 'Transmission', value: '6-speed manual' },
    { name: 'Seating Capacity', value: '4 passengers' },
    { name: 'Fuel Economy', value: '15/24 mpg' },
    { name: 'Horsepower', value: '460 hp' },
    { name: 'Torque (lb-ft)', value: '420 lb-ft' },
  ],
  price: 150,
};

// Mock data for calendar availability
const calendar = {
  month: 'Jul 2023',
  days: Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    available: Math.random() > 0.3,
  })),
};

function CarDetails() {
  const [selectedDates, setSelectedDates] = useState([]);

  return (
    <div className="car-details">
      {/* Hero Image */}
      <div 
        className="hero-image"
        style={{ backgroundImage: `url(${carDetails.images[0]})` }}
      />

      <div className="container">
        {/* Navigation */}
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/cars">Listing</Link> / {carDetails.name}
        </div>

        <div className="content-grid">
          <div className="main-content">
            {/* Overview Section */}
            <section className="overview-section">
              <h2>Overview</h2>
              <p className="description">{carDetails.description}</p>

              {/* Features */}
              <div className="features">
                {carDetails.features.map((feature) => (
                  <span key={feature.id} className="feature-chip">
                    {feature.name}
                  </span>
                ))}
              </div>
            </section>

            {/* Specifications Section */}
            <section className="specifications-section">
              <h2>Specifications</h2>
              <div className="specs-grid">
                {carDetails.specifications.map((spec, index) => (
                  <div key={index} className="spec-item">
                    <div className="spec-content">
                      <span className="spec-name">{spec.name}</span>
                      <span className="spec-value">{spec.value}</span>
                    </div>
                    <div className="divider"></div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="sidebar">
            {/* Availability Calendar */}
            <div className="calendar-card">
              <h3>Availability</h3>

              {/* Calendar Header */}
              <div className="calendar-header">
                <button className="calendar-nav">&lt;</button>
                <span className="current-month">{calendar.month}</span>
                <button className="calendar-nav">&gt;</button>
              </div>

              {/* Calendar Grid */}
              <div className="calendar-grid">
                {/* Weekday Labels */}
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                  <div key={day} className="calendar-weekday">
                    {day}
                  </div>
                ))}
                
                {/* Calendar Days */}
                {calendar.days.map((day, index) => (
                  <div
                    key={index}
                    className={`calendar-day ${day.available ? 'available' : 'unavailable'}`}
                  >
                    {day.day}
                  </div>
                ))}
              </div>

              {/* Book Now Button */}
              <Link to={`/booking/${carDetails.id}`} className="book-now-btn">
                Book Now
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default CarDetails; 