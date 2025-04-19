# Travel Buddy – Smart Travel Planner Backend

## Overview
The Travel Buddy backend is built using Node.js and Express. It serves as the server-side application that handles API requests for weather data, places of interest, and country information. The backend interacts with external APIs such as OpenWeatherMap, Foursquare Places, and REST Countries to provide users with relevant travel information.

## Features
- Fetch current weather data using the OpenWeatherMap API.
- Retrieve nearby attractions using the Foursquare Places API.
- Access country-related information through the REST Countries API.

## Setup Instructions
1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd travel-buddy/backend
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the backend directory and add your API keys:
   ```
   OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
   FOURSQUARE_CLIENT_ID=your_foursquare_client_id
   FOURSQUARE_CLIENT_SECRET=your_foursquare_client_secret
   ```

4. **Run the application:**
   ```
   npm start
   ```

## API Endpoints
- **Weather**
  - `GET /api/weather`: Fetch current weather data for a specified location.

- **Places**
  - `GET /api/places`: Retrieve nearby attractions based on user location.

- **Countries**
  - `GET /api/countries`: Get information about countries.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.