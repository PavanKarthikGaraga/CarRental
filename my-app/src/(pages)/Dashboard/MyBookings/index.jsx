import { useState } from 'react';
import { Link } from 'react-router-dom';
import { bookings as mockBookings } from '../../../mockdata/cars';
import './MyBookings.css';

function MyBookings() {
  const [activeTab, setActiveTab] = useState('all');
  const [bookings, setBookings] = useState(mockBookings);

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'all') return true;
    return booking.status.toLowerCase() === activeTab.toLowerCase();
  });

  const handleModify = (id) => {
    // Implement modify functionality
    console.log('Modify booking:', id);
  };

  const handleCancel = (id) => {
    setBookings(bookings.map(booking => 
      booking.id === id 
        ? { ...booking, status: 'Cancelled' }
        : booking
    ));
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>My Bookings</h1>
        <p>View and manage your car rentals</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Bookings
        </button>
        <button
          className={`tab ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active
        </button>
        <button
          className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
        <button
          className={`tab ${activeTab === 'cancelled' ? 'active' : ''}`}
          onClick={() => setActiveTab('cancelled')}
        >
          Cancelled
        </button>
      </div>

      {/* Bookings List */}
      <div className="bookings-list">
        {filteredBookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <div className="booking-content">
              <img
                src={booking.car.image}
                alt={booking.car.name}
                className="booking-image"
              />
              
              <div className="booking-details">
                <div className="booking-header">
                  <h2>{booking.car.name}</h2>
                  <span className={`status-badge ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </div>

                <div className="booking-info">
                  <div className="info-item">
                    <span className="icon">📅</span>
                    <span>{new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="info-item">
                    <span className="icon">📍</span>
                    <span>{booking.location}</span>
                  </div>
                  <div className="info-item">
                    <span className="icon">⏱️</span>
                    <span>Duration: {Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24))} days</span>
                  </div>
                  <div className="info-item price">
                    <span>₹{booking.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="booking-actions">
                <button
                  className="action-button primary"
                  disabled={booking.status !== 'Active'}
                >
                  Modify
                </button>
                <button
                  className="action-button secondary"
                  disabled={booking.status !== 'Active'}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredBookings.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">🔍</span>
            <h2>No bookings found</h2>
            <p>No {activeTab === 'all' ? '' : activeTab} bookings to display</p>
            <Link to="/cars" className="browse-button">
              Browse Cars
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings; 