import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import '../styles/Navbar.css';

function NavbarComponent() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-icon">🥭</span>
        <div>
          <h1>Mango Farm</h1>
          <p>Management</p>
        </div>
      </div>

      <Nav className="flex-column sidebar-nav">
        <Nav.Link
          as={Link}
          to="/"
          className={`sidebar-link ${location.pathname === '/' ? 'active' : ''}`}>
          <span className="link-icon">🏠</span>
          <span>Dashboard</span>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/farms"
          className={`sidebar-link ${location.pathname === '/farms' ? 'active' : ''}`}>
          <span className="link-icon">🌾</span>
          <span>Farms</span>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/sales"
          className={`sidebar-link ${location.pathname === '/sales' ? 'active' : ''}`}>
          <span className="link-icon">💰</span>
          <span>Sales</span>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/yields"
          className={`sidebar-link ${location.pathname === '/yields' ? 'active' : ''}`}>
          <span className="link-icon">📊</span>
          <span>Yields</span>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/mandi-prices"
          className={`sidebar-link ${location.pathname === '/mandi-prices' ? 'active' : ''}`}>
          <span className="link-icon">📈</span>
          <span>Market Prices</span>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/weather"
          className={`sidebar-link ${location.pathname === '/weather' ? 'active' : ''}`}>
          <span className="link-icon">☁️</span>
          <span>Weather</span>
        </Nav.Link>
      </Nav>

      <div className="sidebar-footer">
        <Nav.Link
          as={Link}
          to="/account"
          className={`sidebar-action ${location.pathname === '/account' ? 'active' : ''}`}>
          <span className="link-icon">👤</span>
          <span>My Account</span>
        </Nav.Link>
      </div>
    </aside>
  );
}

export default NavbarComponent;
