import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = ({ location }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const { lat, lon } = location;
        const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

        const currentResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        setCurrentWeather(currentResponse.data);

        const hourlyResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        setHourlyForecast(hourlyResponse.data.list.slice(0, 24)); 

        const dailyResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${apiKey}&units=metric`);
        setDailyForecast(dailyResponse.data.list);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  return (
    <div className="weather">
      {currentWeather && (
        <div className="current-weather">
          <h3>Current Weather</h3>
          <p>{currentWeather.name}, {currentWeather.sys.country}</p>
          <p>Temperature: {currentWeather.main.temp}°C</p>
          <p>Description: {currentWeather.weather[0].description}</p>
          <img src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt="Weather icon" />
        </div>
      )}
      {hourlyForecast && (
        <div className="hourly-forecast">
          <h3>Hourly Forecast</h3>
          {}
        </div>
      )}
      {dailyForecast && (
        <div className="daily-forecast">
          <h3>Daily Forecast</h3>
          {}
        </div>
      )}
    </div>
  );
};

export default Weather;