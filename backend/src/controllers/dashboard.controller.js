const prisma = require('../prisma/client');

const getStats = async (_req, res, next) => {
  try {
    const [
      total_licenses,
      pending_licenses,
      approved_licenses,
      total_complaints,
      resolved_complaints,
      complaintsByCategory,
    ] = await Promise.all([
      prisma.licenseApplication.count(),
      prisma.licenseApplication.count({ where: { status: 'PENDING' } }),
      prisma.licenseApplication.count({ where: { status: 'APPROVED' } }),
      prisma.complaint.count(),
      prisma.complaint.count({ where: { status: 'RESOLVED' } }),
      prisma.complaint.groupBy({
        by: ['category'],
        _count: { category: true },
      }),
    ]);

    const complaints_by_category = complaintsByCategory.reduce((acc, item) => {
      acc[item.category] = item._count.category;
      return acc;
    }, {});

    return res.json({
      data: {
        total_licenses,
        pending_licenses,
        approved_licenses,
        total_complaints,
        resolved_complaints,
        complaints_by_category,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getStats };
