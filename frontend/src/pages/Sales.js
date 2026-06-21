import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Table } from 'react-bootstrap';
import { salesService } from '../services/api';
import '../styles/Sales.css';

function Sales() {
  const [sales, setSales] = useState([]);
  const [formData, setFormData] = useState({
    farmId: '',
    variety: '',
    quantity: '',
    pricePerUnit: '',
    buyer: '',
    mandi: ''
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      const response = await salesService.getAll();
      setSales(response.data);
    } catch (error) {
      console.error('Error loading sales:', error);
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
        quantity: parseFloat(formData.quantity),
        pricePerUnit: parseFloat(formData.pricePerUnit)
      };
      await salesService.create(data);
      setFormData({ farmId: '', variety: '', quantity: '', pricePerUnit: '', buyer: '', mandi: '' });
      setShowForm(false);
      loadSales();
    } catch (error) {
      console.error('Error creating sale:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await salesService.delete(id);
      loadSales();
    } catch (error) {
      console.error('Error deleting sale:', error);
    }
  };

  const totalRevenue = sales.reduce((sum, sale) => sum + (sale.totalPrice || 0), 0);

  return (
    <Container fluid className="sales-container py-5">
      <Row className="mb-4">
        <Col md={8}>
          <h1 className="page-title">💰 Sales Management</h1>
        </Col>
        <Col md={4}>
          <Card className="stats-card">
            <Card.Body>
              <p className="stats-label">Total Revenue</p>
              <p className="stats-value">₹{totalRevenue.toFixed(2)}</p>
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
            {showForm ? 'Cancel' : '+ New Sale'}
          </Button>
        </Col>
      </Row>

      {showForm && (
        <Card className="form-card mb-4">
          <Card.Body>
            <h5 className="mb-4">Record New Sale</h5>
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
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Quantity (kg)</Form.Label>
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
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Price per kg</Form.Label>
                    <Form.Control
                      type="number"
                      name="pricePerUnit"
                      value={formData.pricePerUnit}
                      onChange={handleInputChange}
                      placeholder="0"
                      step="0.01"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Buyer</Form.Label>
                    <Form.Control
                      type="text"
                      name="buyer"
                      value={formData.buyer}
                      onChange={handleInputChange}
                      placeholder="Buyer name"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Mandi</Form.Label>
                    <Form.Control
                      type="text"
                      name="mandi"
                      value={formData.mandi}
                      onChange={handleInputChange}
                      placeholder="Mandi name"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit" className="w-100">
                Record Sale
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      <Card className="data-card">
        <Card.Body>
          {sales.length === 0 ? (
            <p className="text-center text-muted">No sales recorded yet</p>
          ) : (
            <Table responsive hover className="sales-table">
              <thead>
                <tr>
                  <th>Farm ID</th>
                  <th>Variety</th>
                  <th>Quantity (kg)</th>
                  <th>Price/kg</th>
                  <th>Total</th>
                  <th>Buyer</th>
                  <th>Mandi</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sales.map(sale => (
                  <tr key={sale.id}>
                    <td>{sale.farmId}</td>
                    <td>{sale.variety}</td>
                    <td>{sale.quantity}</td>
                    <td>₹{sale.pricePerUnit}</td>
                    <td className="total-col">₹{sale.totalPrice}</td>
                    <td>{sale.buyer}</td>
                    <td>{sale.mandi}</td>
                    <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
                    <td>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(sale.id)}
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

export default Sales;
