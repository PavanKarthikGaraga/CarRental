import React from 'react';
import { FaClipboardList, FaKey, FaUser, FaCar } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const customerSections = [
  { id: 'profile', label: 'Profile', icon: <FaUser /> },
  { id: 'bookings', label: 'Recent Bookings', icon: <FaClipboardList /> },
  { id: 'reset-password', label: 'Reset Password', icon: <FaKey /> },
  { id: 'browse-cars', label: 'Browse Cars', icon: <FaCar />, link: '/cars' },
];

const adminSections = [
  { id: 'overview', label: 'System Overview', icon: <FaClipboardList /> },
  { id: 'bookings', label: 'Recent Bookings', icon: <FaClipboardList /> },
  { id: 'users', label: 'User Management', icon: <FaUser /> },
  { id: 'cars', label: 'Car Management', icon: <FaCar /> },
  { id: 'reset-password', label: 'Reset Password', icon: <FaKey /> },
];

const Sidebar = ({ isOpen, showBackButton, activeSection, onSectionChange }) => {
  const location = useLocation();
  const isCustomer = location.pathname.startsWith('/customer/dashboard');
  const sections = isCustomer ? customerSections : adminSections;
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      {/* {showBackButton && (
        <button className="back-button sidebar-back-button" onClick={handleBack}>
          <FaArrowLeft /> Back
        </button>
      )} */}
      <nav className="sidebar-nav">
        {sections.map(section =>
          section.link ? (
            <Link
              to={section.link}
              key={section.id}
              className={`nav-item${location.pathname === section.link ? ' active' : ''}`}
            >
              <span className="nav-icon">{section.icon}</span>
              {isOpen && <span className="nav-label">{section.label}</span>}
            </Link>
          ) : (
            <button
              key={section.id}
              className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => onSectionChange && onSectionChange(section.id)}
              title={!isOpen ? section.label : undefined}
            >
              <span className="nav-icon">{section.icon}</span>
              {isOpen && <span className="nav-label">{section.label}</span>}
            </button>
          )
        )}
      </nav>
    </div>
  );
};

export default Sidebar; 