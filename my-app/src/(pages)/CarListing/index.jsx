import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Chip,
  Pagination,
} from '@mui/material';

// Mock data for cars
const cars = [
  {
    id: 1,
    name: 'Economy',
    model: 'Nissan Versa or similar',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=500',
    price: 58,
    specs: '5 seats | Auto',
  },
  {
    id: 2,
    name: 'Intermediate',
    model: 'Nissan Versa or similar',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=500',
    price: 61,
    specs: '5 seats | Auto',
  },
  {
    id: 3,
    name: 'Standard',
    model: 'Nissan Versa or similar',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=500',
    price: 64,
    specs: '5 seats | Auto',
  },
  {
    id: 4,
    name: 'Fullsize',
    model: 'Toyota Camry or similar',
    image: 'https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&w=500',
    price: 65,
    specs: '5 seats | Auto',
  },
  {
    id: 5,
    name: 'Economy',
    model: 'Toyota Camry or similar',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=500',
    price: 67,
    specs: '5 seats | Auto',
  },
];

const priceRanges = [
  { id: 1, label: 'Price: $0-$100', value: '0-100' },
  { id: 2, label: 'Price: $100-$150', value: '100-150' },
  { id: 3, label: 'Price: $150-$200', value: '150-200' },
];

const sortOptions = [
  { id: 1, label: 'Best match', value: 'best' },
  { id: 2, label: 'Price: low to high', value: 'price_asc' },
  { id: 3, label: 'Price: high to low', value: 'price_desc' },
  { id: 4, label: 'Car type', value: 'type' },
];

function CarListing() {
  const [priceRange, setPriceRange] = useState('0-100');
  const [sortBy, setSortBy] = useState('best');
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* Filters Sidebar */}
        <Box sx={{ width: 280, flexShrink: 0 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Filter
          </Typography>

          {/* Car Size Filter */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip label="Small" variant="outlined" onClick={() => {}} />
              <Chip label="Medium" variant="outlined" onClick={() => {}} />
              <Chip label="Large" variant="outlined" onClick={() => {}} />
            </Box>
          </Box>

          {/* Price Range Filter */}
          <Box sx={{ mb: 4 }}>
            <FormControl>
              <RadioGroup
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                {priceRanges.map((range) => (
                  <FormControlLabel
                    key={range.id}
                    value={range.value}
                    control={<Radio />}
                    label={range.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Sort Options */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Sort by
            </Typography>
            <FormControl>
              <RadioGroup
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>

        {/* Car Grid */}
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5">Choose a car</Typography>
            <Button variant="outlined">Filter</Button>
          </Box>

          <Box className="car-grid">
            {cars.map((car) => (
              <Card
                key={car.id}
                component={RouterLink}
                to={`/cars/${car.id}`}
                sx={{
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={car.image}
                  alt={car.name}
                  sx={{ borderRadius: '12px' }}
                />
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {car.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        {car.model}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {car.specs}
                      </Typography>
                    </Box>
                    <Chip
                      label={`$${car.price}/day`}
                      color="primary"
                      sx={{
                        fontWeight: 600,
                        backgroundColor: 'primary.main',
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={5}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default CarListing; 