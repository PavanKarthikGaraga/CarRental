import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import CarManagement from '../../components/Dashboard/Admin/CarManagement/CarManagement'
import SystemOverview from '../../components/Dashboard/Admin/SystemOverview/SystemOverview'
import RecentBookings from '../../components/Dashboard/Admin/RecentBookings'
import UserManagement from '../../components/Dashboard/Admin/UserManagement'
import ResetPassword from '../../components/Dashboard/Admin/ResetPassword'
  // import Sidebar from '../../components/Sidebar/Sidebar';

const AdminDashboardContent = ({
  users, cars, bookings, loading, error, activeSection, handleLogout, handleDeleteUser, handleDeleteCar, handleCarStatusUpdate, handleBookingStatusUpdate, stats
}) => {
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <SystemOverview stats={stats} />;
      case 'bookings':
        return <RecentBookings bookings={bookings} onUpdateStatus={handleBookingStatusUpdate} />;
      case 'users':
        return <UserManagement users={users} onDeleteUser={handleDeleteUser} />;
      case 'cars':
        return <CarManagement 
          cars={cars} 
          onDeleteCar={handleDeleteCar} 
          onUpdateStatus={handleCarStatusUpdate}
        />;
      case 'reset-password':
        return <ResetPassword />;
      default:
        return <SystemOverview stats={stats} />;
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard-content">
      {renderActiveSection()}
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData || userData.role !== 'Admin') {
      navigate('/login');
      return;
    }
    setUser(userData);
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      // Fetch all users
      const usersResponse = await fetch('http://localhost:8080/api/users');
      const usersData = await usersResponse.json();
      setUsers(usersData);

      // Fetch all cars
      const carsResponse = await fetch('http://localhost:8080/api/cars');
      const carsData = await carsResponse.json();
      setCars(carsData);

      // Fetch all bookings
      const bookingsResponse = await fetch('http://localhost:8080/api/bookings');
      const bookingsData = await bookingsResponse.json();
      setBookings(bookingsData);

      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setUsers(users.filter(u => u.id !== userId));
        }
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  const handleDeleteCar = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/cars/${carId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setCars(cars.filter(c => c.id !== carId));
        }
      } catch (err) {
        setError('Failed to delete car');
      }
    }
  };

  const handleCarStatusUpdate = async (carId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cars/${carId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setCars(cars.map(car => 
          car.id === carId ? { ...car, status: newStatus } : car
        ));
      }
    } catch (err) {
      setError('Failed to update car status');
    }
  };

  const handleBookingStatusUpdate = async (bookingId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setBookings(bookings.map(booking => 
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        ));
      }
    } catch (err) {
      setError('Failed to update booking status');
    }
  };

  const stats = {
    totalUsers: users.length,
    totalCars: cars.length,
    totalBookings: bookings.length,
    availableCars: cars.filter(car => car.status === 'Available').length,
  };

  return (
    <DashboardLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      <AdminDashboardContent
        users={users}
        cars={cars}
        bookings={bookings}
        loading={loading}
        error={error}
        activeSection={activeSection}
        handleLogout={handleLogout}
        handleDeleteUser={handleDeleteUser}
        handleDeleteCar={handleDeleteCar}
        handleCarStatusUpdate={handleCarStatusUpdate}
        handleBookingStatusUpdate={handleBookingStatusUpdate}
        stats={stats}
      />
    </DashboardLayout>
  );
};

export default AdminDashboard; 