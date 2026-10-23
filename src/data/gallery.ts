import { GalleryItem } from '../types';

import lunchboxImg from '../assets/Lunchbox.jpg';
import lunchBoxImg from '../assets/Lunch Box.jpg';
import eventImg from '../assets/Event.jpg';
import eventCateringImg from '../assets/Event Catering.jpg';
import cakeImg from '../assets/Cake.jpg';
import cakeCateringImg from '../assets/Cake catering.jpg';
import cookieImg from '../assets/Cookie.jpg';
import cookieCateringImg from '../assets/Cookie Catering.jpg';
import breadImg from '../assets/Bread.jpg';
import ambashaImg from '../assets/Ambasha Catering.jpg';
import breadCateringImg from '../assets/Bread Catering.jpg';
import services3Img from '../assets/Services 3 Final.jpg';
import services4Img from '../assets/Services 4.jpg';
import bsomTekorachImg from '../assets/bsom tekorach 1.png';

// Menu Images for Gallery
import corpDiplomaticImg from '../assets/Menu/Corp Diplomatic.jpg';
import birthdayGradBuffetImg from '../assets/Menu/Birthday & Graduation Celebration Buffet.jpg';
import jebenaCoffeeImg from '../assets/Menu/05. Traditional Jebena Coffee.jpg';
import condolenceBuffetImg from '../assets/Menu/Condolence & memorial gathering buffet ethiopia.jpg';
import celebrationDessertBuffetImg from '../assets/Menu/Celebration Dessert & Pastry Buffet.jpg';

import smallFastingAgelgelImg from '../assets/Menu/Small Fasting Agelgel.jpg';
import midFastingAgelgelImg from '../assets/Menu/MID Fasting Agelgel.jpg';
import bigFastingAgelgelImg from '../assets/Menu/BIG Fasting Agelgel.jpg';
import smallNonFastingAgelgelImg from '../assets/Menu/Small Non-Fasting Agelgel.jpg';
import midNonFastingAgelgelImg from '../assets/Menu/MID Non-Fasting Agelgel.jpg';
import bigNonFastingAgelgelImg from '../assets/Menu/BIG Non-Fasting Agelgel.jpg';

import birthdayCakesImg from '../assets/Menu/Birthday & Celebration Cakes.jpg';
import weddingCakesImg from '../assets/Menu/Wedding & Engagement Cakes.jpg';
import cupcakeMiniBoxesImg from '../assets/Menu/Cupcake & Mini Cake Boxes.jpg';
import fastingCakeImg from '../assets/Menu/Fasting Cake.webp';
import fastingPastryBoxImg from '../assets/Menu/Fasting Pastry Box.jpg';
import savoryPastrySambusaImg from '../assets/Menu/Savory Pastry & Sambusa.jpg';

import butterCookiesImg from '../assets/Menu/Butter Cookies.jpg';
import oatCookiesImg from '../assets/Menu/Oat Cookies.jpg';
import teffCookiesImg from '../assets/Menu/Teff Cookies.jpg';
import barleyCookiesImg from '../assets/Menu/Barley Cookies.jpg';
import cinnamonCookiesImg from '../assets/Menu/Cinnamon Cookies.jpg';
import gingerSpiceCookiesImg from '../assets/Menu/Ginger Spice Cookies.jpg';
import sugarCookiesImg from '../assets/Menu/Sugar Cookies.jpg';

import vanillaMuffinsImg from '../assets/Menu/Vanilla Muffins.jpg';
import chocolateMuffinsImg from '../assets/Menu/Chocolate Muffins.jpg';
import bananaMuffinsImg from '../assets/Menu/Banana Muffins.jpg';

import difoDaboImg from '../assets/Menu/Difo Dabo.jpg';
import hibistImg from '../assets/Menu/Hibist.jpg';
import mulmulImg from '../assets/Menu/Mulmul.jpg';

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  image: string;
  imageAlt: string;
  caption: string;
}

export interface GalleryCollection {
  id: string;
  title: string;
  category: string;
  filterTag: string;
  photoCount: number | string;
  mainPhoto: GalleryPhoto;
  thumbnails: [GalleryPhoto, GalleryPhoto, GalleryPhoto];
  extraPhotos?: GalleryPhoto[];
}

export const galleryFilterTags = [
  { id: 'all', label: 'All Collections' },
  { id: 'agelgel', label: 'Agelgel Platters' },
  { id: 'buffet', label: 'Buffet Banquets' },
  { id: 'cakes', label: 'Cakes & Pastries' },
  { id: 'traditional-bakery', label: 'Traditional Bakery' },
  { id: 'corporate', label: 'Corporate Events' },
  { id: 'cookies-muffins', label: 'Cookies & Muffins' },
] as const;

