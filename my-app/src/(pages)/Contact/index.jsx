import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  AccessTime,
} from '@mui/icons-material';

const contactInfo = [
  {
    icon: <Phone />,
    title: 'Phone',
    details: ['+1 (555) 123-4567', '+1 (555) 765-4321'],
  },
  {
    icon: <Email />,
    title: 'Email',
    details: ['support@drive.com', 'info@drive.com'],
  },
  {
    icon: <LocationOn />,
    title: 'Location',
    details: ['123 Business Street', 'New York, NY 10001'],
  },
  {
    icon: <AccessTime />,
    title: 'Business Hours',
    details: ['Mon - Fri: 9AM - 6PM', 'Sat - Sun: 10AM - 4PM'],
  },
];

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 6, md: 8 },
          pb: { xs: 8, md: 12 },
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 2,
              background: 'linear-gradient(45deg, #0084FF, #00B4FF)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
            }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}
          >
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </Typography>
        </Container>
      </Box>

      {/* Contact Info & Form Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Typography variant="h4" sx={{ mb: 4 }}>
              Get in Touch
            </Typography>
            <Stack spacing={3}>
              {contactInfo.map((info, index) => (
                <Card key={index} className="card-hover">
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          color: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {info.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {info.title}
                        </Typography>
                        {info.details.map((detail, idx) => (
                          <Typography key={idx} variant="body2" color="text.secondary">
                            {detail}
                          </Typography>
                        ))}
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Card
              component="form"
              onSubmit={handleSubmit}
              className="glass-effect"
              sx={{ p: 4 }}
            >
              <Typography variant="h4" sx={{ mb: 4 }}>
                Send Message
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    required
                    type="email"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    required
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    className="button-hover"
                    fullWidth
                    sx={{ py: 1.5 }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Contact; 