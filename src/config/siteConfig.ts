export const siteConfig = {
  brand: {
    name: 'Perry Foods',
    tagline: 'Catering & Food Services',
    heroKicker: 'PERRY FOODS | CATERING & FOOD SERVICES',
    heroHeadline: 'Good Food. Beautiful Moments. Every Occasion.',
    heroSubtext:
      'From memorable weddings and corporate gatherings to freshly baked treats and everyday bites, Perry Foods brings delicious food to the moments that matter.',
    footerDescription:
      'Perry Foods offers catering, buffet options, celebration cakes, pastries, desserts, and quick bites for a variety of occasions.',
  },
  colors: {
    primaryOrange: '#F28A08',
    primaryOrangeHover: '#DB7A04',
    mainBg: '#FFFCF8',
    charcoal: '#24211E',
    warmGray: '#706A63',
    creamBorder: '#EDE5D9',
    white: '#FFFFFF',
  },
  // Verified operational contact details
  contact: {
    email: 'Perryfoods@gmail.com',
    phone: '+251911458705',
    address: 'Arbegnoch St, Addis Ababa',
    hours: '2:00 - 12:00',
    emailPlaceholder: 'Perryfoods@gmail.com',
    phonePlaceholder: '+251911458705',
    addressPlaceholder: 'Arbegnoch St, Addis Ababa',
    hoursPlaceholder: '2:00 - 12:00',
    hasLiveContactInfo: true,
  },
  socials: {
    instagram: 'https://www.instagram.com/perryfoods',
    facebook: 'https://www.facebook.com/perryfoods',
    telegram: 'https://t.me/perryfoods',
    linkedin: 'https://www.linkedin.com/company/perryfoods',
  },
  navLinks: [
    { label: 'Home', href: '#hero' },
    { label: 'View Menu', href: '#menu' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'About Us', href: '#services' },
    { label: 'Contact', href: '#inquiry' },
  ],
  serviceCategories: [
    'Full-Service Staffed Catering',
    'Drop-Off & Pick-Up Trays',
    'Build-Your-Own Buffet Packages',
    'Wedding & Corporate Catering',
    'Cakes & Celebration Pastries',
    'Pastries, Muffins & Desserts',
    'Fast Food & Quick Bites',
  ],
  eventTypes: [
    'Wedding',
    'Corporate Event',
    'Birthday',
    'Family Gathering',
    'Other',
  ],
  // Backend submission endpoint configuration point
  api: {
    inquiryEndpoint: '', // Set endpoint (e.g., '/api/inquiries' or webhook) when ready
    isDemoMode: true, // Informs user transparently that requests are in staging preview mode
  },
};
