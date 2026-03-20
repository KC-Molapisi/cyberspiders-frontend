const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱  Seeding database...');

  // ─── Notices ───────────────────────────────────────────────────────────────
  await prisma.notice.createMany({
    skipDuplicates: true,
    data: [
      {
        text: 'Public notice: spectrum allocation deadline extended to 30 April 2026.',
        type: 'REGULATORY',
        is_active: true,
      },
      {
        text: 'BOCRA is conducting a public consultation on broadband quality standards.',
        type: 'INFO',
        is_active: true,
      },
      {
        text: 'System maintenance scheduled for Saturday 22 March 2026 between 02:00–04:00.',
        type: 'ALERT',
        is_active: true,
      },
    ],
  });

  // ─── Services ──────────────────────────────────────────────────────────────
  await prisma.service.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Licensing & Authorisations',
        text: 'Licence applications, renewals, categories and verification entry points.',
        category: 'LICENSING',
        is_active: true,
      },
      {
        title: 'Consumer Protection',
        text: 'Complaint guidance, rights information and service quality support.',
        category: 'CONSUMER_PROTECTION',
        is_active: true,
      },
      {
        title: 'Type Approval',
        text: 'Device standards, approvals and compliance information.',
        category: 'TYPE_APPROVAL',
        is_active: true,
      },
      {
        title: 'Quality of Service',
        text: 'Monitoring information, standards and reporting pathways.',
        category: 'SPECTRUM',
        is_active: true,
      },
      {
        title: 'Broadcasting Regulation',
        text: 'Requirements, guidance and sector information for broadcasting services.',
        category: 'BROADCASTING',
        is_active: true,
      },
      {
        title: 'Postal Regulation',
        text: 'Postal sector oversight, public information and operational requirements.',
        category: 'POSTAL',
        is_active: true,
      },
    ],
  });

  // ─── About Slides ──────────────────────────────────────────────────────────
  await prisma.aboutSlide.createMany({
    skipDuplicates: true,
    data: [
      {
        kicker: 'Profile',
        heading: 'A simpler public-facing BOCRA profile',
        body: 'This section holds the organisation profile, mandate summary and plain-language introduction.',
        display_order: 1,
      },
      {
        kicker: 'Mandate',
        heading: 'Mandate and strategic role',
        body: 'Telecommunications, broadcasting, postal and digital communications oversight, with links to detailed policy and legal materials.',
        display_order: 2,
      },
      {
        kicker: 'Leadership',
        heading: 'Leadership and governance',
        body: 'Executive profiles, governance structure and accountability information.',
        display_order: 3,
      },
      {
        kicker: 'Careers',
        heading: 'Careers and opportunities',
        body: 'Discover vacancies or internship opportunities without wandering through a maze.',
        display_order: 4,
      },
    ],
  });

  console.log('✅  Seeding complete.');
}

main()
  .catch((err) => {
    console.error('❌  Seed failed:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
