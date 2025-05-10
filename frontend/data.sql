-- Insert dummy users (Admin and Customers)
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@carrental.com', 'admin123', 'Admin'),
('John Doe', 'john@example.com', 'customer123', 'Customer'),
('Jane Smith', 'jane@example.com', 'customer123', 'Customer'),
('Mike Johnson', 'mike@example.com', 'customer123', 'Customer');

-- Insert dummy cars
INSERT INTO cars (name, brand, type, color, fuel_type, image, price, status, ownerId) VALUES
('Toyota Camry', 'Toyota', 'Sedan', 'Silver', 'PETROL', 'https://example.com/camry.jpg', 50.00, 'Available', 2),
('Honda Civic', 'Honda', 'Sedan', 'Blue', 'PETROL', 'https://example.com/civic.jpg', 45.00, 'Available', 2),
('Tesla Model 3', 'Tesla', 'Sedan', 'White', 'ELECTRIC', 'https://example.com/tesla.jpg', 80.00, 'Available', 3),
('Ford Mustang', 'Ford', 'Sports', 'Red', 'PETROL', 'https://example.com/mustang.jpg', 70.00, 'Available', 3),
('Hyundai Tucson', 'Hyundai', 'SUV', 'Black', 'DIESEL', 'https://example.com/tucson.jpg', 60.00, 'Available', 4);

-- Insert dummy bookings
INSERT INTO bookings (customerId, carId, startDate, endDate, totalPrice, status) VALUES
(2, 1, '2024-05-15', '2024-05-20', 250.00, 'Confirmed'),
(3, 3, '2024-05-18', '2024-05-25', 560.00, 'Pending'),
(4, 5, '2024-05-20', '2024-05-22', 120.00, 'Confirmed'); 