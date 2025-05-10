import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './BookCar.css';

function getTomorrow() {
  const t = new Date();
  t.setDate(t.getDate() + 1);
  return t.toISOString().slice(0, 10);
}

const BookCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    // Check login
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    // Fetch car
    const fetchCar = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/cars/${id}`);
        if (!res.ok) throw new Error('Car not found');
        const data = await res.json();
        setCar(data);
      } catch (err) {
        setError('Car not found');
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Calculate total price
  const getTotalPrice = () => {
    if (!car || !formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return days > 0 ? days * car.price : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    if (!user) {
      setError('You must be logged in to book.');
      return;
    }
    if (!formData.startDate || !formData.endDate) {
      setError('Please select both start and end dates.');
      return;
    }
    const booking = {
      customer: { id: user.id },
      car: { id: car.id },
      startDate: formData.startDate,
      endDate: formData.endDate,
      totalPrice: getTotalPrice(),
      status: 'Pending',
    };
    try {
      const res = await fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      });
      if (res.ok) {
        setSuccess('Booking successful!');
        setTimeout(() => navigate('/customer/dashboard'), 1500);
      } else {
        // Try to parse backend error message
        let msg = 'Booking failed.';
        try {
          const data = await res.json();
          if (typeof data === 'string') msg = data;
          else if (data && data.message) msg = data.message;
          else if (data && data.error) msg = data.error;
        } catch (e) {
          try {
            const text = await res.text();
            if (text.includes('Start date must be in the future')) msg = 'Start date must be in the future';
            else if (text.includes('End date must be in the future')) msg = 'End date must be in the future';
            else msg = text;
          } catch {}
        }
        setError(msg);
      }
    } catch (err) {
      setError('Booking failed.');
    }
  };

  if (loading) return <div className="bookcar-loading">Loading...</div>;
  if (error) return <div className="bookcar-error">{error}</div>;

  // Set min start date to tomorrow
  const minStartDate = getTomorrow();
  // Set min end date to startDate or tomorrow
  const minEndDate = formData.startDate ? formData.startDate : minStartDate;

  return (
    <div className="bookcar-container">
      <div className="bookcar-box">
        <h2>Book Car</h2>
        <div className="bookcar-details">
          <img src={car.image} alt={car.name} className="bookcar-image" />
          <div>
            <h3>{car.name}</h3>
            <p>Brand: {car.brand}</p>
            <p>Type: {car.type}</p>
            <p>Price: ₹{car.price}/day</p>
            <p>Status: {car.status}</p>
          </div>
        </div>
        {!user ? (
          <div className="bookcar-login-prompt">
            <p>You must be <Link to="/login">logged in</Link> to book a car.</p>
          </div>
        ) : (
          <form className="bookcar-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" value={user.name} disabled />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={user.email} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required min={minStartDate} />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} required min={minEndDate} />
            </div>
            <div className="form-group">
              <label>Total Price</label>
              <input type="text" value={`₹${getTotalPrice()}`} disabled />
            </div>
            <button type="submit" className="bookcar-button">Book Now</button>
          </form>
        )}
        {success && <div className="bookcar-success">{success}</div>}
        {error && <div className="bookcar-error">{error}</div>}
      </div>
    </div>
  );
};

export default BookCar; 