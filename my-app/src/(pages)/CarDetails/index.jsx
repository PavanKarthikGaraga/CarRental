import { Link, useNavigate, useParams } from 'react-router-dom';
import { cars } from '../../mockdata/cars';
import './CarDetails.css';

// Simplified calendar data
const calendar = {
  month: 'Jul 2023',
  days: Array(31).fill(null).map((_, i) => ({
    day: i + 1,
    available: Math.random() > 0.3,
  })),
};

function CarDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Find the car details from the mock data
  const carDetails = cars.find(car => car.id === parseInt(id));

  // If car not found, show error state
  if (!carDetails) {
    return (
      <div className="car-details">
        <div className="container">
          <div className="empty-state">
            <span className="empty-icon">🚫</span>
            <h2>Car Not Found</h2>
            <p>The car you're looking for doesn't exist.</p>
            <button 
              className="back-button"
              onClick={() => navigate('/cars')}
              style={{ marginTop: '1rem' }}
            >
              ← Back to Listing
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Generate features from specs
  const features = Object.entries(carDetails.specs).map(([key, value], id) => ({
    id,
    name: `${value} ${key}`
  }));

  // Generate specifications
  const specifications = [
    { name: 'Model', value: carDetails.model },
    { name: 'Category', value: carDetails.category },
    { name: 'Seats', value: `${carDetails.specs.seats} passengers` },
    { name: 'Transmission', value: carDetails.specs.transmission },
    { name: 'Power', value: carDetails.specs.power },
    ...(carDetails.specs.range ? [{ name: 'Range', value: carDetails.specs.range }] : []),
    ...(carDetails.specs.engine ? [{ name: 'Engine', value: carDetails.specs.engine }] : []),
  ];

  return (
    <div className="car-details">
      {/* Hero Image */}
      <div 
        className="hero-image"
        style={{ backgroundImage: `url(${carDetails.image})` }}
      />

      <div className="container">
        {/* Navigation */}
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/cars">Car Listing</Link> / <span>{carDetails.name}</span>
        </div>

        {/* Back Button */}
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back to Listing
        </button>

        <div className="content-grid">
          <div className="main-content">
            {/* Overview Section */}
            <section className="overview-section">
              <h1 className="car-title">{carDetails.name}</h1>
              <p className="description">
                Experience the power and luxury of the {carDetails.name} {carDetails.model}. 
                This {carDetails.category.toLowerCase()} vehicle offers exceptional performance 
                with {carDetails.specs.power} and {carDetails.specs.transmission} transmission, 
                perfect for both city driving and long journeys.
              </p>

              {/* Features */}
              <div className="features">
                {features.map((feature) => (
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
                {specifications.map((spec, index) => (
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
                <span className="current-month">{calendar.month}</span>
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
                Book Now - ₹{carDetails.price.toLocaleString()}/day
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default CarDetails; 