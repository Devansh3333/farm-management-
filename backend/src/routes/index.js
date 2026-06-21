const express = require('express');
const farmRoutes = require('./farmRoutes');
const salesRoutes = require('./salesRoutes');
const yieldRoutes = require('./yieldRoutes');
const mandiPriceRoutes = require('./mandiPriceRoutes');
const weatherRoutes = require('./weatherRoutes');

const router = express.Router();

// Mount all routes
router.use('/farms', farmRoutes);
router.use('/sales', salesRoutes);
router.use('/yields', yieldRoutes);
router.use('/mandi-prices', mandiPriceRoutes);
router.use('/weather', weatherRoutes);

module.exports = router;
