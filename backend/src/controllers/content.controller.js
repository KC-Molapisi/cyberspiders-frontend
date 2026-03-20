const prisma = require('../prisma/client');

const getNotices = async (_req, res, next) => {
  try {
    const notices = await prisma.notice.findMany({
      where: { is_active: true },
      select: { id: true, text: true, type: true },
      orderBy: { created_at: 'desc' },
    });
    return res.json({ data: notices });
  } catch (err) {
    next(err);
  }
};

const getServices = async (_req, res, next) => {
  try {
    const services = await prisma.service.findMany({
      where: { is_active: true },
      select: { id: true, title: true, text: true, category: true },
    });
    return res.json({ data: services });
  } catch (err) {
    next(err);
  }
};

const getAbout = async (_req, res, next) => {
  try {
    const slides = await prisma.aboutSlide.findMany({
      orderBy: { display_order: 'asc' },
      select: { id: true, kicker: true, heading: true, body: true },
    });
    return res.json({ data: slides });
  } catch (err) {
    next(err);
  }
};

module.exports = { getNotices, getServices, getAbout };
