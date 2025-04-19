class WeatherController {
    constructor(weatherService) {
        this.weatherService = weatherService;
    }

    async getWeather(req, res) {
        const { city } = req.params;
        try {
            const weatherData = await this.weatherService.fetchWeather(city);
            res.status(200).json(weatherData);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching weather data', error: error.message });
        }
    }
}

module.exports = WeatherController;