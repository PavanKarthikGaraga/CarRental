import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Alert,
  Stepper,
  Step,
  StepLabel,
  FormHelperText,
  Card,
  CardContent,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const carTypes = ['Sedan', 'SUV', 'Sports', 'Electric', 'Luxury', 'Van'];
const transmissionTypes = ['Automatic', 'Manual'];
const fuelTypes = ['Gasoline', 'Diesel', 'Electric', 'Hybrid'];

const steps = ['Vehicle Details', 'Photos & Documents', 'Pricing & Availability'];

// Mock market price suggestions based on car type
const marketPriceSuggestions = {
  Sedan: { min: 40, max: 80 },
  SUV: { min: 50, max: 100 },
  Sports: { min: 100, max: 200 },
  Electric: { min: 60, max: 120 },
  Luxury: { min: 120, max: 250 },
  Van: { min: 70, max: 150 },
};

function PeerToPeer() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    type: '',
    transmission: '',
    fuelType: '',
    seats: '',
    licensePlate: '',
    description: '',
    photos: [],
    registration: null,
    insurance: null,
    pricePerDay: '',
    minimumDays: '1',
    availableFrom: '',
    availableTo: '',
  });
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleFileChange = (e, field) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'photos' ? [...prev.photos, ...files] : files[0],
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0:
        if (!formData.make) newErrors.make = 'Make is required';
        if (!formData.model) newErrors.model = 'Model is required';
        if (!formData.year) newErrors.year = 'Year is required';
        if (!formData.type) newErrors.type = 'Vehicle type is required';
        if (!formData.transmission) newErrors.transmission = 'Transmission type is required';
        if (!formData.fuelType) newErrors.fuelType = 'Fuel type is required';
        if (!formData.seats) newErrors.seats = 'Number of seats is required';
        break;
      case 1:
        if (formData.photos.length === 0) newErrors.photos = 'At least one photo is required';
        if (!formData.registration) newErrors.registration = 'Registration document is required';
        if (!formData.insurance) newErrors.insurance = 'Insurance document is required';
        break;
      case 2:
        if (!formData.pricePerDay) newErrors.pricePerDay = 'Price per day is required';
        if (!formData.availableFrom) newErrors.availableFrom = 'Start date is required';
        if (!formData.availableTo) newErrors.availableTo = 'End date is required';
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateStep(activeStep)) {
      // Here you would typically submit the form data to a backend
      console.log('Form submitted:', formData);
      navigate('/dashboard');
    }
  };

  const getSuggestedPrice = () => {
    if (!formData.type) return null;
    const { min, max } = marketPriceSuggestions[formData.type];
    return { min, max };
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Make"
                name="make"
                value={formData.make}
                onChange={handleInputChange}
                error={!!errors.make}
                helperText={errors.make}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Model"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                error={!!errors.model}
                helperText={errors.model}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleInputChange}
                error={!!errors.year}
                helperText={errors.year}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.type}>
                <InputLabel>Vehicle Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  label="Vehicle Type"
                  onChange={handleInputChange}
                >
                  {carTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.transmission}>
                <InputLabel>Transmission</InputLabel>
                <Select
                  name="transmission"
                  value={formData.transmission}
                  label="Transmission"
                  onChange={handleInputChange}
                >
                  {transmissionTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                {errors.transmission && (
                  <FormHelperText>{errors.transmission}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.fuelType}>
                <InputLabel>Fuel Type</InputLabel>
                <Select
                  name="fuelType"
                  value={formData.fuelType}
                  label="Fuel Type"
                  onChange={handleInputChange}
                >
                  {fuelTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                {errors.fuelType && <FormHelperText>{errors.fuelType}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Number of Seats"
                name="seats"
                type="number"
                value={formData.seats}
                onChange={handleInputChange}
                error={!!errors.seats}
                helperText={errors.seats}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Tell potential renters about your car's features, condition, and any special notes"
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 3,
                  border: '2px dashed #ccc',
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileChange(e, 'photos')}
                  style={{ display: 'none' }}
                  id="photo-upload"
                />
                <label htmlFor="photo-upload">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Photos
                  </Button>
                </label>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Upload at least 5 high-quality photos of your car
                </Typography>
                {errors.photos && (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {errors.photos}
                  </Typography>
                )}
                {formData.photos.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      {formData.photos.length} photos selected
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 3, border: '2px dashed #ccc' }}>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, 'registration')}
                  style={{ display: 'none' }}
                  id="registration-upload"
                />
                <label htmlFor="registration-upload">
                  <Button
                    fullWidth
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Registration
                  </Button>
                </label>
                {errors.registration && (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {errors.registration}
                  </Typography>
                )}
                {formData.registration && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {formData.registration.name}
                  </Typography>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 3, border: '2px dashed #ccc' }}>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, 'insurance')}
                  style={{ display: 'none' }}
                  id="insurance-upload"
                />
                <label htmlFor="insurance-upload">
                  <Button
                    fullWidth
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Insurance
                  </Button>
                </label>
                {errors.insurance && (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {errors.insurance}
                  </Typography>
                )}
                {formData.insurance && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {formData.insurance.name}
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {formData.type && (
                <Alert severity="info" sx={{ mb: 3 }}>
                  Suggested price range for {formData.type} vehicles in your area: ₹
                  {getSuggestedPrice()?.min} - ₹{getSuggestedPrice()?.max} per day
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Price per Day"
                name="pricePerDay"
                type="number"
                value={formData.pricePerDay}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                error={!!errors.pricePerDay}
                helperText={errors.pricePerDay}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Minimum Rental Days"
                name="minimumDays"
                type="number"
                value={formData.minimumDays}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Available From"
                name="availableFrom"
                type="date"
                value={formData.availableFrom}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                error={!!errors.availableFrom}
                helperText={errors.availableFrom}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Available To"
                name="availableTo"
                type="date"
                value={formData.availableTo}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                error={!!errors.availableTo}
                helperText={errors.availableTo}
              />
            </Grid>
          </Grid>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        List Your Car
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Earn money by sharing your car with others in your community
      </Typography>

      <Paper sx={{ p: 4, mt: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {getStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" onClick={handleSubmit}>
              Submit Listing
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default PeerToPeer; 