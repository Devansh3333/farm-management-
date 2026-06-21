import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { weatherService } from '../services/api';
import '../styles/Weather.css';

function Weather() {
  const [forecasts, setForecasts] = useState([]);
  const [formData, setFormData] = useState({
    farmId: '',
    location: '',
    temperature: '',
    humidity: '',
    rainfall: '',
    windSpeed: '',
    condition: ''
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadForecasts();
  }, []);

  const loadForecasts = async () => {
    try {
      const response = await weatherService.getAll();
      setForecasts(response.data);
    } catch (error) {
      console.error('Error loading forecasts:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        farmId: parseInt(formData.farmId),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        rainfall: parseFloat(formData.rainfall) || 0,
        windSpeed: parseFloat(formData.windSpeed) || 0
      };
      await weatherService.create(data);
      setFormData({
        farmId: '',
        location: '',
        temperature: '',
        humidity: '',
        rainfall: '',
        windSpeed: '',
        condition: ''
      });
      setShowForm(false);
      loadForecasts();
    } catch (error) {
      console.error('Error creating forecast:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await weatherService.delete(id);
      loadForecasts();
    } catch (error) {
      console.error('Error deleting forecast:', error);
    }
  };

  const getWeatherIcon = (condition) => {
    const icons = {
      'sunny': '☀️',
      'rainy': '🌧️',
      'cloudy': '☁️',
      'partly cloudy': '⛅',
      'stormy': '⛈️',
      'foggy': '🌫️',
      'windy': '💨'
    };
    return icons[condition?.toLowerCase()] || '🌤️';
  };

  return (
    <Container fluid className="weather-container py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="page-title">🌤️ Weather Forecasting</h1>
        </Col>
        <Col md={2}>
          <Button 
            variant="success" 
            onClick={() => setShowForm(!showForm)}
            className="w-100"
          >
            {showForm ? 'Cancel' : '+ Add Forecast'}
          </Button>
        </Col>
      </Row>

      {showForm && (
        <Card className="form-card mb-4">
          <Card.Body>
            <h5 className="mb-4">Add Weather Forecast</h5>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Farm ID</Form.Label>
                    <Form.Control
                      type="number"
                      name="farmId"
                      value={formData.farmId}
                      onChange={handleInputChange}
                      placeholder="Enter farm ID"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter location"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Temperature (°C)</Form.Label>
                    <Form.Control
                      type="number"
                      name="temperature"
                      value={formData.temperature}
                      onChange={handleInputChange}
                      placeholder="0"
                      step="0.1"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Humidity (%)</Form.Label>
                    <Form.Control
                      type="number"
                      name="humidity"
                      value={formData.humidity}
                      onChange={handleInputChange}
                      placeholder="0-100"
                      step="0.1"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Rainfall (mm)</Form.Label>
                    <Form.Control
                      type="number"
                      name="rainfall"
                      value={formData.rainfall}
                      onChange={handleInputChange}
                      placeholder="0"
                      step="0.1"
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Wind Speed (km/h)</Form.Label>
                    <Form.Control
                      type="number"
                      name="windSpeed"
                      value={formData.windSpeed}
                      onChange={handleInputChange}
                      placeholder="0"
                      step="0.1"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Condition</Form.Label>
                    <Form.Select
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select condition</option>
                      <option value="sunny">☀️ Sunny</option>
                      <option value="cloudy">☁️ Cloudy</option>
                      <option value="partly cloudy">⛅ Partly Cloudy</option>
                      <option value="rainy">🌧️ Rainy</option>
                      <option value="stormy">⛈️ Stormy</option>
                      <option value="foggy">🌫️ Foggy</option>
                      <option value="windy">💨 Windy</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit" className="w-100">
                Save Forecast
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      <Row>
        {forecasts.length === 0 ? (
          <Col>
            <div className="empty-state">
              <p>No weather forecasts recorded yet. Click "Add Forecast" to get started!</p>
            </div>
          </Col>
        ) : (
          forecasts.map(forecast => (
            <Col md={6} lg={4} key={forecast.id} className="mb-4">
              <Card className="weather-card h-100">
                <Card.Body>
                  <div className="weather-header">
                    <h5>{forecast.location}</h5>
                    <span className="weather-icon">{getWeatherIcon(forecast.condition)}</span>
                  </div>
                  <div className="weather-details">
                    <div className="detail-item">
                      <span className="detail-label">Farm ID:</span>
                      <span className="detail-value">{forecast.farmId}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Condition:</span>
                      <span className="detail-value">{forecast.condition}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Temperature:</span>
                      <span className="detail-value">{forecast.temperature}°C</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Humidity:</span>
                      <span className="detail-value">{forecast.humidity}%</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Rainfall:</span>
                      <span className="detail-value">{forecast.rainfall}mm</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Wind:</span>
                      <span className="detail-value">{forecast.windSpeed} km/h</span>
                    </div>
                  </div>
                  <small className="text-muted">
                    {new Date(forecast.date).toLocaleDateString()}
                  </small>
                  <div className="button-group">
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      className="w-100 mt-2"
                      onClick={() => handleDelete(forecast.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Weather;
