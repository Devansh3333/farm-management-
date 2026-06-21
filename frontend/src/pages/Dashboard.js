import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { farmService, salesService, yieldService, mandiPriceService } from '../services/api';
import '../styles/Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    farmsCount: 0,
    salesCount: 0,
    yieldsCount: 0,
    pricesCount: 0,
    totalRevenue: 0,
    totalYield: 0,
    avgPrice: 0
  });
  const [recentData, setRecentData] = useState({
    farms: [],
    sales: [],
    yields: [],
    prices: []
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [farmsRes, salesRes, yieldsRes, pricesRes] = await Promise.all([
        farmService.getAll(),
        salesService.getAll(),
        yieldService.getAll(),
        mandiPriceService.getAll()
      ]);

      const farms = farmsRes.data || [];
      const sales = salesRes.data || [];
      const yields = yieldsRes.data || [];
      const prices = pricesRes.data || [];

      const totalRevenue = sales.reduce((sum, sale) => sum + (sale.totalPrice || 0), 0);
      const totalYield = yields.reduce((sum, y) => sum + (parseFloat(y.quantity) || 0), 0);
      const avgPrice = prices.length > 0
        ? prices.reduce((sum, p) => sum + p.price, 0) / prices.length
        : 0;

      setStats({
        farmsCount: farms.length,
        salesCount: sales.length,
        yieldsCount: yields.length,
        pricesCount: prices.length,
        totalRevenue,
        totalYield,
        avgPrice
      });

      setRecentData({
        farms: farms.slice(-3),
        sales: sales.slice(-3),
        yields: yields.slice(-3),
        prices: prices.slice(-3)
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  return (
    <Container fluid className="dashboard-container">
      <div className="dashboard-page-box">
        <div className="dashboard-header-row">
          <div>
            <p className="dashboard-badge">Live Dashboard</p>
            <h1 className="dashboard-title">Farm Management Overview</h1>
            <p className="dashboard-intro">
              Monitor farms, sales, yields, market prices, and weather updates in one modern panel.
            </p>
          </div>
          <div className="dashboard-header-actions">
            <button className="dashboard-action-btn dashboard-action-secondary">New Farm</button>
            <button className="dashboard-action-btn dashboard-action-primary">Add Sale</button>
          </div>
        </div>

        <Row className="dashboard-widget-row">
          <Col md={6} lg={3} className="mb-3">
            <Card className="widget-card widget-farms">
              <Card.Body>
                <div className="widget-top">
                  <span className="widget-icon">🚜</span>
                  <span className="widget-label">Total Farms</span>
                </div>
                <p className="widget-value">{stats.farmsCount}</p>
                <p className="widget-meta">Farms currently tracked</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3} className="mb-3">
            <Card className="widget-card widget-sales">
              <Card.Body>
                <div className="widget-top">
                  <span className="widget-icon">💰</span>
                  <span className="widget-label">Sales Records</span>
                </div>
                <p className="widget-value">{stats.salesCount}</p>
                <p className="widget-meta">Sales updates available</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3} className="mb-3">
            <Card className="widget-card widget-yields">
              <Card.Body>
                <div className="widget-top">
                  <span className="widget-icon">🌾</span>
                  <span className="widget-label">Total Yield</span>
                </div>
                <p className="widget-value">{stats.totalYield.toFixed(0)} kg</p>
                <p className="widget-meta">Harvest totals</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3} className="mb-3">
            <Card className="widget-card widget-revenue">
              <Card.Body>
                <div className="widget-top">
                  <span className="widget-icon">📊</span>
                  <span className="widget-label">Revenue</span>
                </div>
                <p className="widget-value">₹{stats.totalRevenue.toFixed(0)}</p>
                <p className="widget-meta">Current revenue total</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="dashboard-summary-row">
          <Col xl={7} className="mb-4">
            <Card className="dashboard-panel-card">
              <Card.Body>
                <h5 className="panel-title">Recent Activity</h5>
                <div className="activity-grid">
                  <div className="activity-card activity-alerts">
                    <p className="activity-title">Recent Farms</p>
                    <p className="activity-value">{stats.farmsCount}</p>
                    <p className="activity-meta">
                      {recentData.farms.length === 0 ? 'No farms added yet' : `${recentData.farms.length} recent farms`}
                    </p>
                  </div>
                  <div className="activity-card activity-sales">
                    <p className="activity-title">Recent Sales</p>
                    <p className="activity-value">{stats.salesCount}</p>
                    <p className="activity-meta">
                      {recentData.sales.length === 0 ? 'No sales recorded yet' : `${recentData.sales.length} recent sales`}
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={5} className="mb-4">
            <Card className="dashboard-panel-card">
              <Card.Body>
                <h5 className="panel-title">Market Snapshot</h5>
                <div className="market-grid">
                  <div className="market-item">
                    <p className="market-label">Prices</p>
                    <p className="market-value">{stats.pricesCount}</p>
                  </div>
                  <div className="market-item">
                    <p className="market-label">Avg Price/kg</p>
                    <p className="market-value">₹{stats.avgPrice.toFixed(2)}</p>
                  </div>
                  <div className="market-item">
                    <p className="market-label">Yield Records</p>
                    <p className="market-value">{stats.yieldsCount}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="dashboard-detail-row">
          <Col xl={6} className="mb-4">
            <Card className="data-overview-card">
              <Card.Header className="bg-light">
                <h5 className="mb-0">Recent Farms</h5>
              </Card.Header>
              <Card.Body>
                {recentData.farms.length === 0 ? (
                  <p className="text-muted">No farms added yet</p>
                ) : (
                  recentData.farms.map(farm => (
                    <div key={farm.id} className="recent-item">
                      <strong>{farm.name}</strong>
                      <small className="text-muted d-block">{farm.location} • {farm.area} acres</small>
                    </div>
                  ))
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col xl={6} className="mb-4">
            <Card className="data-overview-card">
              <Card.Header className="bg-light">
                <h5 className="mb-0">Recent Sales</h5>
              </Card.Header>
              <Card.Body>
                {recentData.sales.length === 0 ? (
                  <p className="text-muted">No sales recorded yet</p>
                ) : (
                  recentData.sales.map(sale => (
                    <div key={sale.id} className="recent-item">
                      <strong>{sale.variety}</strong>
                      <small className="text-muted d-block">₹{sale.totalPrice} • {sale.buyer}</small>
                    </div>
                  ))
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col xl={4} className="mb-4">
            <Card className="data-overview-card">
              <Card.Header className="bg-light">
                <h5 className="mb-0">Recent Yields</h5>
              </Card.Header>
              <Card.Body>
                {recentData.yields.length === 0 ? (
                  <p className="text-muted">No yield records yet</p>
                ) : (
                  recentData.yields.map(y => (
                    <div key={y.id} className="recent-item">
                      <strong>{y.variety}</strong>
                      <small className="text-muted d-block">{y.quantity} kg • {y.season}</small>
                    </div>
                  ))
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col xl={8} className="mb-4">
            <Card className="data-overview-card">
              <Card.Header className="bg-light">
                <h5 className="mb-0">Market Prices</h5>
              </Card.Header>
              <Card.Body>
                {recentData.prices.length === 0 ? (
                  <p className="text-muted">No prices recorded yet</p>
                ) : (
                  recentData.prices.map(price => (
                    <div key={price.id} className="recent-item">
                      <strong>{price.variety}</strong>
                      <small className="text-muted d-block">₹{price.price}/kg • {price.mandi}</small>
                    </div>
                  ))
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Dashboard;
