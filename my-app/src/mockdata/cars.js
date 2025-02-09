// Mock data for cars
export const cars = [
  {
    id: 1,
    name: 'Tesla Model 3',
    model: 'Performance',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1920',
    price: 3499,
    rating: 4.8,
    reviews: 128,
    category: 'Electric',
    specs: {
      seats: 5,
      transmission: 'Auto',
      range: '500 km range',
      power: '450 bhp',
    },
  },
  {
    id: 2,
    name: 'BMW M4',
    model: 'Competition',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1920',
    price: 4999,
    rating: 4.9,
    reviews: 96,
    category: 'Sport',
    specs: {
      seats: 4,
      transmission: 'Auto',
      engine: '3.0L Twin-Turbo',
      power: '503 bhp',
    },
  },
  {
    id: 3,
    name: 'Porsche 911',
    model: 'Carrera S',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920',
    price: 7999,
    rating: 4.7,
    reviews: 84,
    category: 'Sport',
    specs: {
      seats: 4,
      transmission: 'PDK',
      engine: '3.0L Twin-Turbo',
      power: '443 bhp',
    },
  },
  {
    id: 4,
    name: 'Mercedes-Benz S-Class',
    model: 'S 580',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1920',
    price: 9999,
    rating: 4.9,
    reviews: 72,
    category: 'Luxury',
    specs: {
      seats: 5,
      transmission: 'Auto',
      engine: '4.0L V8 Biturbo',
      power: '496 bhp',
    },
  },
  {
    id: 5,
    name: 'Audi RS e-tron GT',
    model: 'RS',
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1920',
    price: 11999,
    rating: 5.0,
    reviews: 64,
    category: 'Electric',
    specs: {
      seats: 5,
      transmission: 'Auto',
      range: '470 km range',
      power: '637 bhp',
    },
  },
];

// Mock data for bookings
export const bookings = [
  {
    id: 1,
    car: {
      name: 'Tesla Model 3',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1920',
    },
    startDate: '2024-03-15',
    endDate: '2024-03-18',
    location: 'San Francisco',
    status: 'Active',
    price: 3499,
  },
  {
    id: 2,
    car: {
      name: 'BMW M4',
      image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1920',
    },
    startDate: '2024-03-10',
    endDate: '2024-03-12',
    location: 'Los Angeles',
    status: 'Completed',
    price: 4999,
  },
  {
    id: 3,
    car: {
      name: 'Porsche 911',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920',
    },
    startDate: '2024-02-25',
    endDate: '2024-02-28',
    location: 'New York',
    status: 'Cancelled',
    price: 7999,
  },
];

// Mock data for favorites
export const favorites = [
  {
    id: 1,
    name: 'Tesla Model 3',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1920',
    price: 3499,
    rating: 4.8,
    specs: {
      range: '500 km',
      power: '450 bhp',
      seats: 5,
    },
  },
  {
    id: 2,
    name: 'BMW M4',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1920',
    price: 4999,
    rating: 4.9,
    specs: {
      engine: '3.0L Twin-Turbo',
      power: '503 bhp',
      seats: 4,
    },
  },
  {
    id: 3,
    name: 'Porsche 911',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920',
    price: 7999,
    rating: 4.7,
    specs: {
      engine: '3.0L Twin-Turbo',
      power: '443 bhp',
      seats: 4,
    },
  },
];

// Mock data for car details
export const carDetails = {
  id: 1,
  name: 'Porsche 911',
  description: 'The Porsche 911 is an iconic sports car that offers an exhilarating driving experience. With its powerful twin-turbocharged engine, precise handling, and premium features, the 911 delivers impressive performance while maintaining luxury and comfort.',
  images: [
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920',
    'https://images.unsplash.com/photo-1503377921878-9abf15f2fc51?auto=format&fit=crop&w=1920',
  ],
  features: [
    { id: 1, name: '3.0L Twin-Turbo Engine' },
    { id: 2, name: '8-Speed PDK Transmission' },
    { id: 3, name: 'Sport Chrono Package' },
    { id: 4, name: 'Bose Sound System' },
  ],
  specifications: [
    { name: 'Engine', value: '3.0L Twin-Turbo' },
    { name: 'Transmission', value: '8-speed PDK' },
    { name: 'Seating Capacity', value: '4 passengers' },
    { name: 'Fuel Economy', value: '20/26 mpg' },
    { name: 'Horsepower', value: '443 hp' },
    { name: 'Torque', value: '390 lb-ft' },
  ],
  price: 7999,
};

// Mock data for calendar availability
export const calendar = {
  month: 'Jul 2023',
  days: Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    available: Math.random() > 0.3,
  })),
}; 