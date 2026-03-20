const { Router } = require('express');
const { getNotices, getServices, getAbout } = require('../controllers/content.controller');

const router = Router();

// All public — no auth required
router.get('/notices', getNotices);
router.get('/services', getServices);
router.get('/about', getAbout);

module.exports = router;
