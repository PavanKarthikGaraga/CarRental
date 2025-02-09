import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Pages
import Home from './(pages)/Home';
import CarListing from './(pages)/CarListing';
import CarDetails from './(pages)/CarDetails';
import Booking from './(pages)/Booking';
import Dashboard from './(pages)/Dashboard';
import About from './(pages)/About';
import Contact from './(pages)/Contact';
import NotFound from './(pages)/NotFound';
import PeerToPeer from './(pages)/PeerToPeer';

// Dashboard pages
import MyBookings from './(pages)/Dashboard/MyBookings';
import Favorites from './(pages)/Dashboard/Favorites';
import Settings from './(pages)/Dashboard/Settings';

function App() {
  return (
    <Layout>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<CarListing />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/list-your-car" element={<PeerToPeer />} />

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/bookings" element={<MyBookings />} />
        <Route path="/dashboard/favorites" element={<Favorites />} />
        <Route path="/dashboard/settings" element={<Settings />} />

        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
