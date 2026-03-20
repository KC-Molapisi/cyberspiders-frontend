const { validationResult } = require('express-validator');
const prisma = require('../prisma/client');

const submitEnquiry = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  try {
    const { name, email, subject, message } = req.body;

    await prisma.contactEnquiry.create({
      data: { name, email, subject, message },
    });

    return res.status(201).json({
      message: 'Enquiry received. We will respond within 2 business days.',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { submitEnquiry };
