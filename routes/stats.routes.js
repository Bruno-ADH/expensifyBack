const express = require('express');
const router = express.Router();
const {
  getMonthlyStats,
  getByCategoryStats,
  getTotalStats,
  getEvolutionStats,
} = require('../controllers/stats.controller');
const { tokenCheck } = require('../middleware/authMiddleware');

router.use(tokenCheck);

router.get('/monthly', getMonthlyStats);
router.get('/by-category', getByCategoryStats);
router.get('/total', getTotalStats);
router.get('/evolution', getEvolutionStats);

module.exports = router;