import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { farmService } from '../services/api';
import '../styles/Farms.css';

function Farms() {
  const [farms, setFarms] = useState([]);
  const [formData, setFormData] = useState({ name: '', location: '', area: '', varieties: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadFarms();
  }, []);

  const loadFarms = async () => {
    try {
      const response = await farmService.getAll();
      setFarms(response.data);
    } catch (error) {
      console.error('Error loading farms:', error);
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
        area: parseFloat(formData.area),
        varieties: formData.varieties.split(',').map(v => v.trim())
      };
      await farmService.create(data);
      setFormData({ name: '', location: '', area: '', varieties: '' });
      setShowForm(false);
      loadFarms();
    } catch (error) {
      console.error('Error creating farm:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await farmService.delete(id);
      loadFarms();
    } catch (error) {
      console.error('Error deleting farm:', error);
    }
  };

  return (
    <Container fluid className="farms-container py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="page-title">🚜 Farm Management</h1>
        </Col>
        <Col md={2}>
          <Button 
            variant="success" 
            onClick={() => setShowForm(!showForm)}
            className="w-100"
          >
            {showForm ? 'Cancel' : '+ New Farm'}
          </Button>
        </Col>
      </Row>

      {showForm && (
        <Card className="form-card mb-4">
          <Card.Body>
            <h5 className="mb-4">Add New Farm</h5>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Farm Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter farm name"
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
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Area (acres)</Form.Label>
                    <Form.Control
                      type="number"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      placeholder="Enter area"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Varieties (comma separated)</Form.Label>
                    <Form.Control
                      type="text"
                      name="varieties"
                      value={formData.varieties}
                      onChange={handleInputChange}
                      placeholder="e.g., Alphonso, Kesar, Langda"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit" className="w-100">
                Create Farm
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      <Row>
        {farms.length === 0 ? (
          <Col>
            <div className="empty-state">
              <p>No farms added yet. Click "New Farm" to get started!</p>
            </div>
          </Col>
        ) : (
          farms.map(farm => (
            <Col md={6} lg={4} key={farm.id} className="mb-4">
              <Card className="farm-card h-100">
                <Card.Body>
                  <Card.Title className="farm-name">{farm.name}</Card.Title>
                  <div className="farm-details">
                    <p><strong>Location:</strong> {farm.location}</p>
                    <p><strong>Area:</strong> {farm.area} acres</p>
                    {farm.varieties && farm.varieties.length > 0 && (
                      <p><strong>Varieties:</strong> {farm.varieties.join(', ')}</p>
                    )}
                  </div>
                  <div className="button-group">
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(farm.id)}>
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

export default Farms;
