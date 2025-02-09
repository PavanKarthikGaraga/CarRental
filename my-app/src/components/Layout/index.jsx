import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  InputBase,
  useMediaQuery,
  useTheme,
  MenuItem,
  Tooltip,
  Fade,
  Badge,
} from '@mui/material';
import {
  Search as SearchIcon,
  AccountCircle,
  Language,
  Notifications,
  KeyboardArrowDown,
  LocationOn,
  DirectionsCar,
  CalendarToday,
  Info,
  ContactSupport,
  Favorite,
  Settings,
  ExitToApp,
  Dashboard,
} from '@mui/icons-material';

const pages = [
  { title: 'Browse Cars', path: '/cars', icon: <DirectionsCar /> },
  { title: 'About Us', path: '/about', icon: <Info /> },
  { title: 'Contact', path: '/contact', icon: <ContactSupport /> },
];

const userMenuItems = [
  { title: 'My Dashboard', path: '/dashboard', icon: <Dashboard /> },
  { title: 'My Bookings', path: '/dashboard/bookings', icon: <CalendarToday /> },
  { title: 'Saved Cars', path: '/dashboard/favorites', icon: <Favorite /> },
  { title: 'Settings', path: '/dashboard/settings', icon: <Settings /> },
  { title: 'Logout', path: '/logout', icon: <ExitToApp /> },
];

function Layout({ children }) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar
        className={isScrolled ? 'glass-effect' : ''}
        sx={{
          background: isScrolled ? 'rgba(10, 13, 17, 0.9)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: isScrolled ? '64px' : '80px',
              transition: 'min-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              className="hover-scale"
              sx={{
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isScrolled ? '1.25rem' : '1.5rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <span className="text-gradient">Drive</span>
            </Typography>

            {!isMobile && (
              <Fade in={true} timeout={1000}>
                <Box
                  sx={{
                    position: 'relative',
                    maxWidth: 400,
                    width: '100%',
                    mx: 3,
                  }}
                >
                  <Box
                    className={searchFocused ? 'glass-effect' : ''}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: searchFocused ? 'rgba(26, 29, 33, 0.8)' : 'background.paper',
                      borderRadius: 2,
                      px: 2,
                      transition: 'all 0.2s ease',
                      border: '1px solid',
                      borderColor: searchFocused ? 'primary.main' : 'transparent',
                    }}
                  >
                    <SearchIcon sx={{ color: searchFocused ? 'primary.main' : 'text.secondary', mr: 1 }} />
                    <InputBase
                      placeholder="Search vehicles..."
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                      sx={{
                        flex: 1,
                        py: 1,
                        '& input': {
                          transition: 'all 0.2s ease',
                          '&::placeholder': {
                            opacity: 0.7,
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Fade>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, ml: 'auto' }}>
              {pages.map((page) => (
                <Button
                  key={page.path}
                  component={RouterLink}
                  to={page.path}
                  startIcon={page.icon}
                  className="hover-scale"
                  sx={{
                    color: 'text.primary',
                    opacity: location.pathname === page.path ? 1 : 0.7,
                    position: 'relative',
                    '&:hover': {
                      opacity: 1,
                      '&::after': {
                        width: '100%',
                      },
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -2,
                      left: 0,
                      width: location.pathname === page.path ? '100%' : '0%',
                      height: 2,
                      backgroundColor: 'primary.main',
                      transition: 'width 0.2s ease',
                    },
                  }}
                >
                  {page.title}
                </Button>
              ))}
              
              <Button
                component={RouterLink}
                to="/list-your-car"
                variant="contained"
                className="button-hover"
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                List your car
              </Button>

              <Tooltip title="Change language">
                <IconButton color="inherit" className="hover-scale">
                  <Language />
                </IconButton>
              </Tooltip>

              <Tooltip title="Notifications">
                <IconButton className="hover-scale">
                  <Badge badgeContent={3} color="primary">
                    <Notifications />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Account settings">
                  <Button
                    onClick={handleOpenUserMenu}
                    className="hover-scale"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: 'inherit',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: 'primary.main',
                        fontWeight: 600,
                      }}
                    >
                      J
                    </Avatar>
                    <KeyboardArrowDown
                      sx={{
                        transition: 'transform 0.2s ease',
                        transform: Boolean(anchorElUser) ? 'rotate(180deg)' : 'rotate(0)',
                      }}
                    />
                  </Button>
                </Tooltip>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  onClick={handleCloseUserMenu}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={{
                    elevation: 0,
                    className: 'glass-effect',
                    sx: {
                      mt: 1.5,
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                >
                  {userMenuItems.map((item) => (
                    <MenuItem
                      key={item.path}
                      component={RouterLink}
                      to={item.path}
                      className="hover-scale"
                      sx={{
                        minWidth: 180,
                        '&:hover': {
                          backgroundColor: 'background.lighter',
                        },
                      }}
                    >
                      <Typography textAlign="center">{item.title}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 7, sm: 8 },
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Layout; 