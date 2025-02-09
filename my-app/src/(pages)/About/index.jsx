import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
} from '@mui/material';
import {
  Speed,
  Security,
  EmojiTransportation,
  SupportAgent,
} from '@mui/icons-material';

const features = [
  {
    icon: <Speed sx={{ fontSize: 40 }} />,
    title: 'Fast & Easy Booking',
    description: 'Book your dream car in minutes with our streamlined process.',
  },
  {
    icon: <Security sx={{ fontSize: 40 }} />,
    title: 'Secure & Reliable',
    description: 'All cars are fully insured and regularly maintained for your safety.',
  },
  {
    icon: <EmojiTransportation sx={{ fontSize: 40 }} />,
    title: 'Wide Selection',
    description: 'Choose from our extensive collection of premium vehicles.',
  },
  {
    icon: <SupportAgent sx={{ fontSize: 40 }} />,
    title: '24/7 Support',
    description: 'Our dedicated team is always here to help you.',
  },
];

const team = [
  {
    name: 'John Smith',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200',
  },
  {
    name: 'Sarah Johnson',
    role: 'Operations Director',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200',
  },
  {
    name: 'Michael Chen',
    role: 'Fleet Manager',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200',
  },
];

function About() {
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
            About Drive
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}
          >
            We're revolutionizing the car rental experience with premium vehicles and exceptional service.
          </Typography>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                className="card-hover"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {feature.icon}
                </Box>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Team Section */}
      <Box sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom>
            Our Team
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            Meet the people behind Drive
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {team.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  className="card-hover"
                  sx={{
                    textAlign: 'center',
                    p: 3,
                  }}
                >
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    sx={{
                      width: 120,
                      height: 120,
                      mx: 'auto',
                      mb: 2,
                      border: '4px solid',
                      borderColor: 'primary.main',
                    }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.role}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default About; 