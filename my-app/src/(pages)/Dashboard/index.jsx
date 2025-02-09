import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Stack,
  LinearProgress,
  Divider,
  Chip,
} from '@mui/material';
import {
  DirectionsCar,
  CalendarToday,
  Favorite,
  Star,
} from '@mui/icons-material';

// Mock data
const stats = [
  {
    icon: <DirectionsCar />,
    label: 'Total Rentals',
    value: '12',
    color: '#0084FF',
  },
  {
    icon: <CalendarToday />,
    label: 'Active Bookings',
    value: '2',
    color: '#00C853',
  },
  {
    icon: <Favorite />,
    label: 'Saved Cars',
    value: '8',
    color: '#FF3366',
  },
  {
    icon: <Star />,
    label: 'Reviews Given',
    value: '15',
    color: '#FFB300',
  },
];

const recentBookings = [
  {
    id: 1,
    car: 'Tesla Model 3',
    date: '15 Jul - 18 Jul',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=300',
  },
  {
    id: 2,
    car: 'BMW M4',
    date: '10 Jul - 12 Jul',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=300',
  },
];

function Dashboard() {
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="xl">
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 1 }}>
            Welcome back, John!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's what's happening with your rentals.
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className="card-hover">
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        bgcolor: `${stat.color}15`,
                        color: stat.color,
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h4" sx={{ mb: 0.5 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Recent Bookings */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Recent Bookings</Typography>
              <Button
                component={RouterLink}
                to="/dashboard/bookings"
                color="primary"
              >
                View All
              </Button>
            </Box>
            <Stack spacing={2}>
              {recentBookings.map((booking) => (
                <Box key={booking.id}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Avatar
                        variant="rounded"
                        src={booking.image}
                        sx={{ width: 64, height: 64 }}
                      />
                    </Grid>
                    <Grid item xs>
                      <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                        {booking.car}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {booking.date}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Chip
                        label={booking.status}
                        color={booking.status === 'Active' ? 'primary' : 'default'}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card className="card-hover">
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Rent a Car
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Browse our collection of premium vehicles and book your next ride.
                </Typography>
                <Button
                  component={RouterLink}
                  to="/cars"
                  variant="contained"
                  className="button-hover"
                  startIcon={<DirectionsCar />}
                >
                  Browse Cars
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="card-hover">
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Saved Cars
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  View and manage your favorite vehicles for quick access.
                </Typography>
                <Button
                  component={RouterLink}
                  to="/dashboard/favorites"
                  variant="outlined"
                  className="button-hover"
                  startIcon={<Favorite />}
                >
                  View Favorites
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard; 