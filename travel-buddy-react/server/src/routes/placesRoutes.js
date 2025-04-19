const express = require('express');
const router = express.Router();
const PlacesController = require('../controllers/placesController');

const placesController = new PlacesController();

// Route to get nearby attractions
router.get('/nearby', placesController.getPlaces.bind(placesController));

module.exports = router;