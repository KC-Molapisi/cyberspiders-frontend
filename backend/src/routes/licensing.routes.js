const { Router } = require('express');
const { body, param } = require('express-validator');
const {
  verifyLicense,
  applyForLicense,
  listApplications,
  getApplication,
  updateApplicationStatus,
} = require('../controllers/licensing.controller');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = Router();

// Public — licence verification
router.post(
  '/verify',
  [body('business_name').trim().notEmpty().withMessage('business_name is required')],
  verifyLicense
);

// Protected routes
router.use(verifyToken);

router.post(
  '/applications',
  [
    body('license_type')
      .isIn(['OPERATOR', 'TYPE_APPROVAL', 'SPECTRUM', 'POSTAL', 'BROADCASTING'])
      .withMessage('Invalid license_type'),
    body('business_name').trim().notEmpty().withMessage('business_name is required'),
    body('contact_name').trim().notEmpty().withMessage('contact_name is required'),
    body('contact_email').isEmail().withMessage('Valid contact_email is required'),
  ],
  applyForLicense
);

router.get('/applications', listApplications);

router.get(
  '/applications/:id',
  [param('id').isUUID().withMessage('Invalid application ID')],
  getApplication
);

router.patch(
  '/applications/:id/status',
  requireRole('ADMIN'),
  [
    param('id').isUUID().withMessage('Invalid application ID'),
    body('status')
      .isIn(['PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'])
      .withMessage('Invalid status'),
  ],
  updateApplicationStatus
);

module.exports = router;
