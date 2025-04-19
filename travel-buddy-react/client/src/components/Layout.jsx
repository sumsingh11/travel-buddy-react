import CloseIcon from '@mui/icons-material/Close'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import MenuIcon from '@mui/icons-material/Menu'
import PlaceIcon from '@mui/icons-material/Place'
import PublicIcon from '@mui/icons-material/Public'
import TwitterIcon from '@mui/icons-material/Twitter'
import {
    AppBar,
    Box,
    Button,
    Container,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material'
import React, { useState } from 'react'

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = [
    { name: 'Countries', icon: <PublicIcon /> },
    { name: 'Find Places', icon: <PlaceIcon /> }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: <GitHubIcon />, url: 'https://github.com' },
    { name: 'LinkedIn', icon: <LinkedInIcon />, url: 'https://linkedin.com' },
    { name: 'Twitter', icon: <TwitterIcon />, url: 'https://twitter.com' },
  ];

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6" component="div">
          Travel Buddy
        </Typography>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.name}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <FlightTakeoffIcon sx={{ mr: 1.5 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Travel Buddy
          </Typography>
          
          {!isMobile && (
            <Box sx={{ display: 'flex' }}>
              {navItems.map((item) => (
                <Button 
                  key={item.name} 
                  color="inherit" 
                  startIcon={item.icon}
                  sx={{ mx: 1 }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawer}
      </Drawer>
      
      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          backgroundColor: (theme) => theme.palette.grey[50],
          py: 4
        }}
      >
        {children}
      </Box>
      
      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[200],
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'center', md: 'flex-start' } }}>
            <Box sx={{ mb: { xs: 3, md: 0 }, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h6" gutterBottom>
                Travel Buddy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your companion for exploring the world
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                &copy; {new Date().getFullYear()} Travel Buddy. All rights reserved.
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle1" gutterBottom sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                Connect with us
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {socialLinks.map((link) => (
                  <IconButton 
                    key={link.name} 
                    aria-label={link.name}
                    color="primary"
                    component="a"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;