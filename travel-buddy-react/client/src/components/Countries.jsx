import {
    Alert,
    Box,
    Card,
    CardActionArea,
    CardContent,
    CircularProgress,
    Grid,
    Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { fetchCountries } from '../services/api'

const Countries = ({ onCountrySelect }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchCountries();
        // Sort countries alphabetically by name
        const sortedCountries = data.sort((a, b) => 
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
        setError(null);
      } catch (err) {
        console.error('Error fetching countries:', err);
        setError('Failed to load countries. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getCountries();
  }, []);

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

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Countries
      </Typography>
      <Grid container spacing={2}>
        {countries.map((country) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={country.cca3}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 3,
                }
              }}
            >
              <CardActionArea 
                sx={{ flexGrow: 1 }}
                onClick={() => onCountrySelect(country)}
              >
                <CardContent sx={{ p: 1.5 }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      mb: 1
                    }}
                  >
                    {country.flags && (
                      <Box 
                        component="img"
                        sx={{
                          height: 24,
                          width: 36,
                          mr: 1,
                          objectFit: 'cover',
                          border: '1px solid #eee'
                        }}
                        src={country.flags.svg || country.flags.png}
                        alt={`Flag of ${country.name.common}`}
                      />
                    )}
                  </Box>
                  <Typography variant="body2" component="div">
                    {country.name.common}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Countries;