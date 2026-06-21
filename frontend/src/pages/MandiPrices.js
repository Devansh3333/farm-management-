import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Table } from 'react-bootstrap';
import { mandiPriceService } from '../services/api';
import '../styles/MandiPrices.css';

function MandiPrices() {
  const [prices, setPrices] = useState([]);
  const [formData, setFormData] = useState({
    variety: '',
    mandi: '',
    price: '',
    trend: 'stable'
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadPrices();
  }, []);

  const loadPrices = async () => {
    try {
      const response = await mandiPriceService.getAll();
      setPrices(response.data);
    } catch (error) {
      console.error('Error loading prices:', error);
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
        price: parseFloat(formData.price)
      };
      await mandiPriceService.create(data);
      setFormData({ variety: '', mandi: '', price: '', trend: 'stable' });
      setShowForm(false);
      loadPrices();
    } catch (error) {
      console.error('Error creating price:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await mandiPriceService.delete(id);
      loadPrices();
    } catch (error) {
      console.error('Error deleting price:', error);
    }
  };

  const getTrendBadge = (trend) => {
    const colors = {
      'up': 'success',
      'down': 'danger',
      'stable': 'secondary'
    };
    const icons = {
      'up': '📈',
      'down': '📉',
      'stable': '➡️'
    };
    return `${icons[trend] || '➡️'} ${trend}`;
  };

  const avgPrice = prices.length > 0 
    ? (prices.reduce((sum, p) => sum + p.price, 0) / prices.length).toFixed(2)
    : 0;

  return (
    <Container fluid className="mandi-prices-container py-5">
      <Row className="mb-4">
        <Col md={8}>
          <h1 className="page-title">📈 Market Prices (Mandi)</h1>
        </Col>
        <Col md={4}>
          <Card className="stats-card">
            <Card.Body>
              <p className="stats-label">Average Price</p>
              <p className="stats-value">₹{avgPrice}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Button 
            variant="success" 
            onClick={() => setShowForm(!showForm)}
            className="w-100"
          >
            {showForm ? 'Cancel' : '+ Update Price'}
          </Button>
        </Col>
      </Row>

      {showForm && (
        <Card className="form-card mb-4">
          <Card.Body>
            <h5 className="mb-4">Add/Update Market Price</h5>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Variety</Form.Label>
                    <Form.Control
                      type="text"
                      name="variety"
                      value={formData.variety}
                      onChange={handleInputChange}
                      placeholder="e.g., Alphonso, Kesar"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Mandi Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="mandi"
                      value={formData.mandi}
                      onChange={handleInputChange}
                      placeholder="e.g., Nashik, Pune"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Price per kg (₹)</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Price Trend</Form.Label>
                    <Form.Select
                      name="trend"
                      value={formData.trend}
                      onChange={handleInputChange}
                    >
                      <option value="up">📈 Up</option>
                      <option value="stable">➡️ Stable</option>
                      <option value="down">📉 Down</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit" className="w-100">
                Save Price
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      <Card className="data-card">
        <Card.Body>
          {prices.length === 0 ? (
            <p className="text-center text-muted">No market prices recorded yet</p>
          ) : (
            <Table responsive hover className="prices-table">
              <thead>
                <tr>
                  <th>Variety</th>
                  <th>Mandi</th>
                  <th>Price per kg</th>
                  <th>Trend</th>
                  <th>Updated</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {prices.map(price => (
                  <tr key={price.id}>
                    <td className="variety-col">{price.variety}</td>
                    <td>{price.mandi}</td>
                    <td className="price-col">₹{price.price.toFixed(2)}</td>
                    <td>
                      <span className={`trend-badge trend-${price.trend}`}>
                        {getTrendBadge(price.trend)}
                      </span>
                    </td>
                    <td>{new Date(price.date).toLocaleDateString()}</td>
                    <td>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(price.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default MandiPrices;
