const { Router } = require('express');
const { body, param } = require('express-validator');
const {
  createComplaint,
  listComplaints,
  getComplaint,
  updateComplaintStatus,
} = require('../controllers/complaints.controller');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = Router();

// All complaints routes require authentication
router.use(verifyToken);

router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('category')
      .isIn(['CONSUMER_PROTECTION', 'LICENSING', 'SPECTRUM', 'POSTAL', 'BROADCASTING'])
      .withMessage('Invalid category'),
  ],
  createComplaint
);

router.get('/', listComplaints);

router.get(
  '/:id',
  [param('id').isUUID().withMessage('Invalid complaint ID')],
  getComplaint
);

router.patch(
  '/:id/status',
  requireRole('ADMIN'),
  [
    param('id').isUUID().withMessage('Invalid complaint ID'),
    body('status')
      .isIn(['PENDING', 'IN_REVIEW', 'RESOLVED', 'REJECTED'])
      .withMessage('Invalid status'),
  ],
  updateComplaintStatus
);

module.exports = router;
