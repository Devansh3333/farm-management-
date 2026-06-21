// Yield Controller - Handles yield/production management operations
const Yield = require('../models/yieldModel');

exports.getAllYields = (req, res) => {
  try {
    const yields = Yield.findAll();
    res.json(yields);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getYieldById = (req, res) => {
  try {
    const yieldEntry = Yield.findById(req.params.id);
    if (!yieldEntry) {
      return res.status(404).json({ error: 'Yield record not found' });
    }
    res.json(yieldEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getYieldsByFarmId = (req, res) => {
  try {
    const yields = Yield.findByFarmId(req.params.farmId);
    res.json(yields);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createYield = (req, res) => {
  try {
    const { farmId, variety, quantity, season } = req.body;
    if (!farmId || !variety || !quantity || !season) {
      return res.status(400).json({ error: 'FarmId, variety, quantity, and season are required' });
    }
    const newYield = Yield.create({ farmId, variety, quantity, season, ...req.body });
    res.status(201).json(newYield);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateYield = (req, res) => {
  try {
    const updated = Yield.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Yield record not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteYield = (req, res) => {
  try {
    const deleted = Yield.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Yield record not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
