const axios = require('axios');

const FOURSQUARE_API_URL = 'https://api.foursquare.com/v2/venues/explore';
const CLIENT_ID = process.env.FOURSQUARE_CLIENT_ID; 
const CLIENT_SECRET = process.env.FOURSQUARE_CLIENT_SECRET; 
const VERSION = '20230101'; 

const getNearbyPlaces = async (latitude, longitude) => {
    try {
        const response = await axios.get(FOURSQUARE_API_URL, {
            params: {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                v: VERSION,
                ll: `${latitude},${longitude}`,
                limit: 10
            }
        });
        return response.data.response.groups[0].items;
    } catch (error) {
        throw new Error('Error fetching nearby places: ' + error.message);
    }
};

module.exports = {
    getNearbyPlaces
};