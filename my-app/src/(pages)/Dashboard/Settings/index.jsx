import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Switch,
  Divider,
  Stack,
  Avatar,
  IconButton,
  Alert,
} from '@mui/material';
import {
  AccountCircle,
  Notifications,
  Security,
  Language,
  CameraAlt,
  Delete,
} from '@mui/icons-material';

function Settings() {
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
  });
  const [saved, setSaved] = useState(false);

  const handleNotificationChange = (event) => {
    setNotifications({
      ...notifications,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your account settings and preferences
          </Typography>
        </Box>

        {/* Success Alert */}
        {saved && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Settings saved successfully!
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Profile Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Box sx={{ position: 'relative', display: 'inline-block' }}>
                    <Avatar
                      src={profileImage}
                      sx={{ width: 120, height: 120, mb: 2 }}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        bgcolor: 'background.paper',
                        '&:hover': { bgcolor: 'background.paper' },
                      }}
                    >
                      <CameraAlt />
                    </IconButton>
                  </Box>
                  <Typography variant="h6">John Smith</Typography>
                  <Typography variant="body2" color="text.secondary">
                    john.smith@example.com
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  startIcon={<Delete />}
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Settings Sections */}
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              {/* Personal Information */}
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccountCircle /> Personal Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        defaultValue="John"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        defaultValue="Smith"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        defaultValue="john.smith@example.com"
                        type="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone"
                        defaultValue="+1 (555) 123-4567"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Notifications /> Notifications
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle1">Email Notifications</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Receive booking updates and reminders
                        </Typography>
                      </Box>
                      <Switch
                        checked={notifications.email}
                        onChange={handleNotificationChange}
                        name="email"
                      />
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle1">Push Notifications</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Receive notifications on your device
                        </Typography>
                      </Box>
                      <Switch
                        checked={notifications.push}
                        onChange={handleNotificationChange}
                        name="push"
                      />
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle1">Marketing Emails</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Receive offers and updates from us
                        </Typography>
                      </Box>
                      <Switch
                        checked={notifications.marketing}
                        onChange={handleNotificationChange}
                        name="marketing"
                      />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {/* Security */}
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Security /> Security
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Current Password"
                        type="password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="New Password"
                        type="password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Confirm New Password"
                        type="password"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Language /> Preferences
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        select
                        label="Language"
                        defaultValue="en"
                        SelectProps={{
                          native: true,
                        }}
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        select
                        label="Currency"
                        defaultValue="usd"
                        SelectProps={{
                          native: true,
                        }}
                      >
                        <option value="usd">USD ($)</option>
                        <option value="eur">EUR (€)</option>
                        <option value="gbp">GBP (£)</option>
                      </TextField>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>

        {/* Save Button */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSave}
            className="button-hover"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: '50px',
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Settings; 