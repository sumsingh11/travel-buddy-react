# Travel Buddy – Smart Travel Planner

## Overview
Travel Buddy is a modern React application that helps travelers explore countries, cities, and locations around the world. The app integrates with multiple external APIs to provide comprehensive travel information including country details, city data, and weather forecasts.

## Features
- **Country Explorer**: Browse countries with their flags and basic information using the REST Countries API
- **City Information**: View major cities for each country with population and regional data via the GeoDB Cities API
- **Nearby Places**: Discover cities near any location within a specified radius
- **Responsive Design**: Optimized for both desktop and mobile devices with Material-UI components

## Project Structure
```
travel-buddy-react/
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── CitiesList.jsx
│   │   │   ├── CityDetails.jsx
│   │   │   ├── Countries.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Places.jsx
│   │   │   └── CityWeather.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── package.json
│   └── .env
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── countriesController.js
│   │   │   ├── placesController.js
│   │   │   └── weatherController.js
│   │   ├── routes/
│   │   │   ├── countriesRoutes.js
│   │   │   ├── placesRoutes.js
│   │   │   └── weatherRoutes.js
│   │   ├── services/
│   │   │   ├── restCountriesService.js
│   │   │   ├── foursquareService.js
│   │   │   └── openWeatherMapService.js
│   │   ├── utils/
│   │   │   └── apiHelper.js
│   │   └── app.js
│   ├── package.json
│   └── README.md
└── README.md
```

## Setup Instructions

### Prerequisites
1. Node.js (v14 or newer)
2. npm or yarn package manager
3. API keys for:
   a. OpenWeatherMap API
   b. RapidAPI GeoDB Cities

### Client Setup
1. Navigate to the client directory:
   ```
   cd travel-buddy-react/client
   ```
2. Install dependencies:
   ```
   npm install --legacy-peer-deps
   ```
3. Create a .env file with your API keys:
   ```
   REACT_APP_API_BASE_URL=your-base-url
   REACT_APP_WEATHER_API_KEY=your_openweathermap_key
   REACT_APP_RAPID_COUNTRIES_API_KEY=your_rapidapi_key
   ```
3. Start the development server:
   ```
   npm start
   ```

Server Setup
1. Navigate to the server directory:
```
cd travel-buddy-react/server
```
2. Install dependencies:
```
npm install
```
3. Start the server:
```
npm start
```
Or for development with auto-restart:
```
npm run dev
```

## Usage

### Client Implementation
#### Countries Tab
- Browse all countries sorted alphabetically
- Click on a country card to see major cities within that country
- Each city listing shows population and regional information
- Click the info icon to view detailed information about a city
- Click the weather icon to check current weather conditions

#### Places Tab
- Search for any city in the world
- Set a radius to find nearby cities
- View results with population and distance information
- Each search is executed only when you click the search button

#### Rate Limit
The app uses free API tiers with rate limits:
- GeoDB Cities API: 1 request per second, 1000 requests per day
- Error handling is in place to notify when rate limits are reached

### Server Implementation
#### Countries API
- GET /api/countries: Get a list of all countries with basic information
Returns country names, flags, population, and region data

#### Places API
- GET /api/places/nearby: Retrieve nearby attractions based on latitude and longitude
Required query parameters: latitude and longitude
Returns a list of places with names, locations, and other details

## Technologies Used
- React: Frontend library for building the user interface
- Material-UI: Component library for consistent, responsive design
- REST Countries API: For country data
- GeoDB Cities API: For city and geographic data

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.