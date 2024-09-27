// src/components/Weather.js
import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const API_KEY = '42d49ef510ac7a561a08f01600ce626f';
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
    
   
    const units = 'metric';

    const fetchWeather = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=${units}`);
            setWeatherData(response.data);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'City not found. Please try again.');
            } else {
                setError('An error occurred. Please try again.');
            }
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <img 
                src="src/assets/cloud.png" 
                alt="Cloud"
                className="w-[150px] h-[150px] mb-4"
            />
            <h1 className="text-4xl font-bold mb-4">Weather App</h1>
            <form onSubmit={handleSubmit} className="flex mb-4">
                <input 
                    type="text" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="Enter city" 
                    required 
                    className="p-2 rounded-l-lg border border-gray-700 bg-gray-800 text-white"
                />
                <button 
                    type="submit" 
                    className="bg-gray-700 text-white px-4 rounded-r-lg hover:bg-gray-600 transition"
                >
                    Get Weather
                </button>
            </form>
            {loading && <p className="text-lg">Loading...</p>}
            {error && <p className="text-red-400">{error}</p>}
            {weatherData && (
                <div className="bg-gray-800 text-white rounded-lg p-4 shadow-lg mt-4">
                    <h2 className="text-2xl font-semibold">{weatherData.name}</h2>
                    <div className="flex items-center">
                        <img 
                            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                            alt={weatherData.weather[0].description}
                            className="mr-2"
                        />
                        <p className="text-xl">Temperature: {weatherData.main.temp} °C</p>
                    </div>
                    <p className="text-lg">Weather: {weatherData.weather[0].description}</p>
                    <p className="text-lg">Humidity: {weatherData.main.humidity}%</p>
                    <p className="text-lg">Wind Speed: {weatherData.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
