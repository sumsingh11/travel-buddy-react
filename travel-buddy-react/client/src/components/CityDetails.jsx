import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PersonIcon from '@mui/icons-material/Person'
import PublicIcon from '@mui/icons-material/Public'
import TerrainIcon from '@mui/icons-material/Terrain'
import TimelapseIcon from '@mui/icons-material/Timelapse'
import {
    Alert,
    Box,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Grid,
    Paper,
    Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { fetchCityDetails } from '../services/api'

const CityDetails = ({ cityId }) => {
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCityDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchCityDetails(cityId);
        setCityData(data.data);
      } catch (err) {
        console.error('Error fetching city details:', err);
        setError('Failed to load city details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (cityId) {
      getCityDetails();
    }
  }, [cityId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!cityData) {
    return <Alert severity="info">No details available for this city.</Alert>;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h4" gutterBottom>
        {cityData.name}
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PublicIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body1">
                  Country: {cityData.country}, Region: {cityData.region}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body1">
                  Population: {cityData.population.toLocaleString()}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body1">
                  Coordinates: {cityData.latitude.toFixed(4)}, {cityData.longitude.toFixed(4)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Additional Details
              </Typography>
              
              {cityData.timezone && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TimelapseIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="body1">
                    Timezone: {cityData.timezone}
                  </Typography>
                </Box>
              )}
              
              {cityData.currencyCode && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CurrencyExchangeIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="body1">
                    Currency: {cityData.currencyCode} ({cityData.currencyName})
                  </Typography>
                </Box>
              )}
              
              {cityData.elevationMeters && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TerrainIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="body1">
                    Elevation: {cityData.elevationMeters} meters
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CityDetails;