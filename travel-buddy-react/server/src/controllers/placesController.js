class PlacesController {
    constructor(foursquareService) {
        this.foursquareService = foursquareService;
    }

    async getPlaces(req, res) {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'Latitude and longitude are required' });
        }

        try {
            const places = await this.foursquareService.fetchNearbyPlaces(latitude, longitude);
            return res.status(200).json(places);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while fetching places' });
        }
    }
}
module.exports = PlacesController;
