import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Farms from './pages/Farms';
import Sales from './pages/Sales';
import Yields from './pages/Yields';
import MandiPrices from './pages/MandiPrices';
import Weather from './pages/Weather';
import Account from './pages/Account';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/farms" element={<Farms />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/yields" element={<Yields />} />
            <Route path="/mandi-prices" element={<MandiPrices />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
