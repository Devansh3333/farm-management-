// Sales Controller - Handles sales management operations
const Sales = require('../models/salesModel');

exports.getAllSales = (req, res) => {
  try {
    const sales = Sales.findAll();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSaleById = (req, res) => {
  try {
    const sale = Sales.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ error: 'Sale not found' });
    }
    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSalesByFarmId = (req, res) => {
  try {
    const sales = Sales.findByFarmId(req.params.farmId);
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSale = (req, res) => {
  try {
    const { farmId, variety, quantity, pricePerUnit, buyer, mandi } = req.body;
    if (!farmId || !variety || !quantity || !pricePerUnit || !buyer || !mandi) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newSale = Sales.create({ farmId, variety, quantity, pricePerUnit, buyer, mandi });
    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSale = (req, res) => {
  try {
    const updated = Sales.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Sale not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSale = (req, res) => {
  try {
    const deleted = Sales.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Sale not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
