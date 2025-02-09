import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Tabs,
  Tab,
  Avatar,
  Stack,
  Divider,
} from '@mui/material';
import {
  CalendarToday,
  DirectionsCar,
  AccessTime,
  LocationOn,
} from '@mui/icons-material';

// Mock data for bookings
const bookings = [
  {
    id: 1,
    car: {
      name: 'Tesla Model 3',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=300',
    },
    startDate: '2024-03-15',
    endDate: '2024-03-18',
    location: 'New York City',
    status: 'Active',
    price: 297,
  },
  {
    id: 2,
    car: {
      name: 'BMW M4 Competition',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=300',
    },
    startDate: '2024-03-10',
    endDate: '2024-03-12',
    location: 'Los Angeles',
    status: 'Completed',
    price: 447,
  },
  {
    id: 3,
    car: {
      name: 'Porsche 911 GT3',
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=300',
    },
    startDate: '2024-02-25',
    endDate: '2024-02-28',
    location: 'Miami',
    status: 'Cancelled',
    price: 747,
  },
];

function MyBookings() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'primary';
      case 'Completed':
        return 'success';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (tabValue === 0) return true; // All
    if (tabValue === 1) return booking.status === 'Active';
    if (tabValue === 2) return booking.status === 'Completed';
    return booking.status === 'Cancelled';
  });

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            My Bookings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View and manage your car rentals
          </Typography>
        </Box>

        {/* Tabs */}
        <Box sx={{ mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                textTransform: 'none',
                minWidth: 100,
              },
            }}
          >
            <Tab label="All Bookings" />
            <Tab label="Active" />
            <Tab label="Completed" />
            <Tab label="Cancelled" />
          </Tabs>
        </Box>

        {/* Bookings List */}
        <Stack spacing={3}>
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="card-hover">
              <CardContent>
                <Grid container spacing={3} alignItems="center">
                  {/* Car Image */}
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      src={booking.car.image}
                      sx={{ width: 100, height: 100 }}
                    />
                  </Grid>

                  {/* Booking Details */}
                  <Grid item xs={12} sm>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        {booking.car.name}
                      </Typography>
                      <Chip
                        label={booking.status}
                        color={getStatusColor(booking.status)}
                        size="small"
                        sx={{ mb: 1 }}
                      />
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CalendarToday sx={{ fontSize: 20, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocationOn sx={{ fontSize: 20, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {booking.location}
                            </Typography>
                          </Box>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AccessTime sx={{ fontSize: 20, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              Duration: {Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24))} days
                            </Typography>
                          </Box>
                          <Typography variant="h6" color="primary">
                            ${booking.price.toFixed(2)}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Actions */}
                  <Grid item xs={12} sm="auto">
                    <Stack spacing={1} direction={{ xs: 'row', sm: 'column' }} sx={{ minWidth: 120 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        disabled={booking.status !== 'Active'}
                      >
                        Modify
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        disabled={booking.status !== 'Active'}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default MyBookings; 