export const galleryCollectionsData: GalleryCollection[] = [
  {
    id: 'col-agelgel',
    title: 'Traditional Agelgel',
    category: 'Agelgel Platters',
    filterTag: 'agelgel',
    photoCount: 8,
    mainPhoto: {
      id: 'photo-agelgel-main',
      title: 'Grand Non-Fasting Agelgel Sharing Platter',
      category: 'Traditional Agelgel',
      image: bigNonFastingAgelgelImg,
      imageAlt: 'Authentic Ethiopian injera rolls with traditional stews in Agelgel presentation',
      caption: 'Generous shared injera platter adorned with Shiro, Misir, Gomen, and vibrant wats.',
    },
    thumbnails: [
      {
        id: 'photo-agelgel-sub-1',
        title: 'Small Fasting Agelgel',
        category: 'Traditional Agelgel',
        image: smallFastingAgelgelImg,
        imageAlt: 'Freshly seasoned fasting wats and vegetables on injera',
        caption: 'Traditional spiced Ethiopian vegetable sides prepared for community hospitality.',
      },
      {
        id: 'photo-agelgel-sub-2',
        title: 'Family Non-Fasting Agelgel',
        category: 'Traditional Agelgel',
        image: midNonFastingAgelgelImg,
        imageAlt: 'Rich berbere sauces and braised dishes',
        caption: 'Slow-simmered wats and colorful accompaniments for authentic communal dining.',
      },
      {
        id: 'photo-agelgel-sub-3',
        title: 'Small Non-Fasting Agelgel',
        category: 'Traditional Agelgel',
        image: smallNonFastingAgelgelImg,
        imageAlt: 'Tender meat wats with injera',
        caption: 'Signature meat stews and fresh injera rolled for celebration gatherings.',
      },
    ],
    extraPhotos: [
      {
        id: 'photo-agelgel-sub-4',
        title: 'Grand Fasting Agelgel Feast',
        category: 'Traditional Agelgel',
        image: bigFastingAgelgelImg,
        imageAlt: 'Grand fasting Agelgel feast platter',
        caption: 'Abundant fasting feast arranged over rolled injera with savory wats.',
      },
      {
        id: 'photo-agelgel-sub-5',
        title: 'Family Fasting Agelgel',
        category: 'Traditional Agelgel',
        image: midFastingAgelgelImg,
        imageAlt: 'Family fasting assortment with traditional wats',
        caption: 'Family-sized fasting platter with Shiro, Misir, and colorful vegetables.',
      },
      {
        id: 'photo-agelgel-sub-6',
        title: 'Traditional Agelgel Presentation',
        category: 'Traditional Agelgel',
        image: bigNonFastingAgelgelImg,
        imageAlt: 'Traditional Ethiopian Agelgel basket presentation',
        caption: 'Heirloom ceremonial presentation with layered injera and prime meat cuts.',
      },
      {
        id: 'photo-agelgel-sub-7',
        title: 'Small Fasting Agelgel Platter',
        category: 'Traditional Agelgel',
        image: smallFastingAgelgelImg,
        imageAlt: 'Small fasting platter with injera rolls',
        caption: 'Mild yellow turmeric vegetables balanced with zesty greens and lentil sauces.',
      },
    ],
  },
  {
    id: 'col-buffet',
    title: 'Celebration Buffets',
    category: 'Buffet Banquets',
    filterTag: 'buffet',
    photoCount: 7,
    mainPhoto: {
      id: 'photo-buffet-main',
      title: 'Birthday & Graduation Celebration Buffet',
      category: 'Celebration Buffets',
      image: birthdayGradBuffetImg,
      imageAlt: 'Grand banquet buffet line with decorated serving stations and floral accents',
      caption: 'Full-scale milestone and banquet catering stations styled with traditional elegance.',
    },
    thumbnails: [
      {
        id: 'photo-buffet-sub-1',
        title: 'Executive Corporate & Diplomatic Buffet',
        category: 'Celebration Buffets',
        image: corpDiplomaticImg,
        imageAlt: 'Stainless chafing dish buffet setup with hot gourmet dishes',
        caption: 'Professional chafing presentation for temperature-controlled banquet dining.',
      },
      {
        id: 'photo-buffet-sub-2',
        title: 'Condolence & Memorial Gathering Buffet',
        category: 'Celebration Buffets',
        image: condolenceBuffetImg,
        imageAlt: 'Assorted warm banquet pans and comforting dishes',
        caption: 'Thoughtfully prepared dishes maintained fresh for family and memorial gatherings.',
      },
      {
        id: 'photo-buffet-sub-3',
        title: 'Celebration Dessert & Pastry Buffet',
        category: 'Celebration Buffets',
        image: celebrationDessertBuffetImg,
        imageAlt: 'Dessert buffet table with assorted pastries and sweets',
        caption: 'Vibrant dessert display styled for smooth guest flow and celebration tables.',
      },
    ],
    extraPhotos: [
      {
        id: 'photo-buffet-sub-4',
        title: 'Traditional Jebena Coffee Ceremony',
        category: 'Celebration Buffets',
        image: jebenaCoffeeImg,
        imageAlt: 'Traditional Ethiopian coffee ceremony setup with jebena',
        caption: 'Freshly roasted Ethiopian highland coffee beans with incense, defo dabo, and popcorn.',
      },
      {
        id: 'photo-buffet-sub-5',
        title: 'Executive Corporate Presentation',
        category: 'Celebration Buffets',
        image: corpDiplomaticImg,
        imageAlt: 'Polished diplomatic banquet presentation',
        caption: 'Polished place settings and coordinated table chafers for dignitaries and summits.',
      },
      {
        id: 'photo-buffet-sub-6',
        title: 'Grand Celebration Banquet Line',
        category: 'Celebration Buffets',
        image: birthdayGradBuffetImg,
        imageAlt: 'Celebration banquet table setup',
        caption: 'Inviting celebration banquet spread with meat dishes, wats, and injera.',
      },
    ],
  },
  {
    id: 'col-cakes',
    title: 'Cakes & Pastries',
    category: 'Cakes & Pastries',
    filterTag: 'cakes',
    photoCount: 7,
    mainPhoto: {
      id: 'photo-cakes-main',
      title: 'Birthday & Celebration Cakes',
      category: 'Cakes & Pastries',
      image: birthdayCakesImg,
      imageAlt: 'Handcrafted layered celebration cake with buttercream frosting and berry styling',
      caption: 'Tiered celebration cakes decorated with silky frosting and personalized lettering.',
    },
    thumbnails: [
      {
        id: 'photo-cakes-sub-1',
        title: 'Wedding & Engagement Cakes',
        category: 'Cakes & Pastries',
        image: weddingCakesImg,
        imageAlt: 'Multi-tier celebration cake with delicate bridal finish',
        caption: 'Custom centerpieces designed to harmonize with wedding and milestone themes.',
      },
      {
        id: 'photo-cakes-sub-2',
        title: 'Cupcake & Mini Cake Boxes',
        category: 'Cakes & Pastries',
        image: cupcakeMiniBoxesImg,
        imageAlt: 'Assorted decorated cupcakes and dessert bite boxes',
        caption: 'Petite individual sweet treats perfect for dessert tables and corporate receptions.',
      },
      {
        id: 'photo-cakes-sub-3',
        title: 'Fasting Pastry Box',
        category: 'Cakes & Pastries',
        image: fastingPastryBoxImg,
        imageAlt: 'Plant-based pastry assortment for fasting seasons',
        caption: 'Plant-based fasting pastries and muffins baked daily for coffee and tea time.',
      },
    ],
    extraPhotos: [
      {
        id: 'photo-cakes-sub-4',
        title: 'Fasting Plant-Based Cake',
        category: 'Cakes & Pastries',
        image: fastingCakeImg,
        imageAlt: 'Plant-based celebration cake for fasting seasons',
        caption: 'Dairy-free and egg-free celebration cake with moist layers and smooth frosting.',
      },
      {
        id: 'photo-cakes-sub-5',
        title: 'Savory Pastry & Sambusa Platter',
        category: 'Cakes & Pastries',
        image: savoryPastrySambusaImg,
        imageAlt: 'Crisp golden sambusas and savory finger pastries',
        caption: 'Crispy lentil and meat sambusas with bite-sized rolls for reception sharing.',
      },
      {
        id: 'photo-cakes-sub-6',
        title: 'Corporate, Graduation & Logo Cakes',
        category: 'Cakes & Pastries',
        image: cupcakeMiniBoxesImg,
        imageAlt: 'Assorted custom cupcakes and celebratory cake boxes',
        caption: 'Precision decorated sweet boxes and cakes honoring company and graduation milestones.',
      },
    ],
  },
  {
    id: 'col-ambasha',
    title: 'Traditional Bakery',
    category: 'Traditional Bakery',
    filterTag: 'traditional-bakery',
    photoCount: 6,
    mainPhoto: {
      id: 'photo-ambasha-main',
      title: 'Traditional Difo Dabo Celebration Bread',
      category: 'Traditional Bakery',
      image: difoDaboImg,
      imageAlt: 'Substantial round loaf of authentic Difo Dabo bread with golden baked crust',
      caption: 'Heirloom leaf-baked spiced celebration bread with a warm, comforting interior.',
    },
    thumbnails: [
      {
        id: 'photo-ambasha-sub-1',
        title: 'Soft Steamed Hibist Bread',
        category: 'Traditional Bakery',
        image: hibistImg,
        imageAlt: 'Airy, soft steamed Hibist bread loaf',
        caption: 'Tender steamed bread with a delicate crumb, pairing wonderfully with coffee and stews.',
      },
      {
        id: 'photo-ambasha-sub-2',
        title: 'Festive Mulmul Bread',
        category: 'Traditional Bakery',
        image: mulmulImg,
        imageAlt: 'Traditional leaf-wrapped Mulmul celebration bread',
        caption: 'Cultural Buhe celebration bread wrapped in banana leaves with home-baked sweetness.',
      },
      {
        id: 'photo-ambasha-sub-3',
        title: 'Ceremonial Scored Ambasha',
        category: 'Traditional Bakery',
        image: ambashaImg,
        imageAlt: 'Geometric scored celebration Ambasha bread wheel',
        caption: 'Distinctive cultural bread scoring crafted with cardamom, fenugreek, and cumin.',
      },
    ],
    extraPhotos: [
      {
        id: 'photo-ambasha-sub-4',
        title: 'Ceremonial Difo Dabo Loaf',
        category: 'Traditional Bakery',
        image: difoDaboImg,
        imageAlt: 'Traditional round Difo Dabo baked for celebrations',
        caption: 'Generous ceremonial loaf prepared with traditional leaf-lined clay methods.',
      },
      {
        id: 'photo-ambasha-sub-5',
        title: 'Steamed Hibist Slices',
        category: 'Traditional Bakery',
        image: hibistImg,
        imageAlt: 'Freshly portioned soft Hibist bread',
        caption: 'Comforting pillowy sweet bread for family tea and coffee gatherings.',
      },
    ],
  },
  {
    id: 'col-corporate',
    title: 'Corporate Events',
    category: 'Corporate Events',
    filterTag: 'corporate',
    photoCount: 6,
    mainPhoto: {
      id: 'photo-corporate-main',
      title: 'Diplomatic & Executive Reception Buffet',
      category: 'Corporate Events',
      image: corpDiplomaticImg,
      imageAlt: 'Professional banquet buffet with polished stainless chafers and dish labels',
      caption: 'Turnkey corporate banquet catering designed for high-profile business summits and receptions.',
    },
    thumbnails: [
      {
        id: 'photo-corporate-sub-1',
        title: 'Traditional Jebena Coffee Service',
        category: 'Corporate Events',
        image: jebenaCoffeeImg,
        imageAlt: 'Corporate Ethiopian coffee service setup',
        caption: 'Freshly brewed highland coffee bringing authentic hospitality to corporate delegates.',
      },
      {
        id: 'photo-corporate-sub-2',
        title: 'Corporate Savory Pastry & Sambusa',
        category: 'Corporate Events',
        image: savoryPastrySambusaImg,
        imageAlt: 'Savory sambusa and finger food platter for business receptions',
        caption: 'Hygienic, premium finger foods for boardroom meetings and workshop break times.',
      },
      {
        id: 'photo-corporate-sub-3',
        title: 'Milestone & Logo Celebration Boxes',
        category: 'Corporate Events',
        image: cupcakeMiniBoxesImg,
        imageAlt: 'Bespoke mini cake and cupcake boxes for office milestones',
        caption: 'Recognize organizational milestones with bespoke themed cupcakes and dessert spreads.',
      },
    ],
    extraPhotos: [
      {
        id: 'photo-corporate-sub-4',
        title: 'Memorial & Formal Gathering Buffet',
        category: 'Corporate Events',
        image: condolenceBuffetImg,
        imageAlt: 'Formal gathering buffet banquet presentation',
        caption: 'Punctual setup, dietary labeling, and professional banquet coordination.',
      },
      {
        id: 'photo-corporate-sub-5',
        title: 'Executive Diplomatic Buffet Line',
        category: 'Corporate Events',
        image: corpDiplomaticImg,
        imageAlt: 'Executive diplomatic banquet line',
        caption: 'Prime Beef Tibs, delicate fish, and assorted wats balanced for international guests.',
      },
    ],
  },
  {
    id: 'col-bakery',
    title: 'Cookies and Muffins',
    category: 'Cookies and Muffins',
    filterTag: 'cookies-muffins',
    photoCount: 9,
    mainPhoto: {
      id: 'photo-bakery-main',
      title: 'Butter Cookies & Pastry Collection',
      category: 'Cookies and Muffins',
      image: butterCookiesImg,
      imageAlt: 'Golden crisp-baked butter cookies with delicate crumb',
      caption: 'Traditional butter cookies baked to a golden melt-in-the-mouth finish for coffee ceremonies.',
    },
    thumbnails: [
      {
        id: 'photo-bakery-sub-1',
        title: 'Rich Chocolate Muffins',
        category: 'Cookies and Muffins',
        image: chocolateMuffinsImg,
        imageAlt: 'Tender chocolate muffins with moist crumb',
        caption: 'Full cocoa flavor and moist interior baked fresh for bakery lovers.',
      },
      {
        id: 'photo-bakery-sub-2',
        title: 'Tender Vanilla Muffins',
        category: 'Cookies and Muffins',
        image: vanillaMuffinsImg,
        imageAlt: 'Classic golden vanilla muffins',
        caption: 'Light and fluffy bakery muffins with a delicate vanilla aroma.',
      },
      {
        id: 'photo-bakery-sub-3',
        title: 'Comforting Banana Muffins',
        category: 'Cookies and Muffins',
        image: bananaMuffinsImg,
        imageAlt: 'Freshly baked ripe banana muffins',
        caption: 'Home-baked aroma and soft fruit sweetness for breakfast and coffee breaks.',
      },
    ],
    extraPhotos: [
      {
        id: 'photo-bakery-sub-4',
        title: 'Golden Oat Cookies',
        category: 'Cookies and Muffins',
        image: oatCookiesImg,
        imageAlt: 'Hearty rolled oat cookies',
        caption: 'Toasted oat flavor with a satisfying crunch and rustic whole-grain character.',
      },
      {
        id: 'photo-bakery-sub-5',
        title: 'Highland Teff Grain Cookies',
        category: 'Cookies and Muffins',
        image: teffCookiesImg,
        imageAlt: 'Signature Ethiopian teff grain cookies',
        caption: 'Earth-roasted aroma inspired by Ethiopia’s prized teff grain.',
      },
      {
        id: 'photo-bakery-sub-6',
        title: 'Rustic Barley Cookies',
        category: 'Cookies and Muffins',
        image: barleyCookiesImg,
        imageAlt: 'Lightly crisp rustic barley cookies',
        caption: 'Subtle toasted grain flavor offering a nourishing, rustic treat.',
      },
      {
        id: 'photo-bakery-sub-7',
        title: 'Aromatic Cinnamon Cookies',
        category: 'Cookies and Muffins',
        image: cinnamonCookiesImg,
        imageAlt: 'Gently spiced cinnamon cookies',
        caption: 'Fragrant cinnamon with sweet raisin pieces for morning refreshments.',
      },
      {
        id: 'photo-bakery-sub-8',
        title: 'Ginger Spice Cookies',
        category: 'Cookies and Muffins',
        image: gingerSpiceCookiesImg,
        imageAlt: 'Warming ginger spice cookies',
        caption: 'Warming ginger spice notes with crisp edges and satisfying bite.',
      },
      {
        id: 'photo-bakery-sub-9',
        title: 'Decorated Sugar Cookies',
        category: 'Cookies and Muffins',
        image: sugarCookiesImg,
        imageAlt: 'Delicate buttery sugar cookies',
        caption: 'Buttery cookies with clean sweetness for celebration boxes and coffee service.',
      },
    ],
  },
];

/**
 * Flattened list of all individual photos across collections for the LightboxModal
 */
export const galleryItemsData: GalleryItem[] = galleryCollectionsData.flatMap((col) => [
  {
    id: col.mainPhoto.id,
    title: col.mainPhoto.title,
    category: col.category,
    image: col.mainPhoto.image,
    imageAlt: col.mainPhoto.imageAlt,
    caption: col.mainPhoto.caption,
  },
  ...col.thumbnails.map((t) => ({
    id: t.id,
    title: t.title,
    category: col.category,
    image: t.image,
    imageAlt: t.imageAlt,
    caption: t.caption,
  })),
  ...(col.extraPhotos || []).map((e) => ({
    id: e.id,
    title: e.title,
    category: col.category,
    image: e.image,
    imageAlt: e.imageAlt,
    caption: e.caption,
  })),
]);
