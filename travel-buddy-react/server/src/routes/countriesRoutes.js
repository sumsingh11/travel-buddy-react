const express = require('express');
const router = express.Router();
const CountriesController = require('../controllers/countriesController');

const countriesController = new CountriesController();

// Define route for fetching country information
router.get('/', countriesController.getCountries.bind(countriesController));

module.exports = router;