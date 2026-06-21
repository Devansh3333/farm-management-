// Weather Controller - Handles weather forecast operations with OpenWeather API
const Weather = require('../models/weatherModel');
const axios = require('axios');

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const OPENWEATHER_API_URL = process.env.OPENWEATHER_API_URL || 'https://api.openweathermap.org/data/2.5';

// Fetch current weather from OpenWeather API
exports.getWeatherByLocation = async (req, res) => {
  try {
    const { location } = req.params;
    
    if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === 'your_openweather_api_key') {
      return res.status(400).json({ 
        error: 'OpenWeather API key not configured',
        message: 'Please set OPENWEATHER_API_KEY in .env file'
      });
    }

    const response = await axios.get(`${OPENWEATHER_API_URL}/weather`, {
      params: {
        q: location,
        appid: OPENWEATHER_API_KEY,
        units: 'metric'
      }
    });

    const { main, weather, wind, clouds, dt } = response.data;
    
    const weatherData = {
      location: response.data.name,
      temperature: main.temp,
      feelsLike: main.feels_like,
      humidity: main.humidity,
      pressure: main.pressure,
      windSpeed: wind.speed,
      windDirection: wind.deg,
      cloudiness: clouds.all,
      condition: weather[0].main,
      description: weather[0].description,
      icon: weather[0].icon,
      timestamp: new Date(dt * 1000)
    };

    res.json(weatherData);
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Fetch weather forecast (5-day) from OpenWeather API
exports.getWeatherForecast = async (req, res) => {
  try {
    const { location } = req.params;
    
    if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === 'your_openweather_api_key') {
      return res.status(400).json({ 
        error: 'OpenWeather API key not configured',
        message: 'Please set OPENWEATHER_API_KEY in .env file'
      });
    }

    const response = await axios.get(`${OPENWEATHER_API_URL}/forecast`, {
      params: {
        q: location,
        appid: OPENWEATHER_API_KEY,
        units: 'metric'
      }
    });

    const forecasts = response.data.list.map(item => ({
      temperature: item.main.temp,
      feelsLike: item.main.feels_like,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      condition: item.weather[0].main,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      timestamp: new Date(item.dt * 1000)
    }));

    res.json({
      location: response.data.city.name,
      forecast: forecasts
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.getAllForecasts = (req, res) => {
  try {
    const forecasts = Weather.findAll();
    res.json(forecasts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getForecastById = (req, res) => {
  try {
    const forecast = Weather.findById(req.params.id);
    if (!forecast) {
      return res.status(404).json({ error: 'Forecast not found' });
    }
    res.json(forecast);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getForecastsByFarmId = (req, res) => {
  try {
    const forecasts = Weather.findByFarmId(req.params.farmId);
    if (forecasts.length === 0) {
      return res.status(404).json({ error: 'No forecasts found for this farm' });
    }
    res.json(forecasts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLatestForecastByFarmId = (req, res) => {
  try {
    const forecast = Weather.getLatestByFarmId(req.params.farmId);
    if (!forecast) {
      return res.status(404).json({ error: 'No forecast found for this farm' });
    }
    res.json(forecast);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getForecastsByLocation = (req, res) => {
  try {
    const forecasts = Weather.findByLocation(req.params.location);
    if (forecasts.length === 0) {
      return res.status(404).json({ error: 'No forecasts found for this location' });
    }
    res.json(forecasts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createForecast = (req, res) => {
  try {
    const { farmId, location, temperature, humidity, condition } = req.body;
    if (!farmId || !location || temperature === undefined || humidity === undefined || !condition) {
      return res.status(400).json({ error: 'FarmId, location, temperature, humidity, and condition are required' });
    }
    const newForecast = Weather.create({ farmId, location, temperature, humidity, condition, ...req.body });
    res.status(201).json(newForecast);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateForecast = (req, res) => {
  try {
    const updated = Weather.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Forecast not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteForecast = (req, res) => {
  try {
    const deleted = Weather.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Forecast not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
