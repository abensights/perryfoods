export type ServiceCategory =
  | 'wedding-corporate'
  | 'buffet'
  | 'cakes-pastries'
  | 'muffins-desserts'
  | 'fast-food';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  imageAlt: string;
  ctaText: string;
  features: string[];
}

export type MenuCategoryFilter =
  | 'all'
  | 'lunch-box'
  | 'buffet'
  | 'agelgel'
  | 'cakes-pastries'
  | 'cookies-muffins'
  | 'traditional-bread';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategoryFilter;
  categoryLabel: string;
  description: string;
  image: string;
  imageAlt: string;
  priceBirr: number;
  unit?: string;
  minGuests?: number;
  minQuantity?: number;
  isSample?: boolean;
  highlights?: string[];
  servesInfo?: string;
  priceLabel?: string;
  hideUnitSuffix?: boolean;
  imageClassName?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  imageAlt: string;
  aspect?: 'wide' | 'tall' | 'square';
  caption: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  preferredContact: 'email' | 'phone';
  eventType: 'Wedding' | 'Corporate Event' | 'Birthday' | 'Family Gathering' | 'Other';
  eventDate: string;
  estimatedGuests: number | string;
  venueLocation: string;
  servicesRequired: string[];
  budgetRange: string;
  dietaryPreferences: string;
  additionalMessage: string;
  consent: boolean;
}

export interface InquirySubmissionResult {
  success: boolean;
  referenceNumber?: string;
  message: string;
  isDemoMode: boolean;
}
