// Mock data for cars
export const cars = [
  {
    id: 1,
    name: 'Volkswagen Polo',
    model: 'Performance',
    image: 'https://images.unsplash.com/photo-1606038162394-4821c90e4c6c?auto=format&fit=crop&w=1920',
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
    name: 'Mahindra Thar',
    model: 'Off-Road',
    image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1920',
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
    name: 'Hyundai I30',
    model: 'S 580',
    image: 'https://images.unsplash.com/photo-1571561944842-542037875b50?auto=format&fit=crop&w=1920',
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
    name: 'Audi R8',
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

// Mock data for bookings - using cars array data
export const bookings = [
  {
    id: 1,
    car: {
      name: cars[0].name,
      image: cars[0].image,
      model: cars[0].model,
      specs: cars[0].specs
    },
    startDate: '2024-03-15',
    endDate: '2024-03-18',
    location: 'Mumbai',
    status: 'Active',
    price: cars[0].price,
  },
  {
    id: 2,
    car: {
      name: cars[1].name,
      image: cars[1].image,
      model: cars[1].model,
      specs: cars[1].specs
    },
    startDate: '2024-03-10',
    endDate: '2024-03-12',
    location: 'Delhi',
    status: 'Completed',
    price: cars[1].price,
  },
  {
    id: 3,
    car: {
      name: cars[2].name,
      image: cars[2].image,
      model: cars[2].model,
      specs: cars[2].specs
    },
    startDate: '2024-02-25',
    endDate: '2024-02-28',
    location: 'Bangalore',
    status: 'Cancelled',
    price: cars[2].price,
  },
];

// Mock data for favorites - using cars array data
export const favorites = [
  {
    id: cars[0].id,
    name: cars[0].name,
    model: cars[0].model,
    image: cars[0].image,
    price: cars[0].price,
    rating: cars[0].rating,
    category: cars[0].category,
    specs: cars[0].specs,
  },
  {
    id: cars[1].id,
    name: cars[1].name,
    model: cars[1].model,
    image: cars[1].image,
    price: cars[1].price,
    rating: cars[1].rating,
    category: cars[1].category,
    specs: cars[1].specs,
  },
  {
    id: cars[4].id,
    name: cars[4].name,
    model: cars[4].model,
    image: cars[4].image,
    price: cars[4].price,
    rating: cars[4].rating,
    category: cars[4].category,
    specs: cars[4].specs,
  },
];

// Mock data for car details - using cars array data
export const carDetails = {
  ...cars[2], // Using Mahindra Thar as the detailed car
  description: `Experience the power and luxury of the ${cars[2].name} ${cars[2].model}. 
    This ${cars[2].category.toLowerCase()} vehicle offers exceptional performance 
    with ${cars[2].specs.power} and ${cars[2].specs.transmission} transmission, 
    perfect for both city driving and off-road adventures.`,
  images: [
    cars[2].image,
    'https://images.unsplash.com/photo-1503377921878-9abf15f2fc51?auto=format&fit=crop&w=1920',
  ],
  features: [
    { id: 1, name: cars[2].specs.engine },
    { id: 2, name: `${cars[2].specs.transmission} Transmission` },
    { id: 3, name: 'Off-Road Package' },
    { id: 4, name: 'Premium Sound System' },
  ],
  specifications: [
    { name: 'Model', value: cars[2].model },
    { name: 'Category', value: cars[2].category },
    { name: 'Seats', value: `${cars[2].specs.seats} passengers` },
    { name: 'Transmission', value: cars[2].specs.transmission },
    { name: 'Engine', value: cars[2].specs.engine },
    { name: 'Power', value: cars[2].specs.power },
  ],
};

// Mock data for calendar availability
export const calendar = {
  month: 'Jul 2023',
  days: Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    available: Math.random() > 0.3,
  })),
}; 