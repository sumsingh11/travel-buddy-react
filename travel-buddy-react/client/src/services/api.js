const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const fetchCountries = async () => {
    const response = await fetch(`${API_BASE_URL}/all`);
    if (!response.ok) {
        throw new Error('Failed to fetch countries data');
    }
    return response.json();
};

export const fetchCitiesByCountry = async (countryCode) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_COUNTRIES_API_KEY,
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    };

    const response = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=${countryCode}&minPopulation=100000&limit=10&sort=-population`,
        options
    );

    if (!response.ok) {
        throw new Error('Failed to fetch cities data');
    }
    
    return response.json();
};

export const fetchCityDetails = async (cityId) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_COUNTRIES_API_KEY,
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    };

    const response = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${cityId}`,
        options
    );

    if (!response.ok) {
        throw new Error('Failed to fetch city details');
    }
    
    return response.json();
};
export const fetchNearbyPlaces = async (city, radius = 10) => {
    // First, get the coordinates of the search city
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_COUNTRIES_API_KEY,
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    };

    // First find the city coordinates
    const cityResponse = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${encodeURIComponent(city)}&limit=1`,
        options
    );

    if (!cityResponse.ok) {
        throw new Error('Failed to find the city');
    }
    
    const cityData = await cityResponse.json();
    
    if (!cityData.data || cityData.data.length === 0) {
        throw new Error('City not found');
    }

    const searchCity = cityData.data[0];
    
    // Now search for cities near this location - Fix the URL format with proper comma
    const nearbyResponse = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${searchCity.latitude},${searchCity.longitude}/nearbyCities?radius=${radius}&limit=20&minPopulation=50000`,
        options
    );

    if (!nearbyResponse.ok) {
        if (nearbyResponse.status === 429) {
            throw new Error('API rate limit exceeded. Please try again in a few moments.');
        }
        throw new Error('Failed to fetch nearby places');
    }
    
    return nearbyResponse.json();
};