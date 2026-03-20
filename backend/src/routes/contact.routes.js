const { Router } = require('express');
const { body } = require('express-validator');
const { submitEnquiry } = require('../controllers/contact.controller');

const router = Router();

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  submitEnquiry
);

module.exports = router;
