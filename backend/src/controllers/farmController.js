// Farm Controller - Handles farm management operations
const Farm = require('../models/farmModel');

exports.healthCheck = (req, res) => {
  res.json({ status: 'Mango Farm Management System is healthy' });
};

exports.getAllFarms = (req, res) => {
  try {
    const farms = Farm.findAll();
    res.json(farms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFarmById = (req, res) => {
  try {
    const farm = Farm.findById(req.params.id);
    if (!farm) {
      return res.status(404).json({ error: 'Farm not found' });
    }
    res.json(farm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createFarm = (req, res) => {
  try {
    const { name, location, area, varieties } = req.body;
    if (!name || !location || !area) {
      return res.status(400).json({ error: 'Name, location, and area are required' });
    }
    const newFarm = Farm.create({ name, location, area, varieties });
    res.status(201).json(newFarm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFarm = (req, res) => {
  try {
    const updated = Farm.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Farm not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFarm = (req, res) => {
  try {
    const deleted = Farm.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Farm not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
