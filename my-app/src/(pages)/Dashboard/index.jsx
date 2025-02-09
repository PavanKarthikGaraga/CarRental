import { useState } from 'react';
import { Link } from 'react-router-dom';
import { bookings, favorites } from '../../mockdata/cars';
import './Dashboard.css';

// Mock data
const stats = [
  {
    icon: '🚗',
    label: 'Total Rentals',
    value: bookings.length.toString(),
    color: '#0084FF',
  },
  {
    icon: '📅',
    label: 'Active Bookings',
    value: bookings.filter(b => b.status === 'Active').length.toString(),
    color: '#00C853',
  },
  {
    icon: '❤️',
    label: 'Saved Cars',
    value: favorites.length.toString(),
    color: '#FF3366',
  },
  {
    icon: '⭐',
    label: 'Reviews Given',
    value: '15',
    color: '#FFB300',
  },
];

// Use the first two bookings as recent bookings
const recentBookings = bookings.slice(0, 2);

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1>Welcome back, John!</h1>
          <p>Here's what's happening with your rentals.</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <h2>{stat.value}</h2>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="bookings-card">
          <div className="card-header">
            <h2>Recent Bookings</h2>
            <Link to="/dashboard/bookings" className="view-all">View All</Link>
          </div>
          
          <div className="bookings-list">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="booking-item">
                <div className="booking-content">
                  <img src={booking.car.image} alt={booking.car.name} className="booking-image" />
                  <div className="booking-details">
                    <h3>{booking.car.name}</h3>
                    <p>{new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</p>
                  </div>
                  <span className={`status-badge ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </div>
                <div className="divider"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <div className="action-card">
            <div className="action-content">
              <h2>Rent a Car</h2>
              <p>Browse our collection of premium vehicles and book your next ride.</p>
              <Link to="/cars" className="action-button primary">
                🚗 Browse Cars
              </Link>
            </div>
          </div>

          <div className="action-card">
            <div className="action-content">
              <h2>Saved Cars</h2>
              <p>View and manage your favorite vehicles for quick access.</p>
              <Link to="/dashboard/favorites" className="action-button secondary">
                ❤️ View Favorites
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 