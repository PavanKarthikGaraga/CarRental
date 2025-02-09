import { Box, Container, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { SentimentVeryDissatisfied } from '@mui/icons-material';

function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center' }}>
          <SentimentVeryDissatisfied
            sx={{
              fontSize: 120,
              color: 'primary.main',
              mb: 4,
              animation: 'bounce 2s infinite',
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '4rem', md: '6rem' },
              fontWeight: 700,
              background: 'linear-gradient(45deg, #0084FF, #00B4FF)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            404
          </Typography>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 600,
            }}
          >
            Page Not Found
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            The page you're looking for doesn't exist or has been moved.
          </Typography>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            size="large"
            className="button-hover"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: '50px',
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Container>

      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-30px);
            }
            60% {
              transform: translateY(-15px);
            }
          }
        `}
      </style>
    </Box>
  );
}

export default NotFound; 