import CloseIcon from '@mui/icons-material/Close'
import InfoIcon from '@mui/icons-material/Info'
import {
    Alert,
    Box,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography
} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import React, { useEffect, useState } from 'react'
import { fetchCitiesByCountry } from '../services/api'
import CityDetails from './CityDetails'

const CitiesList = ({ countryCode }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    const getCities = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchCitiesByCountry(countryCode);
        console.log({ data })
        
        if (data && data.data) {
          setCities(data.data);
        } else {
          setCities([]);
        }
      } catch (err) {
        console.error('Error fetching cities:', err);
        setError('Failed to load cities. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (countryCode) {
      getCities();
    }
  }, [countryCode]);

  const handleOpenDetails = (cityId) => {
    setSelectedCityId(cityId);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

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

  if (cities.length === 0) {
    return <Typography variant="body1">No cities found for this country.</Typography>;
  }

  return (
    <>
      <Paper elevation={2} sx={{ mt: 2, mb: 4 }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Major Cities
          </Typography>
          <List>
            {cities.map((city, index) => (
              <React.Fragment key={city.id || index}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={city.name}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Population: {city.population.toLocaleString()}
                        </Typography>
                        {city.region && ` — ${city.region}`}
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end" 
                      aria-label="details"
                      onClick={() => handleOpenDetails(city.id)}
                      color="primary"
                    >
                      <InfoIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < cities.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Paper>

      {/* City Details Dialog */}
      <Dialog
        open={detailsOpen}
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">City Details</Typography>
            <IconButton aria-label="close" onClick={handleCloseDetails}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedCityId && <CityDetails cityId={selectedCityId} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CitiesList;