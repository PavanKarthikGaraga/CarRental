import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import CustomerDashboard from './pages/customerDashboard/CustomerDashboard';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import Cars from './pages/cars/Cars';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import '@fontsource/poppins';
import { lazy } from 'react';

// Placeholder Register and BookCar components
const Register = lazy(() => import('./pages/register/Register'));
const BookCar = lazy(() => import('./pages/bookCar/BookCar'));

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/book-car/:id" element={<BookCar />} />
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/cars" element={<Cars />} />
          </Routes>
        </React.Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;