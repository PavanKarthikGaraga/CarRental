import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './SystemOverview.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const SystemOverview = ({ stats }) => {
  const bookingsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Bookings',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: '#0033cc',
        tension: 0.1,
      },
    ],
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        backgroundColor: '#0033cc',
      },
    ],
  };

  const carStatusData = {
    labels: ['Available', 'Booked', 'Maintenance'],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: ['#0033cc', '#ff6b6b', '#ffd93d'],
      },
    ],
  };

  return (
    <div className="system-overview">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats?.totalUsers || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Cars</h3>
          <p>{stats?.totalCars || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Active Bookings</h3>
          <p>{stats?.activeBookings || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>${stats?.totalRevenue || 0}</p>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Booking Trends</h3>
          <Line data={bookingsData} options={{ maintainAspectRatio: false }} />
        </div>
        <div className="chart-card">
          <h3>Revenue Overview</h3>
          <Bar data={revenueData} options={{ maintainAspectRatio: false }} />
        </div>
        <div className="chart-card">
          <h3>Car Status Distribution</h3>
          <Doughnut data={carStatusData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default SystemOverview; 