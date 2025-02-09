import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Card,
  CardContent,
  Divider,
} from '@mui/material';

const steps = [
  'Book your car',
  'Review details',
  'Payment',
];

// Mock insurance options
const insuranceOptions = [
  {
    id: 'basic',
    name: 'Basic Coverage',
    price: 15,
    description: 'Covers basic liability and collision damage',
  },
  {
    id: 'premium',
    name: 'Premium Coverage',
    price: 25,
    description: 'Full coverage including theft protection and roadside assistance',
  },
];

// Mock additional options
const additionalOptions = [
  {
    id: 'gps',
    name: 'GPS Navigation',
    price: 5,
    description: 'Built-in GPS navigation system',
  },
  {
    id: 'childSeat',
    name: 'Child Seat',
    price: 8,
    description: 'Safety-certified child seat',
  },
  {
    id: 'wifi',
    name: 'Wi-Fi Hotspot',
    price: 10,
    description: '4G LTE Wi-Fi connection',
  },
];

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    insurance: 'basic',
    additionalOptions: [],
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const car = location.state?.car || {
    name: 'Tesla Model 3',
    price: 75,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800',
  };
  const startDate = location.state?.startDate || '';
  const endDate = location.state?.endDate || '';

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleOptionsChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      additionalOptions: checked
        ? [...prev.additionalOptions, value]
        : prev.additionalOptions.filter((option) => option !== value),
    }));
  };

  const calculateTotal = () => {
    const days = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );
    const basePrice = car.price * days;
    const insurancePrice =
      insuranceOptions.find((option) => option.id === formData.insurance)?.price || 0;
    const optionsPrice = formData.additionalOptions.reduce(
      (sum, optionId) =>
        sum + (additionalOptions.find((option) => option.id === optionId)?.price || 0),
      0
    );
    return basePrice + insurancePrice + optionsPrice;
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h4" sx={{ mb: 3 }}>
              Book your car
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              You'll be able to review before you pay
            </Typography>

            <Grid container spacing={3}>
              {/* Pick-up Location */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Pick up
                </Typography>
                <TextField
                  fullWidth
                  placeholder="City, airport or address"
                  value={formData.pickup}
                  onChange={handleInputChange('pickup')}
                />
              </Grid>

              {/* Return Location */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Return
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Same as pickup"
                  value={formData.dropoff}
                  onChange={handleInputChange('dropoff')}
                />
              </Grid>

              {/* Pick-up Date & Time */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Pick-up date
                </Typography>
                <TextField
                  fullWidth
                  type="date"
                  value={formData.pickupDate}
                  onChange={handleInputChange('pickupDate')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Pick-up time
                </Typography>
                <TextField
                  fullWidth
                  type="time"
                  value={formData.pickupTime}
                  onChange={handleInputChange('pickupTime')}
                />
              </Grid>

              {/* Return Date & Time */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Return date
                </Typography>
                <TextField
                  fullWidth
                  type="date"
                  value={formData.returnDate}
                  onChange={handleInputChange('returnDate')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Return time
                </Typography>
                <TextField
                  fullWidth
                  type="time"
                  value={formData.returnTime}
                  onChange={handleInputChange('returnTime')}
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h4" sx={{ mb: 3 }}>
              Review details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Insurance Coverage</FormLabel>
                  <RadioGroup
                    name="insurance"
                    value={formData.insurance}
                    onChange={handleInputChange('insurance')}
                  >
                    {insuranceOptions.map((option) => (
                      <FormControlLabel
                        key={option.id}
                        value={option.id}
                        control={<Radio />}
                        label={
                          <Box>
                            <Typography variant="subtitle1">
                              {option.name} - ${option.price}/day
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {option.description}
                            </Typography>
                          </Box>
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Additional Options
                </Typography>
                {additionalOptions.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    control={
                      <Checkbox
                        checked={formData.additionalOptions.includes(option.id)}
                        onChange={handleOptionsChange}
                        value={option.id}
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="subtitle2">
                          {option.name} - ${option.price}/day
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {option.description}
                        </Typography>
                      </Box>
                    }
                  />
                ))}
              </Grid>
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h4" sx={{ mb: 3 }}>
              Payment
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange('cardNumber')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Expiry Date"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange('expiryDate')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="CVV"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange('cvv')}
                />
              </Grid>
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  const handleSubmit = () => {
    // Here you would typically submit the booking data to a backend
    console.log('Booking submitted:', { formData, car, startDate, endDate });
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Progress Indicator */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Step {activeStep + 1} of {steps.length}
        </Typography>
        <Box sx={{ width: '100%', height: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Box
            sx={{
              width: `${((activeStep + 1) / steps.length) * 100}%`,
              height: '100%',
              bgcolor: 'primary.main',
              borderRadius: 2,
              transition: 'width 0.3s ease',
            }}
          />
        </Box>
      </Box>

      {/* Step Content */}
      <Box sx={{ mb: 4 }}>
        {renderStepContent(activeStep)}
      </Box>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        {activeStep > 0 && (
          <Button onClick={handleBack}>
            Back
          </Button>
        )}
        <Button
          variant="contained"
          onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
          disabled={activeStep === steps.length - 1}
        >
          {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </Box>
    </Container>
  );
}

export default Booking; 