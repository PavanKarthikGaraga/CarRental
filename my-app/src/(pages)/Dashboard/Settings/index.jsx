import { useState } from 'react';
import './Settings.css';

function Settings() {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: '123 Main Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    currency: 'inr',
    notifications: {
      email: true,
      sms: true,
      push: false,
    },
    language: 'en',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (type) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement save functionality
    console.log('Saving settings:', formData);
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>Account Settings</h1>
        <p>Manage your account preferences and settings</p>
      </div>

      <form onSubmit={handleSubmit} className="settings-form">
        {/* Personal Information */}
        <div className="section">
          <h2>Personal Information</h2>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="section">
          <h2>Address</h2>
          
          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="address">Street Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="pincode">PIN Code</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="section">
          <h2>Preferences</h2>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="currency">Currency</label>
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
              >
                <option value="inr">Indian Rupee (₹)</option>
                <option value="usd">US Dollar ($)</option>
                <option value="eur">Euro (€)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="language">Language</label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="mr">Marathi</option>
              </select>
            </div>
          </div>

          <div className="notifications">
            <h3>Notifications</h3>
            
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.notifications.email}
                  onChange={() => handleNotificationChange('email')}
                />
                <span className="checkbox-text">
                  <span className="checkbox-title">Email Notifications</span>
                  <span className="checkbox-description">Receive booking updates and promotions via email</span>
                </span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.notifications.sms}
                  onChange={() => handleNotificationChange('sms')}
                />
                <span className="checkbox-text">
                  <span className="checkbox-title">SMS Notifications</span>
                  <span className="checkbox-description">Get instant updates about your bookings via SMS</span>
                </span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.notifications.push}
                  onChange={() => handleNotificationChange('push')}
                />
                <span className="checkbox-text">
                  <span className="checkbox-title">Push Notifications</span>
                  <span className="checkbox-description">Receive push notifications on your device</span>
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button type="submit" className="save-button">
            Save Changes
          </button>
          <button type="button" className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings; 