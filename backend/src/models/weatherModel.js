// Weather Model - For tracking weather forecasts
class Weather {
  static forecasts = [];
  static id = 1;

  static create(data) {
    const forecast = {
      id: this.id++,
      farmId: data.farmId,
      location: data.location,
      date: data.date || new Date(),
      temperature: data.temperature, // celsius
      humidity: data.humidity, // percentage
      rainfall: data.rainfall || 0, // mm
      windSpeed: data.windSpeed, // km/h
      condition: data.condition, // sunny, rainy, cloudy, etc
      uvIndex: data.uvIndex || null,
      forecast7Days: data.forecast7Days || [],
      createdAt: new Date(),
    };
    this.forecasts.push(forecast);
    return forecast;
  }

  static findAll() {
    return this.forecasts;
  }

  static findById(id) {
    return this.forecasts.find(w => w.id === parseInt(id));
  }

  static findByFarmId(farmId) {
    return this.forecasts.filter(w => w.farmId === parseInt(farmId));
  }

  static findByLocation(location) {
    return this.forecasts.filter(w => w.location.toLowerCase() === location.toLowerCase());
  }

  static getLatestByFarmId(farmId) {
    const farmForecasts = this.findByFarmId(farmId);
    return farmForecasts.length > 0 ? farmForecasts[farmForecasts.length - 1] : null;
  }

  static update(id, data) {
    const forecast = this.findById(id);
    if (!forecast) return null;
    Object.assign(forecast, data, { id: forecast.id, createdAt: forecast.createdAt });
    return forecast;
  }

  static delete(id) {
    const index = this.forecasts.findIndex(w => w.id === parseInt(id));
    if (index === -1) return false;
    this.forecasts.splice(index, 1);
    return true;
  }
}

module.exports = Weather;
