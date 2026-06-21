// Weather Routes
const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// OpenWeather API routes
router.get('/api/current/:location', weatherController.getWeatherByLocation);
router.get('/api/forecast/:location', weatherController.getWeatherForecast);

// Local database routes
router.get('/', weatherController.getAllForecasts);
router.get('/:id', weatherController.getForecastById);
router.get('/farm/:farmId', weatherController.getForecastsByFarmId);
router.get('/farm/:farmId/latest', weatherController.getLatestForecastByFarmId);
router.get('/location/:location', weatherController.getForecastsByLocation);
router.post('/', weatherController.createForecast);
router.put('/:id', weatherController.updateForecast);
router.delete('/:id', weatherController.deleteForecast);

module.exports = router;
