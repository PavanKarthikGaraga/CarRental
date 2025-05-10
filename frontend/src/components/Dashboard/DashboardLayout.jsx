import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import DashboardNavbar from './DashboardNavbar/DashboardNavbar';
import DashboardFooter from './DashboardFooter/DashboardFooter';
import Sidebar from '../Sidebar/Sidebar';
import './DashboardLayout.css';

const SIDEBAR_WIDTH = 250;
const SIDEBAR_COLLAPSED_WIDTH = 70;

const DashboardLayout = ({ children, activeSection, onSectionChange }) => {
  const isSidebarOpen = true;
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const location = useLocation();
  const showWelcome = location.pathname === '/customer/dashboard' || location.pathname === '/admin/dashboard';

  return (
    <div className="dashboard-root">
      <DashboardNavbar userName={showWelcome ? user.name || 'User' : null} />
      <div className="dashboard-flex">
        <Sidebar 
          isOpen={isSidebarOpen} 
          showBackButton={true} 
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />
        <div className="dashboard-main-wrapper-static">
          <Toaster position="top-right" />
          <main className="dashboard-main">
            {React.cloneElement(children, { activeSection })}
          </main>
          <DashboardFooter />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 