const { validationResult } = require('express-validator');
const prisma = require('../prisma/client');

/** Auto-generate a reference number like LIC-20240001 */
const generateRef = async () => {
  const count = await prisma.licenseApplication.count();
  const year = new Date().getFullYear();
  return `LIC-${year}${String(count + 1).padStart(4, '0')}`;
};

const verifyLicense = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  try {
    const { business_name } = req.body;

    const application = await prisma.licenseApplication.findFirst({
      where: {
        business_name: { contains: business_name, mode: 'insensitive' },
        status: 'APPROVED',
      },
      select: {
        business_name: true,
        license_type: true,
        status: true,
        reference_number: true,
      },
    });

    if (!application) {
      return res.json({
        data: { found: false, business_name },
      });
    }

    return res.json({
      data: { found: true, ...application },
    });
  } catch (err) {
    next(err);
  }
};

const applyForLicense = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  try {
    const { license_type, business_name, contact_name, contact_email } = req.body;
    const reference_number = await generateRef();

    const application = await prisma.licenseApplication.create({
      data: {
        user_id: req.user.id,
        license_type,
        business_name,
        contact_name,
        contact_email,
        reference_number,
      },
      select: {
        id: true,
        reference_number: true,
        status: true,
        submitted_at: true,
      },
    });

    return res.status(201).json({
      message: 'Application submitted successfully',
      data: application,
    });
  } catch (err) {
    next(err);
  }
};

const listApplications = async (req, res, next) => {
  try {
    const isAdmin = req.user.role === 'ADMIN';
    const where = isAdmin ? {} : { user_id: req.user.id };

    const applications = await prisma.licenseApplication.findMany({
      where,
      orderBy: { submitted_at: 'desc' },
      select: {
        id: true,
        license_type: true,
        business_name: true,
        status: true,
        reference_number: true,
        submitted_at: true,
      },
    });

    return res.json({ data: applications });
  } catch (err) {
    next(err);
  }
};

const getApplication = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  try {
    const application = await prisma.licenseApplication.findUnique({
      where: { id: req.params.id },
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found.' });
    }

    if (req.user.role !== 'ADMIN' && application.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden.' });
    }

    return res.json({ data: application });
  } catch (err) {
    next(err);
  }
};

const updateApplicationStatus = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  try {
    const application = await prisma.licenseApplication.update({
      where: { id: req.params.id },
      data: { status: req.body.status },
      select: { id: true, reference_number: true, status: true, updated_at: true },
    });

    return res.json({
      message: 'Status updated',
      data: application,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verifyLicense,
  applyForLicense,
  listApplications,
  getApplication,
  updateApplicationStatus,
};
