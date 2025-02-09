import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Chip,
  Divider,
} from '@mui/material';

// Mock data for car details
const carDetails = {
  id: 1,
  name: 'Ford Mustang GT',
  description: 'The Ford Mustang GT is a powerful and stylish sports car that offers an exhilarating driving experience. With its 5.0L V8 engine, the Mustang GT delivers impressive performance, while its iconic design and premium features make it a head-turning choice for car enthusiasts.',
  images: [
    'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1920',
  ],
  features: [
    { id: 1, name: '5.0L V8 Engine' },
    { id: 2, name: '6-Speed Manual Transmission' },
    { id: 3, name: 'Leather Seats' },
    { id: 4, name: 'B&O Sound System' },
  ],
  specifications: [
    { name: 'Engine', value: '5.0L V8' },
    { name: 'Transmission', value: '6-speed manual' },
    { name: 'Seating Capacity', value: '4 passengers' },
    { name: 'Fuel Economy', value: '15/24 mpg' },
    { name: 'Horsepower', value: '460 hp' },
    { name: 'Torque (lb-ft)', value: '420 lb-ft' },
  ],
  price: 150,
};

// Mock data for calendar availability
const calendar = {
  month: 'Jul 2023',
  days: Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    available: Math.random() > 0.3,
  })),
};

function CarDetails() {
  const [selectedDates, setSelectedDates] = useState([]);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Hero Image */}
      <Box
        sx={{
          position: 'relative',
          height: '50vh',
          minHeight: 400,
          backgroundImage: `url(${carDetails.images[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mb: 4,
        }}
      />

      <Container maxWidth="xl">
        {/* Navigation */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Home / Listing / {carDetails.name}
          </Typography>
        </Box>

        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            {/* Overview Section */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Overview
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 4 }}>
                {carDetails.description}
              </Typography>

              {/* Features */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {carDetails.features.map((feature) => (
                  <Chip
                    key={feature.id}
                    label={feature.name}
                    sx={{
                      bgcolor: 'background.paper',
                      '&:hover': { bgcolor: 'background.paper' },
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Specifications Section */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" sx={{ mb: 3 }}>
                Specifications
              </Typography>
              <Grid container spacing={3}>
                {carDetails.specifications.map((spec, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
                      <Typography color="text.secondary">{spec.name}</Typography>
                      <Typography>{spec.value}</Typography>
                    </Box>
                    <Divider />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            {/* Availability Calendar */}
            <Box
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 2,
                p: 3,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="h6" sx={{ mb: 3 }}>
                Availability
              </Typography>

              {/* Calendar Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Button size="small">&lt;</Button>
                <Typography>{calendar.month}</Typography>
                <Button size="small">&gt;</Button>
              </Box>

              {/* Calendar Grid */}
              <Box sx={{ mb: 3 }}>
                <Grid container spacing={0.5}>
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                    <Grid item xs={12/7} key={day}>
                      <Typography
                        align="center"
                        color="text.secondary"
                        sx={{ fontSize: '0.75rem', mb: 1 }}
                      >
                        {day}
                      </Typography>
                    </Grid>
                  ))}
                  {calendar.days.map((day, index) => (
                    <Grid item xs={12/7} key={index}>
                      <Box
                        sx={{
                          aspectRatio: '1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 1,
                          cursor: day.available ? 'pointer' : 'default',
                          bgcolor: day.available ? 'primary.main' : 'transparent',
                          opacity: day.available ? 1 : 0.3,
                          '&:hover': day.available ? {
                            bgcolor: 'primary.dark',
                          } : {},
                        }}
                      >
                        <Typography
                          align="center"
                          sx={{
                            fontSize: '0.875rem',
                            color: day.available ? 'white' : 'text.secondary',
                          }}
                        >
                          {day.day}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Book Now Button */}
              <Button
                variant="contained"
                fullWidth
                size="large"
                component={RouterLink}
                to={`/booking/${carDetails.id}`}
              >
                Book Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default CarDetails; 