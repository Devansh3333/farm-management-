// Yield Routes
const express = require('express');
const router = express.Router();
const yieldController = require('../controllers/yieldController');

router.get('/', yieldController.getAllYields);
router.get('/:id', yieldController.getYieldById);
router.get('/farm/:farmId', yieldController.getYieldsByFarmId);
router.post('/', yieldController.createYield);
router.put('/:id', yieldController.updateYield);
router.delete('/:id', yieldController.deleteYield);

module.exports = router;
