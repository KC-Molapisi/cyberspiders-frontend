const { validationResult } = require('express-validator');
const prisma = require('../prisma/client');

/** Auto-generate a reference number like CMP-20240001 */
const generateRef = async () => {
  const count = await prisma.complaint.count();
  const year = new Date().getFullYear();
  return `CMP-${year}${String(count + 1).padStart(4, '0')}`;
};

const createComplaint = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  try {
    const { title, description, category } = req.body;
    const reference_number = await generateRef();

    const complaint = await prisma.complaint.create({
      data: {
        user_id: req.user.id,
        title,
        description,
        category,
        reference_number,
      },
      select: {
        id: true,
        reference_number: true,
        status: true,
        created_at: true,
      },
    });

    return res.status(201).json({
      message: 'Complaint submitted',
      data: complaint,
    });
  } catch (err) {
    next(err);
  }
};

const listComplaints = async (req, res, next) => {
  try {
    const isAdmin = req.user.role === 'ADMIN';
    const where = isAdmin ? {} : { user_id: req.user.id };

    const complaints = await prisma.complaint.findMany({
      where,
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        title: true,
        category: true,
        status: true,
        reference_number: true,
        created_at: true,
      },
    });

    return res.json({ data: complaints });
  } catch (err) {
    next(err);
  }
};

const getComplaint = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  try {
    const complaint = await prisma.complaint.findUnique({
      where: { id: req.params.id },
    });

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found.' });
    }

    // Citizens can only view their own complaints
    if (req.user.role !== 'ADMIN' && complaint.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden.' });
    }

    return res.json({ data: complaint });
  } catch (err) {
    next(err);
  }
};

const updateComplaintStatus = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  try {
    const complaint = await prisma.complaint.update({
      where: { id: req.params.id },
      data: { status: req.body.status },
      select: { id: true, reference_number: true, status: true, updated_at: true },
    });

    return res.json({
      message: 'Status updated',
      data: complaint,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createComplaint, listComplaints, getComplaint, updateComplaintStatus };
