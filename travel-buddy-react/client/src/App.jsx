import { Box, Button, Container, CssBaseline, Tab, Tabs, ThemeProvider, Typography, createTheme } from '@mui/material'
import React, { useState } from 'react'
import CitiesList from './components/CitiesList'
import Countries from './components/Countries'
import Layout from './components/Layout'
import Places from './components/Places'

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCityId, setSelectedCityId] = useState(null);
    const [activeTab, setActiveTab] = useState(0);

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setSelectedCityId(null); // Reset city selection when country changes
      };
      const handleCitySelect = (cityId) => {
        setSelectedCityId(cityId);
      };

      const handleBackToCountries = () => {
        setSelectedCountry(null);
        setSelectedCityId(null);
      };
      const handleBackToCities = () => {
        setSelectedCityId(null);
      };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Container maxWidth="lg">
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            centered
            sx={{ mb: 3 }}
          >
            <Tab label="Countries" />
            <Tab label="Find Places" />
          </Tabs>

          {activeTab === 0 ? (
            // Countries Tab
            !selectedCountry ? (
              <Countries onCountrySelect={handleCountrySelect} />
            ) : (
              <Box>
                <Button 
                  variant="outlined" 
                  onClick={handleBackToCountries}
                  sx={{ mb: 2 }}
                >
                  Back to Countries
                </Button>
                <Typography variant="h4" gutterBottom>
                  {selectedCountry.name.common}
                </Typography>
                {!selectedCityId ? (
                  <CitiesList 
                    countryCode={selectedCountry.cca2} 
                    onCitySelect={handleCitySelect} 
                  />
                ) : (
                  <>
                    <Button 
                      variant="outlined" 
                      onClick={handleBackToCities}
                      sx={{ mb: 2 }}
                    >
                      Back to Cities
                    </Button>
                    <CityDetails cityId={selectedCityId} />
                  </>
                )}
              </Box>
            )
          ) : (
            // Places Tab
            <Places />
          )}
        </Container>
      </Layout>
    </ThemeProvider>
  );
};

export default App;