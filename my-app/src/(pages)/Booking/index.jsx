import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { cars } from '../../mockdata/cars';
import './Booking.css';

const steps = ['Vehicle Selection', 'Booking Details', 'Review & Payment'];

const insuranceOptions = [
  {
    id: 'basic',
    name: 'Basic Coverage',
    price: 1499,
    description: 'Covers basic liability and collision damage',
  },
  {
    id: 'premium',
    name: 'Premium Coverage',
    price: 2499,
    description: 'Full coverage including theft protection and roadside assistance',
  },
];

const additionalOptions = [
  {
    id: 'gps',
    name: 'GPS Navigation',
    price: 499,
    description: 'Built-in GPS navigation system',
  },
  {
    id: 'childSeat',
    name: 'Child Seat',
    price: 799,
    description: 'Safety-certified child seat',
  },
  {
    id: 'wifi',
    name: 'Wi-Fi Hotspot',
    price: 999,
    description: '4G LTE Wi-Fi connection',
  },
];

function Booking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  
  // Find the car details from the mock data
  const carDetails = cars.find(car => car.id === parseInt(id));

  // If car not found, show error state
  if (!carDetails) {
    return (
      <div className="booking-page">
        <div className="container">
          <div className="empty-state">
            <span className="empty-icon">🚫</span>
            <h2>Car Not Found</h2>
            <p>The car you're trying to book doesn't exist.</p>
            <button 
              className="back-button"
              onClick={() => navigate('/cars')}
            >
              ← Back to Listing
            </button>
          </div>
        </div>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    insurance: 'basic',
    additionalOptions: [],
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleNext = () => {
    if (validateStep(activeStep)) {
      if (activeStep === steps.length - 1) {
        handleSubmit();
      } else {
        setActiveStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOptionsChange = (optionId) => {
    setFormData(prev => ({
      ...prev,
      additionalOptions: prev.additionalOptions.includes(optionId)
        ? prev.additionalOptions.filter(id => id !== optionId)
        : [...prev.additionalOptions, optionId]
    }));
  };

  const calculateTotal = () => {
    const basePrice = carDetails.price;
    const insurancePrice = insuranceOptions.find(opt => opt.id === formData.insurance)?.price || 0;
    const optionsTotal = formData.additionalOptions.reduce((sum, optId) => {
      const option = additionalOptions.find(opt => opt.id === optId);
      return sum + (option?.price || 0);
    }, 0);
    return basePrice + insurancePrice + optionsTotal;
  };

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return formData.pickup && formData.dropoff && 
               formData.pickupDate && formData.pickupTime &&
               formData.returnDate && formData.returnTime;
      case 1:
        return formData.firstName && formData.lastName && 
               formData.email && formData.phone && formData.licenseNumber;
      case 2:
        return formData.cardNumber && formData.expiryDate && formData.cvv;
      default:
        return true;
    }
  };

  const handleSubmit = () => {
    // Here you would submit the booking data to your backend
    console.log('Booking submitted:', { car: carDetails, ...formData });
    navigate('/dashboard/bookings');
  };

  return (
    <div className="booking-page">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <Link to="/">Home</Link> / 
          <Link to="/cars">Car Listing</Link> / 
          <Link to={`/cars/${id}`}>{carDetails.name}</Link> / 
          <span>Booking</span>
        </div>

        {/* Back Button */}
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        {/* Booking Content */}
        <div className="bookings-content">
          {/* Car Summary */}
          <div className="car-summary">
            <img src={carDetails.image} alt={carDetails.name} className="car-image" />
            <div className="car-info">
              <h2>{carDetails.name}</h2>
              <p className="model">{carDetails.model}</p>
              <div className="price">₹{carDetails.price.toLocaleString()}/day</div>
            </div>
          </div>

          {/* Booking Steps */}
          <div className="booking-steps">
            {steps.map((label, index) => (
              <div 
                key={label}
                className={`step ${index === activeStep ? 'active' : ''} 
                           ${index < activeStep ? 'completed' : ''}`}
              >
                <div className="step-number">{index + 1}</div>
                <div className="step-label">{label}</div>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="step-content">
            {activeStep === 0 && (
              <div className="booking-form">
                <h3>Select Pickup & Return Details</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Pickup Location</label>
                    <input
                      type="text"
                      name="pickup"
                      value={formData.pickup}
                      onChange={handleInputChange}
                      placeholder="Enter pickup location"
                    />
                  </div>
                  <div className="form-group">
                    <label>Return Location</label>
                    <input
                      type="text"
                      name="dropoff"
                      value={formData.dropoff}
                      onChange={handleInputChange}
                      placeholder="Enter return location"
                    />
                  </div>
                  <div className="form-group">
                    <label>Pickup Date</label>
                    <input
                      type="date"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Pickup Time</label>
                    <input
                      type="time"
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Return Date</label>
                    <input
                      type="date"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Return Time</label>
                    <input
                      type="time"
                      name="returnTime"
                      value={formData.returnTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div className="booking-form">
                <h3>Personal Information</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Driver's License Number</label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="booking-form">
                <h3>Review & Payment</h3>
                <div className="booking-summary">
                  <div className="summary-section">
                    <h4>Insurance Options</h4>
                    <div className="insurance-options">
                      {insuranceOptions.map(option => (
                        <div key={option.id} className="insurance-option">
                          <input
                            type="radio"
                            name="insurance"
                            value={option.id}
                            checked={formData.insurance === option.id}
                            onChange={handleInputChange}
                          />
                          <div className="option-details">
                            <h5>{option.name}</h5>
                            <p>{option.description}</p>
                            <span className="option-price">₹{option.price.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="summary-section">
                    <h4>Additional Options</h4>
                    <div className="additional-options">
                      {additionalOptions.map(option => (
                        <div key={option.id} className="option-item">
                          <input
                            type="checkbox"
                            checked={formData.additionalOptions.includes(option.id)}
                            onChange={() => handleOptionsChange(option.id)}
                          />
                          <div className="option-details">
                            <h5>{option.name}</h5>
                            <p>{option.description}</p>
                            <span className="option-price">₹{option.price.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="summary-section">
                    <h4>Payment Details</h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="form-group">
                        <label>Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                        />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="total-section">
                    <div className="total-row">
                      <span>Base Price</span>
                      <span>₹{carDetails.price.toLocaleString()}</span>
                    </div>
                    <div className="total-row">
                      <span>Insurance</span>
                      <span>₹{(insuranceOptions.find(opt => opt.id === formData.insurance)?.price || 0).toLocaleString()}</span>
                    </div>
                    <div className="total-row">
                      <span>Additional Options</span>
                      <span>₹{formData.additionalOptions.reduce((sum, optId) => {
                        const option = additionalOptions.find(opt => opt.id === optId);
                        return sum + (option?.price || 0);
                      }, 0).toLocaleString()}</span>
                    </div>
                    <div className="total-row grand-total">
                      <span>Total</span>
                      <span>₹{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="button-group">
            {activeStep > 0 && (
              <button className="secondary-button" onClick={handleBack}>
                Back
              </button>
            )}
            <button className="primary-button" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Confirm Booking' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking; 