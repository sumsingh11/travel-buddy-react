import React, { useState } from 'react';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        try {
            const response = await fetch(`/api/weather?city=${city}`);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            setWeatherData(data);
            setError('');
        } catch (err) {
            setError(err.message);
            setWeatherData(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather();
    };

    return (
        <div>
            <h2>Weather Information</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                    required
                />
                <button type="submit">Get Weather</button>
            </form>
            {error && <p>{error}</p>}
            {weatherData && (
                <div>
                    <h3>Weather in {weatherData.city}</h3>
                    <p>{weatherData.description}</p>
                </div>
            )}
        </div>
    );
};

export default Weather;