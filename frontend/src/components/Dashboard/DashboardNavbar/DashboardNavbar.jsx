import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSignOutAlt } from 'react-icons/fa';
import './DashboardNavbar.css';

const DashboardNavbar = ({ userName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <nav className="dashboard-navbar">
      <div className="nav-left">
        <button onClick={handleBack} className="back-button">
          <FaArrowLeft /> Back
        </button>
      </div>
      <div className="nav-center">
        <h2>Welcome, {userName}</h2>
      </div>
      <div className="nav-right">
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavbar; 