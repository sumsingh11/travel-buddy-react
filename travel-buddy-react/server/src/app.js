const express = require('express');
const weatherRoutes = require('./routes/weatherRoutes');
const placesRoutes = require('./routes/placesRoutes');
const countriesRoutes = require('./routes/countriesRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/places', placesRoutes);
app.use('/api/countries', countriesRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});