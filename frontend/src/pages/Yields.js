import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Table } from 'react-bootstrap';
import { yieldService } from '../services/api';
import '../styles/Yields.css';

function Yields() {
  const [yields, setYields] = useState([]);
  const [formData, setFormData] = useState({
    farmId: '',
    variety: '',
    quantity: '',
    season: '',
    notes: ''
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadYields();
  }, []);

  const loadYields = async () => {
    try {
      const response = await yieldService.getAll();
      setYields(response.data);
    } catch (error) {
      console.error('Error loading yields:', error);
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
        quantity: parseFloat(formData.quantity)
      };
      await yieldService.create(data);
      setFormData({ farmId: '', variety: '', quantity: '', season: '', notes: '' });
      setShowForm(false);
      loadYields();
    } catch (error) {
      console.error('Error creating yield:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await yieldService.delete(id);
      loadYields();
    } catch (error) {
      console.error('Error deleting yield:', error);
    }
  };

  const totalYield = yields.reduce((sum, y) => sum + (parseFloat(y.quantity) || 0), 0);
  const avgYield = yields.length > 0 ? (totalYield / yields.length).toFixed(2) : 0;

  return (
    <Container fluid className="yields-container py-5">
      <Row className="mb-4">
        <Col md={4}>
          <h1 className="page-title">📊 Yield Management</h1>
        </Col>
        <Col md={4}>
          <Card className="stats-card">
            <Card.Body>
              <p className="stats-label">Total Yield</p>
              <p className="stats-value">{totalYield.toFixed(2)} kg</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stats-card">
            <Card.Body>
              <p className="stats-label">Average Yield</p>
              <p className="stats-value">{avgYield} kg</p>
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
            {showForm ? 'Cancel' : '+ Record Yield'}
          </Button>
        </Col>
      </Row>

      {showForm && (
        <Card className="form-card mb-4">
          <Card.Body>
            <h5 className="mb-4">Record Production</h5>
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
                    <Form.Label>Variety</Form.Label>
                    <Form.Control
                      type="text"
                      name="variety"
                      value={formData.variety}
                      onChange={handleInputChange}
                      placeholder="e.g., Alphonso"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Quantity (kg/tons)</Form.Label>
                    <Form.Control
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      placeholder="0"
                      step="0.01"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Season</Form.Label>
                    <Form.Select
                      name="season"
                      value={formData.season}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select season</option>
                      <option value="Spring">Spring</option>
                      <option value="Summer">Summer</option>
                      <option value="Monsoon">Monsoon</option>
                      <option value="Autumn">Autumn</option>
                      <option value="Winter">Winter</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Additional notes about the yield"
                  rows={3}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Record Yield
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      <Card className="data-card">
        <Card.Body>
          {yields.length === 0 ? (
            <p className="text-center text-muted">No yield records yet</p>
          ) : (
            <Table responsive hover className="yields-table">
              <thead>
                <tr>
                  <th>Farm ID</th>
                  <th>Variety</th>
                  <th>Quantity</th>
                  <th>Season</th>
                  <th>Date</th>
                  <th>Notes</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {yields.map(yieldRecord => (
                  <tr key={yieldRecord.id}>
                    <td>{yieldRecord.farmId}</td>
                    <td>{yieldRecord.variety}</td>
                    <td className="quantity-col">{yieldRecord.quantity} kg</td>
                    <td>{yieldRecord.season}</td>
                    <td>{new Date(yieldRecord.date).toLocaleDateString()}</td>
                    <td>{yieldRecord.notes}</td>
                    <td>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(yieldRecord.id)}
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

export default Yields;
