const axios = require('axios');

const API_KEY = process.env.OPENWEATHERMAP_API_KEY; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getWeatherByCity = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching weather data: ' + error.message);
    }
};

const getWeatherByCoordinates = async (lat, lon) => {
    try {
        const response = await axios.get(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching weather data: ' + error.message);
    }
};

module.exports = {
    getWeatherByCity,
    getWeatherByCoordinates,
};