export const quickLinks = [
  { title: 'Licence Verification', text: 'Check licence validity and status.', link: '/licensing', tone: 'blue' },
  { title: 'Type Approval', text: 'Review device approval guidance.', link: '/services', tone: 'green' },
  { title: 'Complaints', text: 'Find consumer complaint channels.', link: '/contact', tone: 'pink' },
  { title: 'Register BW', text: 'Access digital public service pathways.', link: '/services', tone: 'gold' },
];

export const featureSlides = [
  {
    title: 'Telecommunications',
    text: 'Clear pathways for operators, standards and consumer access.',
    tone: 'blue',
  },
  {
    title: 'Broadcasting',
    text: 'Modern oversight that supports public trust and industry growth.',
    tone: 'green',
  },
  {
    title: 'Postal',
    text: 'Accessible services, licensing and accountability across the sector.',
    tone: 'pink',
  },
  {
    title: 'Internet',
    text: 'Policy, quality and digital readiness for a connected Botswana.',
    tone: 'gold',
  },
];

export const notices = [
  'Public notice: service standards and regulatory updates are available in the resources area.',
  'Need help navigating the site? Use the chat helper in the bottom-right corner.',
  'Developers can connect these sections to live endpoints through the API client.',
];

export const services = [
  {
    title: 'Licensing & Authorisations',
    text: 'Licence applications, renewals, categories and verification entry points.',
  },
  {
    title: 'Consumer Protection',
    text: 'Complaint guidance, rights information and service quality support.',
  },
  {
    title: 'Type Approval',
    text: 'Device standards, approvals and compliance information.',
  },
  {
    title: 'Quality of Service',
    text: 'Monitoring information, standards and reporting pathways.',
  },
  {
    title: 'Broadcasting Regulation',
    text: 'Requirements, guidance and sector information for broadcasting services.',
  },
  {
    title: 'Postal Regulation',
    text: 'Postal sector oversight, public information and operational requirements.',
  },
];

export const aboutSlides = [
  {
    kicker: 'Profile',
    heading: 'A simpler public-facing BOCRA profile',
    body:
      'This section can hold the organisation profile, mandate summary and plain-language introduction without scattering those basics across too many separate pages.',
  },
  {
    kicker: 'Mandate',
    heading: 'Mandate and strategic role',
    body:
      'Present the regulatory role in one clean block: telecommunications, broadcasting, postal and digital communications oversight, with links to detailed policy and legal materials.',
  },
  {
    kicker: 'Leadership',
    heading: 'Leadership and governance',
    body:
      'Use this slide area for executive profiles, governance structure and accountability information in a way that feels official, not dusty museum brochure energy.',
  },
  {
    kicker: 'Careers',
    heading: 'Careers and opportunities',
    body:
      'Fold careers into the About experience so visitors can learn about BOCRA and discover vacancies or internship opportunities without wandering through a maze.',
  },
];

export const stats = [
  { value: '4', label: 'Regulatory domains' },
  { value: '24/7', label: 'Digital access goal' },
  { value: '1', label: 'Unified public experience' },
  { value: 'Ready', label: 'Backend integration layer' },
];

export const faq = [
  {
    q: 'How do I verify a licence?',
    a: 'Use the licensing section and connect the verification form to your backend verification endpoint.',
  },
  {
    q: 'Where do I put real social links?',
    a: 'Update the socialLinks array in src/config/site.js and the footer will render them automatically.',
  },
  {
    q: 'Can the chatbot use a real backend later?',
    a: 'Yes. The floating assistant is intentionally simple now, so you can later connect it to an FAQ API or conversational backend.',
  },
];
