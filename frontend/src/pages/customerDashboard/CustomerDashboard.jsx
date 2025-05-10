import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import FeaturedCars from '../../components/Dashboard/Customer/FeaturedCars';
import ResetPassword from '../../components/Dashboard/Admin/ResetPassword';
import './CustomerDashboard.css';

const CustomerDashboardContent = ({
  user,
  bookings,
  featuredCars,
  loading,
  error,
  activeSection
}) => {
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <section className="dashboard-section">
            <h2>Profile</h2>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
          </section>
        );
      case 'bookings':
        return (
          <section className="dashboard-section">
            <h2>My Bookings</h2>
            {bookings.length > 0 ? (
              <div className="bookings-list">
                {bookings.map(booking => (
                  <div key={booking.id} className="booking-card">
                    <h3>Booking #{booking.id}</h3>
                    <span className={`status-badge status-${booking.status.toLowerCase()}`}>{booking.status}</span>
                    <p>Start Date: {new Date(booking.startDate).toLocaleDateString()}</p>
                    <p>End Date: {new Date(booking.endDate).toLocaleDateString()}</p>
                    <p>Total Price: ₹{booking.totalPrice}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No bookings found.</p>
            )}
          </section>
        );
      case 'reset-password':
        return <ResetPassword />;
      default:
        return (
          <section className="dashboard-section">
            <h2>Profile</h2>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
          </section>
        );
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="customer-dashboard-content">
      {renderActiveSection()}
    </div>
  );
};

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData || userData.role !== 'Customer') {
      navigate('/login');
      return;
    }
    setUser(userData);
    fetchBookings(userData.id);
    fetchFeaturedCars();
  }, [navigate]);

  const fetchBookings = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/bookings/customer/${userId}`);
      const data = await response.json();
      setBookings(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch bookings');
      setLoading(false);
    }
  };

  const fetchFeaturedCars = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/cars');
      const data = await response.json();
      // Get 3 random available cars
      const availableCars = data.filter(car => car.status === 'Available');
      const randomCars = availableCars.sort(() => 0.5 - Math.random()).slice(0, 3);
      setFeaturedCars(randomCars);
    } catch (err) {
      console.error('Failed to fetch featured cars');
    }
  };

  return (
    <DashboardLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      <CustomerDashboardContent
        user={user}
        bookings={bookings}
        featuredCars={featuredCars}
        loading={loading}
        error={error}
        activeSection={activeSection}
      />
    </DashboardLayout>
  );
};

export default CustomerDashboard; 