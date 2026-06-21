import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import '../styles/Account.css';

function Account() {
  return (
    <Container fluid className="account-page-container">
      <Row className="justify-content-center">
        <Col xl={8} lg={10}>
          <Card className="account-card">
            <Card.Body>
              <div className="account-header">
                <div>
                  <p className="account-badge">My Account</p>
                  <h2>Profile & Settings</h2>
                  <p className="account-intro">
                    Manage your profile details, security settings, and farm dashboard preferences.
                  </p>
                </div>
                <Button className="account-button">Edit Profile</Button>
              </div>

              <Row className="account-grid">
                <Col md={6} className="mb-4">
                  <div className="account-panel">
                    <h5>Profile Info</h5>
                    <p><strong>Name:</strong> Farm Manager</p>
                    <p><strong>Email:</strong> manager@example.com</p>
                    <p><strong>Role:</strong> Admin</p>
                  </div>
                </Col>
                <Col md={6} className="mb-4">
                  <div className="account-panel">
                    <h5>Preferences</h5>
                    <p>Dashboard theme: <strong>Light</strong></p>
                    <p>Notifications: <strong>Enabled</strong></p>
                    <p>Language: <strong>English</strong></p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Account;
