const express = require('express');
const router = express.Router();
const WeatherController = require('../controllers/weatherController');

const weatherController = new WeatherController();

router.get('/weather/:city', weatherController.getWeather);

module.exports = router;