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
import zebibImg from '../assets/Menu/Zebib.jpeg';
import ambashaSliceImg from '../assets/Menu/Ambasha.jpg';

import englishCakeImg from '../assets/Menu/English Cake.webp';
import cinnamonRollImg from '../assets/Menu/Cinnamon Roll.jpg';
import waffleImg from '../assets/Menu/Waffle.jpg';
import cupcakeImg from '../assets/Menu/Cupcake.jpg';
import croissantPackedImg from '../assets/Menu/Croissant packed.jpg';
import croissantChocImg from '../assets/Menu/Croissant with Chocolate.jpg';

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  image: string;
  imageAlt: string;
  caption: string;
  imageClassName?: string;
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
  { id: 'cookies-muffins', label: 'Cookies' },
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
    photoCount: 6,
    mainPhoto: {
      id: 'photo-cakes-01',
      title: '01. English Cake',
      category: 'Cakes & Pastries',
      image: englishCakeImg,
      imageAlt: '01. English Cake',
      caption: 'Freshly baked English Cake with a golden crust and soft, moist crumb.',
      imageClassName: 'object-[center_65%]',
    },
    thumbnails: [
      {
        id: 'photo-cakes-02',
        title: '02. Cinnamon Roll',
        category: 'Cakes & Pastries',
        image: cinnamonRollImg,
        imageAlt: '02. Cinnamon Roll',
        caption: 'Freshly baked rolls layered with rich butter, fragrant cinnamon, and smooth glaze.',
      },
      {
        id: 'photo-cakes-03',
        title: '03. Waffle',
        category: 'Cakes & Pastries',
        image: waffleImg,
        imageAlt: '03. Waffle',
        caption: 'Crisp golden exterior and fluffy center with deep pocketed grid pattern.',
      },
      {
        id: 'photo-cakes-04',
        title: '04. Cupcake',
        category: 'Cakes & Pastries',
        image: cupcakeImg,
        imageAlt: '04. Cupcake',
        caption: 'Individually baked soft and moist cupcakes crowned with smooth frosting.',
      },
    ],
    extraPhotos: [
      {
        id: 'photo-cakes-05',
        title: '05. Croissant',
        category: 'Cakes & Pastries',
        image: croissantPackedImg,
        imageAlt: '05. Croissant',
        caption: 'Classic French-style croissants baked with rich butter and layered to flaky perfection.',
      },
      {
        id: 'photo-cakes-06',
        title: '06. Croissant with Chocolate',
        category: 'Cakes & Pastries',
        image: croissantChocImg,
        imageAlt: '06. Croissant with Chocolate',
        caption: 'Flaky, golden layers of buttery dough filled with rich, velvety chocolate.',
      },
    ],
  },
  {
    id: 'col-ambasha',
    title: 'Traditional Bakery',
    category: 'Traditional Bakery',
    filterTag: 'traditional-bakery',
    photoCount: 5,
    mainPhoto: {
      id: 'photo-ambasha-01',
      title: '01. Difo Dabo (5 kg)',
      category: 'Traditional Bakery',
      image: difoDaboImg,
      imageAlt: '01. Difo Dabo (5 kg)',
      caption: 'Traditional Ethiopian celebration bread prepared with a traditional leaf-lined baking method.',
    },
    thumbnails: [
      {
        id: 'photo-ambasha-02',
        title: '02. Ye Zebib Dabo (1 KG)',
        category: 'Traditional Bakery',
        image: zebibImg,
        imageAlt: '02. Ye Zebib Dabo (1 KG)',
        caption: 'Freshly baked Ethiopian style bread made with sweet raisins folded into golden dough.',
      },
      {
        id: 'photo-ambasha-03',
        title: '03. Ambasha',
        category: 'Traditional Bakery',
        image: ambashaImg,
        imageAlt: '03. Ambasha',
        caption: 'Traditional round Ethiopian bread with decorative scoring and aromatic seasoning.',
      },
      {
        id: 'photo-ambasha-04',
        title: '04. Ambasha slice',
        category: 'Traditional Bakery',
        image: ambashaSliceImg,
        imageAlt: '04. Ambasha slice',
        caption: 'Pre-portioned slices of traditional Ambasha bread for easy and convenient serving.',
      },
    ],
    extraPhotos: [
      {
        id: 'photo-ambasha-05',
        title: '05. Hibist',
        category: 'Traditional Bakery',
        image: hibistImg,
        imageAlt: '05. Hibist',
        caption: 'Soft steamed Ethiopian bread known for its light texture and delicate sweetness.',
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
        title: 'Corporate Croissant & Pastry Platter',
        category: 'Corporate Events',
        image: croissantPackedImg,
        imageAlt: 'Croissant and pastry platter for business receptions',
        caption: 'Premium fresh-baked croissants for boardroom meetings and workshop break times.',
      },
      {
        id: 'photo-corporate-sub-3',
        title: 'Milestone & Logo Cupcake Boxes',
        category: 'Corporate Events',
        image: cupcakeImg,
        imageAlt: 'Bespoke cupcake boxes for office milestones',
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
    title: 'Cookies',
    category: 'Cookies',
    filterTag: 'cookies-muffins',
    photoCount: 7,
    mainPhoto: {
      id: 'photo-bakery-01',
      title: '01. Orange Cookies',
      category: 'Cookies',
      image: butterCookiesImg,
      imageAlt: '01. Orange Cookies',
      caption: 'Freshly baked orange cookies infused with bright, refreshing orange zest.',
    },
    thumbnails: [
      {
        id: 'photo-bakery-02',
        title: '02. Oat Cookies (Ye Aja Cookies)',
        category: 'Cookies',
        image: oatCookiesImg,
        imageAlt: '02. Oat Cookies (Ye Aja Cookies)',
        caption: 'Hearty rolled oat cookies with a wholesome, nutty flavor and lightly crisp edges.',
      },
      {
        id: 'photo-bakery-03',
        title: '03. Teff Cookies',
        category: 'Cookies',
        image: teffCookiesImg,
        imageAlt: '03. Teff Cookies',
        caption: 'Signature cookies crafted from fine Ethiopian teff grain with deep roasted flavor.',
      },
      {
        id: 'photo-bakery-04',
        title: '04. Barley Cookies (Ye Gebse Cookies)',
        category: 'Cookies',
        image: barleyCookiesImg,
        imageAlt: '04. Barley Cookies (Ye Gebse Cookies)',
        caption: 'Traditional roasted barley cookies with a gentle crunch and wholesome grain character.',
      },
    ],
    extraPhotos: [
      {
        id: 'photo-bakery-05',
        title: '05. Lemon Cookies',
        category: 'Cookies',
        image: sugarCookiesImg,
        imageAlt: '05. Lemon Cookies',
        caption: 'Freshly baked lemon cookies infused with refreshing lemon zest and delicate citrus aroma.',
      },
      {
        id: 'photo-bakery-06',
        title: '06. Cinnamon Cookies',
        category: 'Cookies',
        image: cinnamonCookiesImg,
        imageAlt: '06. Cinnamon Cookies',
        caption: 'Fragrant cinnamon with sweet raisin pieces for morning coffee ceremonies and breaks.',
      },
      {
        id: 'photo-bakery-07',
        title: '07. Honey Cookies',
        category: 'Cookies',
        image: gingerSpiceCookiesImg,
        imageAlt: '07. Honey Cookies',
        caption: 'Freshly baked honey cookies infused with the warm, natural sweetness of pure honey.',
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
