const axios = require('axios');

const REST_COUNTRIES_API_URL = 'https://restcountries.com/v3.1/all';

const getCountries = async () => {
    try {
        const response = await axios.get(REST_COUNTRIES_API_URL);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching countries data: ' + error.message);
    }
};

const getCountryByName = async (name) => {
    try {
        const response = await axios.get(`${REST_COUNTRIES_API_URL}/name/${name}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching country data: ' + error.message);
    }
};

module.exports = {
    getCountries,
    getCountryByName
};