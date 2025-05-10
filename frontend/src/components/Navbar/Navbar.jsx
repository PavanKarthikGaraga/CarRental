import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const handleDashboardClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role === 'Admin') {
      navigate('/admin/dashboard');
    } else if (user.role === 'Customer') {
      navigate('/customer/dashboard');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">AutoVoyage</Link>
      </div>
      <div className="navbar-links">
        <Link to="/cars">Cars</Link>
        {user ? (
          <div className="user-menu">
            <button className="profile-btn" onClick={handleDashboardClick}>
              <FaUser />
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt />
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 