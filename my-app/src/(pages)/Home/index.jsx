import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Tabs,
  Tab,
  Chip,
  Rating,
  Stack,
} from '@mui/material';
import {
  LocalGasStation,
  Speed,
  Person,
  Settings,
} from '@mui/icons-material';

// Mock data for car listings
const carListings = [
  {
    id: 1,
    name: 'Tesla Model 3',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800',
    price: 99,
    rating: 4.8,
    reviews: 128,
    category: 'Electric',
    specs: {
      seats: 5,
      transmission: 'Auto',
      speed: '0-60 mph in 3.1s',
      range: '358 mi range',
    },
  },
  {
    id: 2,
    name: 'BMW M4 Competition',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800',
    price: 149,
    rating: 4.9,
    reviews: 96,
    category: 'Sport',
    specs: {
      seats: 4,
      transmission: 'Auto',
      speed: '0-60 mph in 3.8s',
      power: '503 hp',
    },
  },
  {
    id: 3,
    name: 'Range Rover Sport',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800',
    price: 179,
    rating: 4.7,
    reviews: 84,
    category: 'SUV',
    specs: {
      seats: 7,
      transmission: 'Auto',
      speed: '0-60 mph in 4.3s',
      power: '523 hp',
    },
  },
  {
    id: 4,
    name: 'Mercedes-AMG GT',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800',
    price: 199,
    rating: 4.9,
    reviews: 72,
    category: 'Sport',
    specs: {
      seats: 2,
      transmission: 'Auto',
      speed: '0-60 mph in 3.1s',
      power: '577 hp',
    },
  },
  {
    id: 5,
    name: 'Porsche 911 GT3',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800',
    price: 249,
    rating: 5.0,
    reviews: 64,
    category: 'Sport',
    specs: {
      seats: 2,
      transmission: 'Manual',
      speed: '0-60 mph in 3.2s',
      power: '502 hp',
    },
  },
];

function Home() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        className="hero-section" 
        sx={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920)',
          backgroundAttachment: 'fixed',
        }}
      >
        <Container maxWidth="xl">
          <Box className="hero-content">
            <Typography
              variant="h1"
              sx={{
                color: 'white',
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
              }}
            >
              Find Your Perfect Drive
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                mb: 4,
                maxWidth: 600,
              }}
            >
              Experience luxury and performance with our premium car collection. Book your dream car today.
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/cars"
              className="button-hover"
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
              }}
            >
              Explore Cars
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Car Listings Section */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Featured Cars
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Discover our most popular vehicles
          </Typography>
        </Box>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            mb: 4,
            '& .MuiTab-root': {
              fontSize: '1rem',
              textTransform: 'none',
              minWidth: 120,
              fontWeight: 500,
            },
          }}
        >
          <Tab label="All Cars" />
          <Tab label="Electric" />
          <Tab label="Sport" />
          <Tab label="SUV" />
        </Tabs>

        {/* Car Grid */}
        <Box className="grid-layout">
          {carListings.map((car) => (
            <Card
              key={car.id}
              component={RouterLink}
              to={`/cars/${car.id}`}
              className="card-hover"
              sx={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: 'hidden',
                bgcolor: 'background.paper',
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="220"
                  image={car.image}
                  alt={car.name}
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
                <Chip
                  label={car.category}
                  color="primary"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    fontWeight: 600,
                  }}
                />
              </Box>

              <CardContent sx={{ p: 3, flexGrow: 1 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {car.name}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Rating value={car.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="body2" color="text.secondary">
                      ({car.reviews} reviews)
                    </Typography>
                  </Stack>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Person sx={{ fontSize: 20, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {car.specs.seats} seats
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Settings sx={{ fontSize: 20, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {car.specs.transmission}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Speed sx={{ fontSize: 20, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {car.specs.speed}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
                      ${car.price}
                      <Typography component="span" variant="body2" color="text.secondary">
                        /day
                      </Typography>
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderRadius: '50px',
                      textTransform: 'none',
                      fontWeight: 500,
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Home; 