// Mandi Price Routes
const express = require('express');
const router = express.Router();
const mandiPriceController = require('../controllers/mandiPriceController');

router.get('/', mandiPriceController.getAllPrices);
router.get('/latest', mandiPriceController.getLatestPrices);
router.get('/:id', mandiPriceController.getPriceById);
router.get('/variety/:variety', mandiPriceController.getPricesByVariety);
router.get('/mandi/:mandi', mandiPriceController.getPricesByMandi);
router.post('/', mandiPriceController.createPrice);
router.put('/:id', mandiPriceController.updatePrice);
router.delete('/:id', mandiPriceController.deletePrice);

module.exports = router;
