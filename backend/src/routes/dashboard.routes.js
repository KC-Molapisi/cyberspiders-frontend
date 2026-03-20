const { Router } = require('express');
const { getStats } = require('../controllers/dashboard.controller');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = Router();

router.get('/stats', verifyToken, requireRole('ADMIN'), getStats);

module.exports = router;
