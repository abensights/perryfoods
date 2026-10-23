import { MenuItem } from '../types';
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
import denechImg from '../assets/Denech 1.png';

// Menu Category Images
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

export const menuCategories = [
  { id: 'all', label: 'All sections' },
  { id: 'traditional-bread', label: 'Traditional bread' },
  { id: 'cookies-muffins', label: 'Cookies & Muffins' },
  { id: 'cakes-pastries', label: 'Cakes & Pastries' },
  { id: 'agelgel', label: 'Agelgel' },
  { id: 'buffet', label: 'Buffet Packages' },
  { id: 'lunch-box', label: 'Lunch Box' },
] as const;

export const menuItemsData: MenuItem[] = [
  // 1. Lunch Box - Ethiopian Fasting & Platter Selections
  {
    id: 'lunchbox-yetsom-tekorach',
    name: '1. Yetsom Tekorach',
    category: 'lunch-box',
    categoryLabel: 'Lunch Box',
    description:
      'A colorful selection of Ethiopian fasting favorites arranged over injera, bringing together different textures, colors, and spice levels in one complete traditional meal.',
    image: bsomTekorachImg,
    imageAlt: '1. Yetsom Tekorach',
    priceBirr: 350,
    unit: 'box',
    highlights: [
      'A combination of shiro, misir wat, denech alicha, gomen, and atakilt wet',
      'A balanced mix of spicy, mild, and vegetable-based dishes',
      'An excellent signature lunchbox for customers wanting variety',
    ],
  },
  {
    id: 'lunchbox-misir-wet',
    name: '2. Misir Wet',
    category: 'lunch-box',
    categoryLabel: 'Lunch Box',
    description:
      'Red lentils cooked until tender in a deep red berbere sauce, with slowly softened onions, garlic, ginger, and traditional Ethiopian spices.',
    image: lunchBoxImg,
    imageAlt: '2. Misir Wet',
    priceBirr: 260,
    unit: 'box',
    highlights: [
      'Rich, reddish-orange sauce with a bold berbere flavor',
      'Soft lentils with a thick, satisfying consistency',
      'A classic fasting dish served with fresh injera',
    ],
  },
  {
    id: 'lunchbox-gomen',
    name: '03. Gomen',
    category: 'lunch-box',
    categoryLabel: 'Lunch Box',
    description:
      'Fresh collard greens finely chopped and cooked with onions, garlic, green chili, and Ethiopian spices in vegetable oil until tender and flavorful.',
    image: lunchBoxImg,
    imageAlt: '03. Gomen',
    priceBirr: 240,
    unit: 'box',
    highlights: [
      'Earthy greens with a fresh, savory flavor',
      'Lightly spiced and balanced with garlic',
      'A traditional vegetable side for injera or rice lunchboxes',
    ],
  },
  {
    id: 'lunchbox-dinich-wet',
    name: '04. Dinich Wet',
    category: 'lunch-box',
    categoryLabel: 'Lunch Box',
    description:
      'Chunks of potato simmered in a seasoned onion and berbere sauce with garlic, ginger, and Ethiopian spices until they become tender and absorb the sauce.',
    image: denechImg,
    imageAlt: '04. Dinich Wet',
    priceBirr: 240,
    unit: 'box',
    highlights: [
      'Soft potatoes coated in a rich, spiced sauce',
      'Hearty, comforting flavor with an adjustable chili level',
      'Served with injera or rice for a filling lunchbox meal',
    ],
  },
  {
    id: 'lunchbox-shiro-wet',
    name: '05. Shiro Wet',
    category: 'lunch-box',
    categoryLabel: 'Lunch Box',
    description:
      'A smooth, hearty stew made from finely ground chickpeas or broad beans, slowly simmered with onions, garlic, ginger, and berbere in vegetable oil for a rich, comforting flavor.',
    image: lunchboxImg,
    imageAlt: '05. Shiro Wet',
    priceBirr: 250,
    unit: 'box',
    highlights: [
      'Creamy texture with a roasted legume taste',
      'Deep Ethiopian spice flavor, from mild to hot',
      'Traditionally served with injera to scoop up the stew',
    ],
  },
  {
    id: 'lunchbox-siga-wet',
    name: '06. Siga Wet',
    category: 'lunch-box',
    categoryLabel: 'Lunch Box',
    description:
      'Chunks of beef slow-cooked in a deep, dark red berbere sauce with slowly caramelized onions, garlic, ginger, and niter kibbeh for a rich, distinctly Ethiopian flavor.',
    image: lunchboxImg,
    imageAlt: '06. Siga Wet',
    priceBirr: 380,
    unit: 'box',
    highlights: [
      'Tender pieces of beef coated in a thick sauce',
      'Intense berbere seasoning with fragrant spiced butter',
      'Traditionally served over layers of injera',
    ],
  },
  {
    id: 'lunchbox-minchet-abish',
    name: '07. Minchet Abish',
    category: 'lunch-box',
    categoryLabel: 'Lunch Box',
    description:
      'Finely minced beef cooked with onions, berbere, garlic, and traditional Ethiopian spices until the meat absorbs the seasoning and forms a rich, cohesive stew.',
    image: lunchBoxImg,
    imageAlt: '07. Minchet Abish',
    priceBirr: 360,
    unit: 'box',
    highlights: [
      'Fine, tender beef with a concentrated flavor',
      'Deep red seasoning with a warming spice profile',
      'Easy to portion for lunchboxes served with injera',
    ],
  },
  {
    id: 'lunchbox-quanta-firfir',
    name: '08. Quanta Firfir',
    category: 'lunch-box',
    categoryLabel: 'Lunch Box',
    description:
      'Traditionally prepared dried beef simmered in a berbere and onion sauce, then mixed with pieces of injera so the bread absorbs the rich, savory flavors.',
    image: lunchBoxImg,
    imageAlt: '08. Quanta Firfir',
    priceBirr: 380,
    unit: 'box',
    highlights: [
      'Distinctive dried beef with concentrated meat flavor',
      'Tangy injera coated in a spicy red sauce',
      'A filling, traditional Ethiopian meal in one package',
    ],
  },
  {
    id: 'lunchbox-gomen-besiga',
    name: '09. Gomen Besiga',
    category: 'lunch-box',
    categoryLabel: 'Lunch Box',
    description:
      'Tender beef cooked together with finely chopped collard greens, onions, garlic, and Ethiopian spices, bringing the richness of meat together with the earthy flavor of greens.',
    image: lunchboxImg,
    imageAlt: '09. Gomen Besiga',
    priceBirr: 360,
    unit: 'box',
    highlights: [
      'A savory combination of beef and leafy greens',
      'Balanced seasoning and a comforting home-cooked taste',
      'Works well with injera or rice and a simple side salad',
    ],
  },
  {
    id: 'lunchbox-siga-tibs',
    name: '10. Siga Tibs',
    category: 'lunch-box',
    categoryLabel: 'Lunch Box',
    description:
      'Bite-sized beef pieces sautéed with onions, garlic, green chili, and aromatic rosemary, then seasoned with Ethiopian spices for a savory dish with a satisfying seared finish.',
    image: lunchBoxImg,
    imageAlt: '10. Siga Tibs',
    priceBirr: 390,
    unit: 'box',
    highlights: [
      'Juicy beef chunks with lightly browned edges',
      'Fragrant rosemary, onions, and green chili',
      'A hearty meat option served with injera',
    ],
  },

  // 2. Buffet Packages
  {
    id: 'buffet-executive-corporate',
    name: '01. Executive Corporate & Diplomatic Buffet',
    category: 'buffet',
    categoryLabel: 'Buffet Packages',
    description:
      'Elegant buffet catering designed for executive meetings, diplomatic receptions, corporate functions, and formal business gatherings. Featuring prime Beef Tibs, mild Alicha Wat, seasoned fish, assorted sambusas, and international fusion selections, this package balances authentic Ethiopian flavor with professional presentation.',
    image: corpDiplomaticImg,
    imageAlt: '01. Executive Corporate & Diplomatic Buffet',
    priceBirr: 380,
    unit: 'guest',
    minGuests: 40,
    servesInfo: 'Minimum 40 guests',
    highlights: [
      'Professional chafing-dish presentation',
      'Quick setup and breakdown',
      'Custom dietary and dish labels',
      'Professional buffet service staff',
    ],
  },
  {
    id: 'buffet-wedding-grand',
    name: '02. Wedding & Engagement Grand Buffet',
    category: 'buffet',
    categoryLabel: 'Buffet Packages',
    description:
      'Make your special day memorable with an abundant buffet that honors Ethiopian celebration traditions. Featuring carefully prepared meat dishes, traditional stews, vibrant sides, and a beautifully arranged serving station, this package is designed for weddings, engagements, and large family receptions.',
    image: eventCateringImg,
    imageAlt: '02. Wedding & Engagement Grand Buffet',
    priceBirr: 650,
    unit: 'guest',
    minGuests: 100,
    servesInfo: 'Minimum 100 guests',
    highlights: [
      'Multiple Ethiopian meat and stew selections',
      'Injera, rice, and vegetable accompaniments',
      'Fresh salad, sauces, and traditional condiments',
      'Styled buffet presentation and serving stations',
      'Professional catering staff & coordination',
      'Optional Add-ons: Wedding cake, pastry table, juice station, coffee ceremony',
    ],
  },
  {
    id: 'buffet-birthday-celebration',
    name: '03. Birthday & Graduation Celebration Buffet',
    category: 'buffet',
    categoryLabel: 'Buffet Packages',
    description:
      'Turn birthdays, graduations, anniversaries, and family milestones into memorable celebrations with a buffet that combines traditional Ethiopian favorites with popular crowd-pleasing dishes. The menu offers flexible choices for guests of different ages and food preferences.',
    image: birthdayGradBuffetImg,
    imageAlt: '03. Birthday & Graduation Celebration Buffet',
    priceBirr: 420,
    unit: 'guest',
    minGuests: 30,
    servesInfo: 'Minimum 30 guests',
    highlights: [
      'Choice of Doro Wat, Siga Tibs, or seasoned chicken',
      'Injera or rice with vegetable accompaniments',
      'Fresh salad and selected sauces',
      'Buffet table setup and food labels',
      'Basic serving equipment and catering staff',
      'Optional Add-ons: Celebration cake, cupcakes, pastries, fruit platters',
    ],
  },
  {
    id: 'buffet-conference-lunch',
    name: '04. Conference & Training Lunch Buffet',
    category: 'buffet',
    categoryLabel: 'Buffet Packages',
    description:
      'Keep conferences, workshops, and training sessions running smoothly with an organized lunch buffet that is satisfying, efficient, and easy to serve. This package combines familiar Ethiopian dishes with convenient meal options, making it suitable for organizations hosting full-day events and professional development programs.',
    image: services3Img,
    imageAlt: '04. Conference & Training Lunch Buffet',
    priceBirr: 350,
    unit: 'guest',
    minGuests: 30,
    servesInfo: 'Minimum 30 guests',
    highlights: [
      'One main protein dish and selected sides',
      'Rice or injera with fresh salad',
      'Organized serving station for efficient guest flow',
      'Clearly marked vegetarian and fasting selections',
      'Setup, serving equipment, and breakdown',
      'Optional Add-ons: Coffee break, refreshments, pastries, bottled water',
    ],
  },
  {
    id: 'buffet-traditional-jebena-coffee',
    name: '05. Traditional Jebena Coffee',
    category: 'buffet',
    categoryLabel: 'Buffet Packages',
    description:
      'A complete sensory experience celebrating Ethiopian coffee and hospitality. Freshly roasted highland coffee beans, the aroma of frankincense, traditional popcorn, and warm spiced honey bread create a welcoming ceremonial experience for guests to gather, share, and connect.',
    image: jebenaCoffeeImg,
    imageAlt: '05. Traditional Jebena Coffee',
    priceBirr: 120,
    unit: 'guest',
    minGuests: 25,
    servesInfo: 'Minimum 25 guests',
    highlights: [
      'Live coffee bean roasting and traditional grinding',
      'Clay Jebena and Cini cups',
      'Traditional incense and grass-spread presentation',
      'Freshly baked Defo Dabo',
      'Traditional popcorn and coffee accompaniments',
      'Ideal For: Cultural events, engagements, celebrations & receptions',
    ],
  },
  {
    id: 'buffet-condolence-gathering',
    name: '06. Condolence & Memorial Gathering Buffet',
    category: 'buffet',
    categoryLabel: 'Buffet Packages',
    description:
      'Thoughtfully prepared catering for condolence gatherings and memorial services, where sharing a meal is an important expression of care and community. This package emphasizes familiar Ethiopian dishes, practical buffet service, and options to accommodate the family’s dietary and cultural preferences.',
    image: condolenceBuffetImg,
    imageAlt: '06. Condolence & Memorial Gathering Buffet',
    priceBirr: 300,
    unit: 'guest',
    minGuests: 30,
    servesInfo: 'Minimum 30 guests',
    highlights: [
      'Choice of Shiro Wat, Siga Alicha, or other selected main dishes',
      'Injera and vegetable sides',
      'Fresh salad and drinking water',
      'Practical buffet arrangement and serving utensils',
      'Setup and breakdown',
      'Optional Add-ons: Fully fasting menu, takeaway packaging, coffee & tea service',
    ],
  },
  {
    id: 'buffet-celebration-dessert-pastry',
    name: '07. Celebration Dessert & Pastry Buffet',
    category: 'buffet',
    categoryLabel: 'Buffet Packages',
    description:
      'Create an inviting dessert experience with a spread of cakes, pastries, and bite-sized sweets arranged for guests to sample and enjoy. Designed for weddings, corporate receptions, graduations, birthdays, and special occasions, this package transforms the dessert table into a highlight of the event.',
    image: celebrationDessertBuffetImg,
    imageAlt: '07. Celebration Dessert & Pastry Buffet',
    priceBirr: 400,
    unit: 'guest',
    minGuests: 25,
    servesInfo: 'Minimum 25 guests',
    highlights: [
      'Assorted cake slices and mini cakes',
      'Cupcakes, cookies, and mini pastries',
      'A selection of tartlets or other bite-sized sweets',
      'Organized dessert display and serving trays',
      'Basic setup and arrangement',
      'Optional Add-ons: Custom celebration cake, chocolate fountain, fresh fruit display, coffee and tea station, upgraded decorations, and service staff',
    ],
  },

  // 3. Agelgel Packages
  {
    id: 'agelgel-small-fasting',
    name: '01. Small Fasting Agelgel',
    category: 'agelgel',
    categoryLabel: 'Agelgel',
    description:
      'A traditional fasting platter prepared for small family gatherings and intimate occasions. Fresh injera is arranged with a selection of Ethiopian plant-based stews and vegetables, offering the comforting flavors of a traditional yetsom meal.',
    image: smallFastingAgelgelImg,
    imageAlt: '01. Small Fasting Agelgel',
    priceBirr: 2200,
    unit: 'package',
    servesInfo: 'Serves 7 guests',
    highlights: [
      'Fresh injera arranged for sharing',
      'Shiro Wat & Misir Wat',
      'Kik Alicha',
      'Gomen or Atakilt Wat',
      'Fresh tomato and onion salad',
    ],
  },
  {
    id: 'agelgel-family-fasting',
    name: '02. Family Fasting Agelgel',
    category: 'agelgel',
    categoryLabel: 'Agelgel',
    description:
      'Share the richness of Ethiopian fasting cuisine with an expanded assortment of traditional stews, greens, and vegetables. This package is well suited to family visits, small Mahiber gatherings, and fasting-season hospitality.',
    image: midFastingAgelgelImg,
    imageAlt: '02. Family Fasting Agelgel',
    priceBirr: 3000,
    unit: 'package',
    servesInfo: 'Serves 10 guests',
    highlights: [
      'Generous serving of fresh injera',
      'Shiro Wat & Misir Wat',
      'Kik Alicha & Atakilt Wat',
      'Gomen and Fosolia',
      'Timatim Salata & traditional fasting condiments',
    ],
  },
  {
    id: 'agelgel-grand-fasting',
    name: '03. Grand Fasting Agelgel',
    category: 'agelgel',
    categoryLabel: 'Agelgel',
    description:
      'A generous traditional fasting feast created for larger family occasions, community gatherings, and religious celebrations. Multiple colorful wats and vegetable dishes are arranged over injera, offering guests a wide variety of authentic Ethiopian flavors.',
    image: bigFastingAgelgelImg,
    imageAlt: '03. Grand Fasting Agelgel',
    priceBirr: 5900,
    unit: 'package',
    servesInfo: 'Serves 20 guests',
    highlights: [
      'Large shared injera platter with additional injera',
      'Shiro Wat and Misir Wat',
      'Kik Alicha and Ater Kik',
      'Atakilt Wat, Gomen and Fosolia',
      'Azifa or Timatim Salata & fasting condiments',
    ],
  },
  {
    id: 'agelgel-small-non-fasting',
    name: '04. Small Non-Fasting Agelgel',
    category: 'agelgel',
    categoryLabel: 'Agelgel',
    description:
      'A traditional Ethiopian meat platter made for intimate gatherings and family meals. Featuring richly seasoned wats, tender meat, and familiar vegetable accompaniments, this Agelgel brings the warmth of a shared Ethiopian feast to the table.',
    image: smallNonFastingAgelgelImg,
    imageAlt: '04. Small Non-Fasting Agelgel',
    priceBirr: 3000,
    unit: 'package',
    servesInfo: 'Serves 7 guests',
    highlights: [
      'Fresh injera arranged for sharing',
      'Siga Wat & Doro Wat with boiled eggs',
      'Siga Alicha Wat & Gomen Besiga',
      'Atakilt Wat',
      'Fresh tomato salad and traditional condiments',
    ],
  },
  {
    id: 'agelgel-family-non-fasting',
    name: '05. Family Non-Fasting Agelgel',
    category: 'agelgel',
    categoryLabel: 'Agelgel',
    description:
      'A hearty assortment of traditional Ethiopian meat dishes and vegetable sides designed for family celebrations, weekend gatherings, and home entertaining. Every selection contributes a different flavor, from spicy berbere stews to mild alicha and savory greens with beef.',
    image: midNonFastingAgelgelImg,
    imageAlt: '05. Family Non-Fasting Agelgel',
    priceBirr: 4200,
    unit: 'package',
    servesInfo: 'Serves 10 guests',
    highlights: [
      'Generous serving of fresh injera',
      'Siga Wat & Doro Wat with boiled eggs',
      'Siga Tibs & Siga Alicha Wat',
      'Gomen Besiga & Atakilt Wat with fresh salad',
      'Traditional awaze and selected condiments',
    ],
  },
  {
    id: 'agelgel-grand-non-fasting',
    name: '06. Grand Non-Fasting Agelgel',
    category: 'agelgel',
    categoryLabel: 'Agelgel',
    description:
      'A generous Ethiopian feast designed for larger family gatherings, holidays, engagement celebrations, and special occasions. This expanded assortment brings together traditional beef and chicken dishes, optional lamb specialties, and colorful accompaniments for a memorable shared dining experience.',
    image: bigNonFastingAgelgelImg,
    imageAlt: '06. Grand Non-Fasting Agelgel',
    priceBirr: 8400,
    unit: 'package',
    servesInfo: 'Serves 20 guests',
    highlights: [
      'Large shared injera platter with additional injera',
      'Siga Wat and Doro Wat with boiled eggs',
      'Siga Tibs & Siga Alicha Wat',
      'Gomen Besiga & Atakilt Wat',
      'Fresh salad, awaze, mitmita & condiments',
      'Optional upgrade: Yebeg Wat or Yebeg Tibs',
    ],
  },

  // 4. Cakes & Pastries
  {
    id: 'cake-birthday-celebration',
    name: '01. Birthday & Celebration Cakes',
    category: 'cakes-pastries',
    categoryLabel: 'Cakes & Pastries',
    description:
      'Make every celebration sweeter with a freshly baked cake crafted for the occasion. From classic chocolate and vanilla to marble and red velvet, our celebration cakes combine soft, moist layers with smooth frosting and personalized decoration for birthdays, anniversaries, and special family moments.',
    image: birthdayCakesImg,
    imageAlt: '01. Birthday & Celebration Cakes',
    priceBirr: 1800,
    unit: 'cake',
    servesInfo: 'Minimum 1 cake',
    highlights: [
      'Choice of vanilla, chocolate, marble, or banana cake',
      'Buttercream frosting and simple decoration',
      'Personalized birthday message',
      'Standard cake box and presentation',
      'Custom colors and designs available at an additional cost',
    ],
  },
  {
    id: 'cake-wedding-engagement',
    name: '02. Wedding & Engagement Cakes',
    category: 'cakes-pastries',
    categoryLabel: 'Cakes & Pastries',
    description:
      "A beautiful centerpiece for a memorable beginning. Our wedding and engagement cakes can be tailored to the couple's preferred colors, flavors, and celebration style, from understated floral elegance to multi-tier designs for grand receptions.",
    image: weddingCakesImg,
    imageAlt: '02. Wedding & Engagement Cakes',
    priceBirr: 7500,
    unit: 'cake',
    servesInfo: 'Minimum 1 custom cake',
    highlights: [
      'Custom wedding or engagement design',
      'Choice of cake flavors and fillings',
      'Coordinated colors and decorative finish',
      'Cake board and protective packaging',
      'Delivery, tiered construction, and venue setup quoted according to requirements',
    ],
  },
  {
    id: 'cake-corporate-graduation',
    name: '03. Corporate, Graduation & Logo Cakes',
    category: 'cakes-pastries',
    categoryLabel: 'Cakes & Pastries',
    description:
      'Recognize milestones, celebrate achievements, and mark important business occasions with a professionally finished cake. Suitable for office anniversaries, employee celebrations, product launches, graduations, and organizational events, these cakes can reflect a company identity or the theme of the occasion.',
    image: cupcakeMiniBoxesImg,
    imageAlt: '03. Corporate, Graduation & Logo Cakes',
    priceBirr: 2500,
    unit: 'cake',
    servesInfo: 'Minimum 1 cake',
    highlights: [
      'Choice of standard cake flavor',
      'Company name, logo-style decoration, or graduation message',
      'Colors customized to the event theme',
      'Professional finishing and packaging',
      'Bulk cake orders available for larger events',
    ],
  },
  {
    id: 'cake-fasting',
    name: '04. Fasting Cake',
    category: 'cakes-pastries',
    categoryLabel: 'Cakes & Pastries',
    description:
      'Enjoy soft, flavorful cakes made with plant-based ingredients for Ethiopian Orthodox fasting periods and customers seeking dairy-free and egg-free options. This selection features familiar flavors prepared without compromising on moisture, sweetness, or presentation.',
    image: fastingCakeImg,
    imageAlt: '04. Fasting Cake',
    priceBirr: 1600,
    unit: 'cake',
    servesInfo: 'Minimum 1 cake',
    highlights: [
      'Choice of fasting chocolate, orange, or banana cake',
      'Plant-based ingredients without eggs, dairy, or butter',
      'Suitable plant-based frosting where requested',
      'Standard cake presentation and packaging',
      'Custom decoration available on request',
    ],
  },
  {
    id: 'cake-cupcake-mini-boxes',
    name: '05. Cupcake & Mini Cake Boxes',
    category: 'cakes-pastries',
    categoryLabel: 'Cakes & Pastries',
    description:
      "Small, beautifully decorated treats that make celebrations easy to share. Our cupcake and mini cake selection is designed for birthdays, children's parties, office gatherings, school celebrations, and dessert tables where guests can enjoy individual portions.",
    image: cupcakeMiniBoxesImg,
    imageAlt: '05. Cupcake & Mini Cake Boxes',
    priceBirr: 1200,
    unit: 'dozen',
    servesInfo: 'Minimum 12 pieces',
    highlights: [
      'Twelve cupcakes or an agreed assortment of mini cakes',
      'Choice of vanilla, chocolate, marble, or banana flavors',
      'Buttercream topping and simple decoration',
      'Individual portions for convenient serving',
      'Custom colors, themed decorations, and larger quantities available',
    ],
  },
  {
    id: 'pastry-fasting-box',
    name: '06. Fasting Pastry Box',
    category: 'cakes-pastries',
    categoryLabel: 'Cakes & Pastries',
    description:
      'A plant-based pastry assortment created for fasting seasons, coffee gatherings, office refreshments, and customers who prefer egg-free and dairy-free treats. The selection focuses on familiar bakery flavors prepared with suitable alternatives to butter, milk, and eggs.',
    image: fastingPastryBoxImg,
    imageAlt: '06. Fasting Pastry Box',
    priceBirr: 1100,
    unit: 'box',
    servesInfo: 'Minimum 12 pieces',
    highlights: [
      'Fasting banana or orange mini cakes',
      'Plant-based muffins or sweet pastry bites',
      'Suitable fasting cookies or vegan cinnamon rolls',
      'Assorted portions in a convenient box',
      'Plant-based ingredients with no eggs, dairy, or butter',
    ],
  },
  {
    id: 'pastry-savory-sambusa',
    name: '07. Savory Pastry & Sambusa',
    category: 'cakes-pastries',
    categoryLabel: 'Cakes & Pastries',
    description:
      'A satisfying assortment of golden, savory bites prepared for office meetings, coffee breaks, family gatherings, and parties. Combining familiar Ethiopian sambusas with assorted baked snacks, this platter provides convenient finger foods that guests can enjoy without needing a full meal.',
    image: savoryPastrySambusaImg,
    imageAlt: '07. Savory Pastry & Sambusa',
    priceBirr: 1800,
    unit: 'platter',
    servesInfo: 'Minimum 20 pieces',
    highlights: [
      'Ethiopian lentil sambusas',
      'Beef or chicken sambusas, according to selection',
      'Mini savory rolls or pizza pastries',
      'Optional vegetable-filled pastry bites & dipping sauces',
      'Fasting option: fully plant-based platter with lentil sambusas without eggs or dairy',
    ],
  },

  // 4. Cookies & Muffins (Freshly baked, crisp & made to share)
  {
    id: 'cookies-01-butter',
    name: '01. Butter Cookies',
    category: 'cookies-muffins',
    categoryLabel: 'Cookies & Muffins',
    description:
      'Traditional butter cookies baked to a light golden finish, with a delicate crumb and rich buttery aroma.',
    image: butterCookiesImg,
    imageAlt: '01. Butter Cookies',
    priceBirr: 350,
    unit: 'box',
    highlights: [
      'Rich buttery flavor with a melt-in-the-mouth texture',
      'Lightly crisp edges and a tender center',
      'Perfect for coffee ceremonies, tea breaks, and gift boxes',
    ],
    servesInfo: 'Box of 18–24 cookies',
  },
  {
    id: 'cookies-02-oat',
    name: '02. Oat Cookies',
    category: 'cookies-muffins',
    categoryLabel: 'Cookies & Muffins',
    description:
      'Golden cookies made with rolled oats, offering a hearty texture and a naturally warm, nutty flavor.',
    image: oatCookiesImg,
    imageAlt: '02. Oat Cookies',
    priceBirr: 340,
    unit: 'box',
    highlights: [
      'Toasted oat flavor with a satisfying crunch',
      'Balanced sweetness and a rustic grain character',
      'Ideal for snack boxes, office breaks, and everyday treats',
    ],
    servesInfo: 'Box of 18–24 cookies',
  },
  {
    id: 'cookies-03-teff',
    name: '03. Teff Cookies',
    category: 'cookies-muffins',
    categoryLabel: 'Cookies & Muffins',
    description:
      "Inspired by Ethiopia's beloved teff grain, these cookies offer an earthy flavor with subtle toasted notes and a distinctive local character.",
    image: teffCookiesImg,
    imageAlt: '03. Teff Cookies',
    priceBirr: 380,
    unit: 'box',
    highlights: [
      'Distinctive teff flavor with a roasted aroma',
      'Delicate texture and a satisfying bite',
      'A signature Ethiopian-inspired option for specialty pastry boxes',
    ],
    servesInfo: 'Box of 18–24 cookies',
  },
  {
    id: 'cookies-04-barley',
    name: '04. Barley Cookies',
    category: 'cookies-muffins',
    categoryLabel: 'Cookies & Muffins',
    description:
      "Rustic cookies featuring barley's subtle, toasted grain flavor, offering a distinctive alternative to everyday bakery favorites.",
    image: barleyCookiesImg,
    imageAlt: '04. Barley Cookies',
    priceBirr: 340,
    unit: 'box',
    highlights: [
      'Mild, nutty flavor with a satisfying texture',
      'Lightly crisp and pleasantly rustic',
      'Excellent for coffee service, hospitality trays, and mixed cookie boxes',
    ],
    servesInfo: 'Box of 18–24 cookies',
  },
  {
    id: 'cookies-05-chocolate',
    name: '05. Chocolate Cookies',
    category: 'cookies-muffins',
    categoryLabel: 'Cookies & Muffins',
    description:
      'A timeless favorite baked with chocolate chips throughout a soft, buttery cookie, creating a delicious contrast between crisp edges and a tender center.',
    image: cinnamonCookiesImg,
    imageAlt: '05. Chocolate Cookies',
    priceBirr: 380,
    unit: 'box',
    highlights: [
      'Generous chocolate chips in every bite',
      'Buttery flavor with a soft-centered texture',
      'Perfect for children, celebrations, and everyday indulgence',
    ],
    servesInfo: 'Box of 18–24 cookies',
  },
  {
    id: 'cookies-06-cinnamon',
    name: '06. Cinnamon Cookies',
    category: 'cookies-muffins',
    categoryLabel: 'Cookies & Muffins',
    description:
      'A comforting cookie combining sweet raisins with aromatic cinnamon for a warm, gently spiced flavor.',
    image: cinnamonCookiesImg,
    imageAlt: '06. Cinnamon Cookies',
    priceBirr: 350,
    unit: 'box',
    highlights: [
      'Sweet raisin pieces with fragrant cinnamon',
      'A balance of soft fruit and crisp cookie texture',
      'Ideal for morning refreshments, coffee breaks, and sharing',
    ],
    servesInfo: 'Box of 18–24 cookies',
  },
  {
    id: 'cookies-07-ginger-spice',
    name: '07. Ginger Spice Cookies',
    category: 'cookies-muffins',
    categoryLabel: 'Cookies & Muffins',
    description:
      'Fragrant cookies baked with ginger and complementary spices, creating a gently warming flavor and a golden, lightly crisp finish.',
    image: gingerSpiceCookiesImg,
    imageAlt: '07. Ginger Spice Cookies',
    priceBirr: 350,
    unit: 'box',
    highlights: [
      'Distinctive ginger aroma with warming spice notes',
      'Crisp edges and a satisfying bite',
      'Wonderful with Ethiopian coffee, tea, and seasonal refreshments',
    ],
    servesInfo: 'Box of 18–24 cookies',
  },
  {
    id: 'cookies-08-sugar',
    name: '08. Sugar Cookies',
    category: 'cookies-muffins',
    categoryLabel: 'Cookies & Muffins',
    description:
      'Light, buttery cookies with a clean, delicate sweetness, available plain or decorated to suit celebrations and special occasions.',
    image: sugarCookiesImg,
    imageAlt: '08. Sugar Cookies',
    priceBirr: 330,
    unit: 'box',
    highlights: [
      'Smooth, lightly sweet flavor',
      'Crisp or tender texture depending on the style',
      'Custom shapes and decoration for birthdays, holidays, and corporate events',
    ],
    servesInfo: 'Box of 18–24 cookies',
  },
  {
    id: 'muffins-01-vanilla',
    name: '01. Vanilla Muffins',
    category: 'cookies-muffins',
    categoryLabel: 'Cookies & Muffins',
    description:
      'Light, tender muffins baked with a smooth vanilla flavor and a gently sweet finish. Their simple, comforting taste makes them a versatile favorite for children, adults, and guests at any gathering.',
    image: vanillaMuffinsImg,
    imageAlt: '01. Vanilla Muffins',
    priceBirr: 420,
    unit: 'basket',
    highlights: [
      'Soft, moist crumb with a delicate vanilla aroma',
      'Light sweetness and a golden baked top',
      'Perfect for breakfast, coffee breaks, school events, and celebrations',
    ],
    servesInfo: 'Box of 6–12 muffins',
  },
  {
    id: 'muffins-02-chocolate',
    name: '02. Chocolate Muffins',
    category: 'cookies-muffins',
    categoryLabel: 'Cookies & Muffins',
    description:
      'Indulge in the deep flavor of chocolate with muffins baked to a moist, tender finish. Rich cocoa and a soft interior create a satisfying treat for chocolate lovers, whether enjoyed on their own or paired with coffee.',
    image: chocolateMuffinsImg,
    imageAlt: '02. Chocolate Muffins',
    priceBirr: 450,
    unit: 'basket',
    highlights: [
      'Full cocoa flavor with a tender, moist texture',
      'Rich chocolate aroma and a lightly golden top',
      'Ideal for dessert tables, birthday gatherings, and everyday treats',
    ],
    servesInfo: 'Box of 6–12 muffins',
  },
  {
    id: 'muffins-03-banana',
    name: '03. Banana Muffins',
    category: 'cookies-muffins',
    categoryLabel: 'Cookies & Muffins',
    description:
      'A comforting bakery favorite prepared with ripe bananas for a soft texture and familiar fruity sweetness. Each muffin brings a warm, home-baked character that works beautifully for breakfast, snack boxes, and afternoon refreshments.',
    image: bananaMuffinsImg,
    imageAlt: '03. Banana Muffins',
    priceBirr: 420,
    unit: 'basket',
    highlights: [
      'Sweet banana flavor with a soft, moist crumb',
      'Warm aroma and a tender texture',
      'Great for breakfast boxes, lunchboxes, and coffee gatherings',
    ],
    servesInfo: 'Box of 6–12 muffins',
  },
  {
    id: 'muffins-04-cinnamon',
    name: '04. Cinnamon Muffins',
    category: 'cookies-muffins',
    categoryLabel: 'Cookies & Muffins',
    description:
      'Fragrant muffins prepared with grated carrot and warming cinnamon for a comforting combination of gentle spice, natural sweetness, and moisture. Baked to a golden finish, they bring a cozy, aromatic flavor to any coffee break or breakfast table.',
    image: chocolateMuffinsImg,
    imageAlt: '04. Cinnamon Muffins',
    priceBirr: 440,
    unit: 'basket',
    highlights: [
      'Warming cinnamon with the subtle sweetness of carrot',
      'Moist texture with a delicate, spiced aroma',
      'Perfect for morning refreshments, tea breaks, and mixed muffin boxes',
    ],
    servesInfo: 'Box of 6–12 muffins',
  },
  // 5. Traditional bread
  {
    id: 'bread-01-difo-dabo-5kg',
    name: '01. Difo Dabo (5 kg)',
    category: 'traditional-bread',
    categoryLabel: 'Traditional bread',
    description:
      'A traditional Ethiopian celebration bread known for its round shape, soft interior, and distinctive freshly baked aroma. Prepared using a traditional leaf-lined baking method, this 5 kg Difo Dabo is suitable for holidays, family gatherings, cultural celebrations, and special occasions.',
    image: difoDaboImg,
    imageAlt: '01. Difo Dabo (5 kg)',
    priceBirr: 1000,
    unit: 'Loaf',
    priceLabel: 'Price (per Loaf)',
    hideUnitSuffix: true,
    highlights: [
      'Freshly baked loaf with a golden crust and soft, porous interior',
      'Traditional wheat-based dough with a warm, freshly baked aroma',
      'Suitable for holidays, family gatherings, festive meals, and cultural celebrations',
    ],
  },
  {
    id: 'bread-02-ye-zebib-dabo-1kg',
    name: '02. Ye Zebib Dabo (1 KG)',
    category: 'traditional-bread',
    categoryLabel: 'Traditional bread',
    description:
      'A freshly baked Ethiopian style bread made with sweet raisins folded into soft, golden dough. Ye Zebib Dabo combines the comforting taste of traditional bread with little bursts of fruity sweetness, making it a delightful choice for breakfast, coffee ceremonies, family gatherings, and everyday enjoyment.',
    image: zebibImg,
    imageAlt: '02. Ye Zebib Dabo (1 KG)',
    priceBirr: 500,
    unit: 'Loaf',
    priceLabel: 'Price (per Loaf)',
    hideUnitSuffix: true,
    highlights: [
      'Freshly baked 1 kg loaf with a golden crust, soft interior, and raisins throughout',
      'A balanced flavor combining traditional bread notes with natural fruity sweetness',
      'Ideal for breakfast, Ethiopian coffee ceremonies, family gatherings, and sharing with guests',
    ],
  },
  {
    id: 'bread-03-ambasha',
    name: '03. Ambasha',
    category: 'traditional-bread',
    categoryLabel: 'Traditional bread',
    description:
      'Ambasha is a traditional round Ethiopian and Eritrean bread recognized for its decorative surface and inviting baked aroma. Often marked with an attractive pattern before baking, it can feature a mildly sweet flavor and aromatic seasoning, making it as appealing on a celebration table as it is alongside a cup of coffee.',
    image: ambashaImg,
    imageAlt: '03. Ambasha',
    priceBirr: 400,
    unit: 'Loaf',
    priceLabel: 'Price (per Loaf)',
    hideUnitSuffix: true,
    highlights: [
      'Distinctive round shape with decorative scoring',
      'Soft, satisfying texture with optional aromatic spices',
      'Beautifully suited to celebrations, family visits, and traditional coffee service',
    ],
  },
  {
    id: 'bread-04-ambasha-slice',
    name: '04. Ambasha slice',
    category: 'traditional-bread',
    categoryLabel: 'Traditional bread',
    description:
      'A slice of traditional Ethiopian Ambasha, known for its decorative surface, soft texture, and distinctive baked aroma. Prepared with a lightly seasoned dough, this traditional bread offers a balanced flavor that pairs well with Ethiopian coffee, tea, and family meals.',
    image: ambashaSliceImg,
    imageAlt: '04. Ambasha slice',
    priceBirr: 30,
    unit: 'Slice',
    priceLabel: 'Price (per Slice)',
    hideUnitSuffix: true,
    highlights: [
      'Freshly baked Ambasha slice with a golden finish and soft interior',
      'Traditional bread flavor with a delicate aroma and lightly seasoned taste',
      'Suitable for coffee ceremonies, family gatherings, celebrations, and everyday enjoyment',
    ],
  },
];
