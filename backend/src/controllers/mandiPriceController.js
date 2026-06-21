// Mandi Price Controller - Handles real-time market price information
const MandiPrice = require('../models/mandiPriceModel');

exports.getAllPrices = (req, res) => {
  try {
    const prices = MandiPrice.findAll();
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLatestPrices = (req, res) => {
  try {
    const prices = MandiPrice.getLatestPrices();
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPriceById = (req, res) => {
  try {
    const price = MandiPrice.findById(req.params.id);
    if (!price) {
      return res.status(404).json({ error: 'Price record not found' });
    }
    res.json(price);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPricesByVariety = (req, res) => {
  try {
    const prices = MandiPrice.findByVariety(req.params.variety);
    if (prices.length === 0) {
      return res.status(404).json({ error: 'No prices found for this variety' });
    }
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPricesByMandi = (req, res) => {
  try {
    const prices = MandiPrice.findByMandi(req.params.mandi);
    if (prices.length === 0) {
      return res.status(404).json({ error: 'No prices found for this mandi' });
    }
    res.json(prices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPrice = (req, res) => {
  try {
    const { variety, mandi, price } = req.body;
    if (!variety || !mandi || !price) {
      return res.status(400).json({ error: 'Variety, mandi, and price are required' });
    }
    const newPrice = MandiPrice.create({ variety, mandi, price, ...req.body });
    res.status(201).json(newPrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePrice = (req, res) => {
  try {
    const updated = MandiPrice.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Price record not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePrice = (req, res) => {
  try {
    const deleted = MandiPrice.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Price record not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
