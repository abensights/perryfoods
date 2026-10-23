import { ServiceItem } from '../types';
import { foodImages } from './images';

export const servicesData: ServiceItem[] = [
  {
    id: 'wedding-corporate',
    category: 'wedding-corporate',
    title: 'Wedding & Corporate Catering',
    shortDescription:
      'Make your special occasions memorable with catering options tailored to weddings, corporate gatherings, and important events.',
    fullDescription:
      'From elegant seated wedding dinners to full-day corporate seminars, our team delivers seamless culinary experiences, tailored menus, and punctual, professional food arrangements that delight every guest.',
    image: foodImages.services.weddingCorporate.url,
    imageAlt: foodImages.services.weddingCorporate.alt,
    ctaText: 'Plan Your Event',
    features: [
      'Tailored multi-course wedding menus',
      'Corporate lunch & executive boardroom boxes',
      'Cocktail hour canapés & passed hors d’oeuvres',
      'Dietary accommodation (vegetarian, vegan, gluten-free)',
    ],
  },
  {
    id: 'buffet-packages',
    category: 'buffet',
    title: 'Buffet & Catering Packages',
    shortDescription:
      'Explore buffet-style dining and diverse food selections suited to different occasions, group sizes, and preferences.',
    fullDescription:
      'Generous, beautifully presented buffet spreads that cater to diverse tastes and appetites. Ideal for reunions, milestone birthdays, and company banquets with interactive hot and cold stations.',
    image: foodImages.services.buffet.url,
    imageAlt: foodImages.services.buffet.alt,
    ctaText: 'Explore Catering',
    features: [
      'Hot entree stations & carved roasted meats',
      'Abundant seasonal salads & fresh side dishes',
      'Artisanal breads, spreads, and dips',
      'Scalable packages for small gatherings to 300+ guests',
    ],
  },
  {
    id: 'cakes-pastries',
    category: 'cakes-pastries',
    title: 'Cakes & Celebration Pastries',
    shortDescription:
      'Add something special to birthdays, celebrations, and gatherings with cakes and pastries made for sharing.',
    fullDescription:
      'Artfully handcrafted cakes and delicate pastries designed to be the centerpiece of your celebration. Baked fresh with premium ingredients, decadent layers, and bespoke finishes.',
    image: foodImages.services.cakes.url,
    imageAlt: foodImages.services.cakes.alt,
    ctaText: 'Explore Cakes',
    features: [
      'Custom tiered celebration & birthday cakes',
      'Signature entremets & artisanal tartlets',
      'Petite dessert tables & dessert shooters',
      'Customized flavor profiles and edible floral decor',
    ],
  },
  {
    id: 'muffins-desserts',
    category: 'muffins-desserts',
    title: 'Pastries, Muffins & Desserts',
    shortDescription:
      'Discover tempting baked treats, muffins, pastries, and desserts for gatherings, sharing, or a little everyday indulgence.',
    fullDescription:
      'Warm, buttery croissants, moist gourmet muffins, danishes, and handcrafted dessert selections. Perfect for morning tea, conference breaks, dessert tables, or sweet everyday indulgence.',
    image: foodImages.services.pastries.url,
    imageAlt: foodImages.services.pastries.alt,
    ctaText: 'Discover Treats',
    features: [
      'Gourmet jumbo muffins (berry, dark chocolate, bran)',
      'Flaky European croissants & pain au chocolat',
      'Assorted Danish pastries & cinnamon swirls',
      'Bite-sized dessert platters for easy sharing',
    ],
  },
  {
    id: 'fast-food-quick-bites',
    category: 'fast-food',
    title: 'Fast Food & Quick Bites',
    shortDescription:
      'Enjoy convenient, satisfying food options for casual gatherings, quick meals, and everyday cravings.',
    fullDescription:
      'Satisfying, flavor-packed finger food, artisanal burgers, sliders, loaded wraps, and savory platters crafted for casual parties, game days, outdoor picnics, and late-night party bites.',
    image: foodImages.services.fastFood.url,
    imageAlt: foodImages.services.fastFood.alt,
    ctaText: 'Explore Quick Bites',
    features: [
      'Mini brioche sliders & craft burgers',
      'Toasted artisan wraps & loaded paninis',
      'Crispy seasoned finger foods & house dips',
      'Individual quick-bite boxes for rapid distribution',
    ],
  },
];
