import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Stack,
  Rating,
  Chip,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  DirectionsCar,
  Speed,
  Person,
  Settings,
} from '@mui/icons-material';

// Mock data for saved cars
const savedCars = [
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

function Favorites() {
  const [favorites, setFavorites] = useState(savedCars);

  const handleRemoveFavorite = (carId) => {
    setFavorites(favorites.filter(car => car.id !== carId));
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Saved Cars
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your favorite vehicles for quick access
          </Typography>
        </Box>

        {/* Cars Grid */}
        <Grid container spacing={3}>
          {favorites.map((car) => (
            <Grid item xs={12} md={6} lg={4} key={car.id}>
              <Card className="card-hover">
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
                  <IconButton
                    onClick={() => handleRemoveFavorite(car.id)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'background.paper',
                      '&:hover': {
                        bgcolor: 'background.paper',
                      },
                    }}
                  >
                    <Favorite color="error" />
                  </IconButton>
                  <Chip
                    label={car.category}
                    color="primary"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      fontWeight: 600,
                    }}
                  />
                </Box>

                <CardContent sx={{ p: 3 }}>
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
                      component={RouterLink}
                      to={`/cars/${car.id}`}
                      variant="contained"
                      size="small"
                      className="button-hover"
                      startIcon={<DirectionsCar />}
                      sx={{
                        borderRadius: '50px',
                        textTransform: 'none',
                        fontWeight: 500,
                      }}
                    >
                      Rent Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {favorites.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
            }}
          >
            <FavoriteBorder sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No Saved Cars
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Start saving your favorite cars for quick access
            </Typography>
            <Button
              component={RouterLink}
              to="/cars"
              variant="contained"
              startIcon={<DirectionsCar />}
            >
              Browse Cars
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Favorites; 