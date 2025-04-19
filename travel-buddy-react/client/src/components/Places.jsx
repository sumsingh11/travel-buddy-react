import LocationOnIcon from '@mui/icons-material/LocationOn'
import PersonIcon from '@mui/icons-material/Person'
import PublicIcon from '@mui/icons-material/Public'
import SearchIcon from '@mui/icons-material/Search'
import TerrainIcon from '@mui/icons-material/Terrain'
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Grid,
    InputAdornment,
    Paper,
    TextField,
    Typography
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { fetchNearbyPlaces } from '../services/api'

const Places = () => {
  const [city, setCity] = useState('');
  const [radius, setRadius] = useState(100);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSearchDisabled, setIsSearchDisabled] = useState(false);
  const searchTimeoutRef = useRef(null);

  // Clear timeout on component unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // This function is explicitly called only when search button is clicked
  const handleSearchClick = async (e) => {
    e.preventDefault();
    
    // Validate input before proceeding
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }
    
    // Prevent search if already searching or in cooldown
    if (isSearchDisabled || loading) {
      return;
    }

    try {
      // Clear previous results and set loading state
      setLoading(true);
      setError(null);
      setPlaces([]);
      
      // Disable search button temporarily to prevent spam
      setIsSearchDisabled(true);
      
      // Call API only after explicit search button click
      console.log('Calling API for city:', city.trim());
      const data = await fetchNearbyPlaces(city.trim(), radius);
      console.log('API response:', data);
      
      if (data && data.data) {
        setPlaces(data.data);
      } else {
        setPlaces([]);
      }
    } catch (err) {
      console.error('Error fetching nearby places:', err);
      // User-friendly error messages
      if (err.message.includes('rate limit')) {
        setError('You\'ve reached the API rate limit. Please wait a moment and try again.');
      } else if (err.message.includes('City not found')) {
        setError(`We couldn't find the city "${city}". Please check the spelling and try again.`);
      } else {
        setError('Failed to find nearby places. Please try again.');
      }
    } finally {
      setLoading(false);
      
      // Re-enable search after a delay
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      
      searchTimeoutRef.current = setTimeout(() => {
        setIsSearchDisabled(false);
      }, 2000); // 2-second cooldown
    }
  };

  // Clear error when user types
  const handleCityChange = (e) => {
    setCity(e.target.value);
    if (error) setError(null);
  };

  // Ensure radius is a valid number
  const handleRadiusChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setRadius(Math.max(1, Math.min(1000, value)));
  };

  console.log({ places, city, radius });

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Explore Nearby Places
      </Typography>
      
      {/* Form is only submitted when search button is clicked */}
      <Paper component="form" onSubmit={handleSearchClick} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Enter City"
              value={city}
              onChange={handleCityChange}
              placeholder="e.g., London, New York, Tokyo"
              error={Boolean(error && error.includes("enter a city"))}
              helperText={error && error.includes("enter a city") ? error : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Radius (km)"
              value={radius}
              onChange={handleRadiusChange}
              InputProps={{
                inputProps: { min: 1, max: 1000 },
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button 
              fullWidth
              variant="contained" 
              color="primary" 
              type="submit"
              startIcon={<SearchIcon />}
              disabled={loading || isSearchDisabled || !city.trim()}
              sx={{ height: '56px' }}
            >
              {loading ? 'Searching...' : (isSearchDisabled ? 'Please wait...' : 'Search')}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {error && !error.includes("enter a city") && (
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
      )}

      {!loading && places.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom>
            Found {places.length} places near {city}
          </Typography>
          
          <Grid container spacing={3}>
            {places.map((place) => (
              <Grid item xs={12} sm={6} md={4} key={place.id}>
                <Card sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {place.name}
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PublicIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2">
                        {place.country}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <TerrainIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2">
                        Distance: {Math.round(place.distance)} km
                      </Typography>
                    </Box>
                    {place.population && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="body2">
                          Population: {place.population.toLocaleString()}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

    {!loading && places.length === 0 && !error && city.trim() !== '' && (
        <Alert severity="info">No places found near {city} within {radius} km radius.</Alert>
      )}
    </Box>
  );
};

export default Places;