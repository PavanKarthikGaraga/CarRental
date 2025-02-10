import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PeerToPeer.css';

const carTypes = ['Sedan', 'SUV', 'Sports', 'Electric', 'Luxury', 'Van'];
const transmissionTypes = ['Automatic', 'Manual'];
const fuelTypes = ['Gasoline', 'Diesel', 'Electric', 'Hybrid'];

const steps = ['Vehicle Details', 'Photos & Documents', 'Pricing & Availability'];

// Market price suggestions
const marketPriceSuggestions = {
  Sedan: { min: 3999, max: 7999 },
  SUV: { min: 4999, max: 9999 },
  Sports: { min: 9999, max: 19999 },
  Electric: { min: 5999, max: 11999 },
  Luxury: { min: 11999, max: 24999 },
  Van: { min: 6999, max: 14999 },
};

function PeerToPeer() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    type: '',
    transmission: '',
    fuelType: '',
    seats: '',
    licensePlate: '',
    description: '',
    photos: [],
    registration: null,
    insurance: null,
    pricePerDay: '',
    minimumDays: '1',
    availableFrom: '',
    availableTo: '',
  });
  const [errors, setErrors] = useState({});

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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e, field) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      [field]: field === 'photos' ? [...prev.photos, ...files] : files[0]
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0:
        if (!formData.make) newErrors.make = 'Make is required';
        if (!formData.model) newErrors.model = 'Model is required';
        if (!formData.year) newErrors.year = 'Year is required';
        if (!formData.type) newErrors.type = 'Vehicle type is required';
        if (!formData.transmission) newErrors.transmission = 'Transmission type is required';
        if (!formData.fuelType) newErrors.fuelType = 'Fuel type is required';
        if (!formData.seats) newErrors.seats = 'Number of seats is required';
        break;
      case 1:
        if (formData.photos.length === 0) newErrors.photos = 'At least one photo is required';
        if (!formData.registration) newErrors.registration = 'Registration document is required';
        if (!formData.insurance) newErrors.insurance = 'Insurance document is required';
        break;
      case 2:
        if (!formData.pricePerDay) newErrors.pricePerDay = 'Price per day is required';
        if (!formData.availableFrom) newErrors.availableFrom = 'Start date is required';
        if (!formData.availableTo) newErrors.availableTo = 'End date is required';
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateStep(activeStep)) {
      // Here you would submit the form data to your backend
      console.log('Form submitted:', formData);
      navigate('/dashboard');
    }
  };

  const getSuggestedPrice = () => {
    if (!formData.type) return null;
    const { min, max } = marketPriceSuggestions[formData.type];
    return { min, max };
  };

  return (
    <div className="peer-to-peer">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <span>List Your Car</span>
        </div>

        {/* Page Title */}
        <div className="page-header">
          <h1>List Your Car</h1>
          <p>Share your vehicle and earn money when you're not using it</p>
        </div>

        {/* Steps Progress */}
        <div className="steps-progress">
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

        {/* Form Content */}
        <div className="form-content">
          {activeStep === 0 && (
            <div className="form-section">
              <h2>Vehicle Details</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Make*</label>
                  <input
                    type="text"
                    name="make"
                    value={formData.make}
                    onChange={handleInputChange}
                    className={errors.make ? 'error' : ''}
                  />
                  {errors.make && <span className="error-message">{errors.make}</span>}
                </div>

                <div className="form-group">
                  <label>Model*</label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className={errors.model ? 'error' : ''}
                  />
                  {errors.model && <span className="error-message">{errors.model}</span>}
                </div>

                <div className="form-group">
                  <label>Year*</label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    min="1900"
                    max={new Date().getFullYear()}
                    className={errors.year ? 'error' : ''}
                  />
                  {errors.year && <span className="error-message">{errors.year}</span>}
                </div>

                <div className="form-group">
                  <label>Vehicle Type*</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className={errors.type ? 'error' : ''}
                  >
                    <option value="">Select type</option>
                    {carTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.type && <span className="error-message">{errors.type}</span>}
                </div>

                <div className="form-group">
                  <label>Transmission*</label>
                  <select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleInputChange}
                    className={errors.transmission ? 'error' : ''}
                  >
                    <option value="">Select transmission</option>
                    {transmissionTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.transmission && <span className="error-message">{errors.transmission}</span>}
                </div>

                <div className="form-group">
                  <label>Fuel Type*</label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    className={errors.fuelType ? 'error' : ''}
                  >
                    <option value="">Select fuel type</option>
                    {fuelTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.fuelType && <span className="error-message">{errors.fuelType}</span>}
                </div>

                <div className="form-group">
                  <label>Number of Seats*</label>
                  <input
                    type="number"
                    name="seats"
                    value={formData.seats}
                    onChange={handleInputChange}
                    min="1"
                    max="15"
                    className={errors.seats ? 'error' : ''}
                  />
                  {errors.seats && <span className="error-message">{errors.seats}</span>}
                </div>

                <div className="form-group">
                  <label>License Plate</label>
                  <input
                    type="text"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          )}

          {activeStep === 1 && (
            <div className="form-section">
              <h2>Photos & Documents</h2>
              
              <div className="upload-section">
                <h3>Vehicle Photos</h3>
                <p>Add at least 5 high-quality photos of your vehicle</p>
                <div className="photo-upload">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileChange(e, 'photos')}
                    className={errors.photos ? 'error' : ''}
                  />
                  {errors.photos && <span className="error-message">{errors.photos}</span>}
                </div>
                
                {formData.photos.length > 0 && (
                  <div className="photo-preview">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="preview-item">
                        <img src={URL.createObjectURL(photo)} alt={`Preview ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="upload-section">
                <h3>Required Documents</h3>
                <div className="document-upload">
                  <div className="upload-item">
                    <label>Vehicle Registration*</label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, 'registration')}
                      className={errors.registration ? 'error' : ''}
                    />
                    {errors.registration && <span className="error-message">{errors.registration}</span>}
                  </div>

                  <div className="upload-item">
                    <label>Insurance Document*</label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, 'insurance')}
                      className={errors.insurance ? 'error' : ''}
                    />
                    {errors.insurance && <span className="error-message">{errors.insurance}</span>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="form-section">
              <h2>Pricing & Availability</h2>
              
              <div className="pricing-section">
                <div className="form-group">
                  <label>Price per Day (₹)*</label>
                  <input
                    type="number"
                    name="pricePerDay"
                    value={formData.pricePerDay}
                    onChange={handleInputChange}
                    min="0"
                    className={errors.pricePerDay ? 'error' : ''}
                  />
                  {errors.pricePerDay && <span className="error-message">{errors.pricePerDay}</span>}
                  
                  {formData.type && (
                    <div className="price-suggestion">
                      <p>Suggested price range for {formData.type}:</p>
                      <p>₹{getSuggestedPrice()?.min.toLocaleString()} - ₹{getSuggestedPrice()?.max.toLocaleString()} per day</p>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Minimum Rental Days</label>
                  <input
                    type="number"
                    name="minimumDays"
                    value={formData.minimumDays}
                    onChange={handleInputChange}
                    min="1"
                  />
                </div>
              </div>

              <div className="availability-section">
                <h3>Availability Period</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Available From*</label>
                    <input
                      type="date"
                      name="availableFrom"
                      value={formData.availableFrom}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={errors.availableFrom ? 'error' : ''}
                    />
                    {errors.availableFrom && <span className="error-message">{errors.availableFrom}</span>}
                  </div>

                  <div className="form-group">
                    <label>Available To*</label>
                    <input
                      type="date"
                      name="availableTo"
                      value={formData.availableTo}
                      onChange={handleInputChange}
                      min={formData.availableFrom || new Date().toISOString().split('T')[0]}
                      className={errors.availableTo ? 'error' : ''}
                    />
                    {errors.availableTo && <span className="error-message">{errors.availableTo}</span>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="button-group">
            {activeStep > 0 && (
              <button className="secondary-button" onClick={handleBack}>
                Back
              </button>
            )}
            <button className="primary-button" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Submit Listing' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PeerToPeer; 