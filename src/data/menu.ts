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

import englishCakeImg from '../assets/Menu/English Cake.webp';
import cinnamonRollImg from '../assets/Menu/Cinnamon Roll.jpg';
import waffleImg from '../assets/Menu/Waffle.jpg';
import cupcakeImg from '../assets/Menu/Cupcake.jpg';
import croissantPackedImg from '../assets/Menu/Croissant packed.jpg';
import croissantChocImg from '../assets/Menu/Croissant with Chocolate.jpg';

import butterCookiesImg from '../assets/Menu/Butter Cookies.jpg';
import oatCookiesImg from '../assets/Menu/Oat Cookies.jpg';
import teffCookiesImg from '../assets/Menu/Teff Cookies.jpg';
import barleyCookiesImg from '../assets/Menu/Barley Cookies.jpg';
import cinnamonCookiesImg from '../assets/Menu/Cinnamon Cookies.jpg';
import gingerSpiceCookiesImg from '../assets/Menu/Ginger Spice Cookies.jpg';
import sugarCookiesImg from '../assets/Menu/Sugar Cookies.jpg';

import difoDaboImg from '../assets/Menu/Difo Dabo.jpg';
import hibistImg from '../assets/Menu/Hibist.jpg';
import mulmulImg from '../assets/Menu/Mulmul.jpg';
import zebibImg from '../assets/Menu/Zebib.jpeg';
import ambashaSliceImg from '../assets/Menu/Ambasha.jpg';

export const menuCategories = [
  { id: 'all', label: 'All sections' },
  { id: 'traditional-bread', label: 'Traditional bread' },
  { id: 'cookies-muffins', label: 'Cookies' },
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
    id: 'cake-01-english-cake',
    name: '01. English Cake',
    category: 'cakes-pastries',
    categoryLabel: 'Cakes & Pastries',
    description:
      'A traditional bakery favorite, English Cake is baked to a soft, tender crumb with a rich buttery flavor and a golden finish. Depending on the recipe, it can include raisins or mixed dried fruits, adding little bursts of sweetness to every slice. Perfect alongside Ethiopian coffee, tea, and refreshments for everyday enjoyment or special gatherings.',
    image: englishCakeImg,
    imageAlt: '01. English Cake',
    priceBirr: 300,
    priceLabel: 'Price',
    hideUnitSuffix: true,
    servesInfo: '1 cake',
    imageClassName: 'object-[center_65%]',
    highlights: [
      'Freshly baked cake with a golden crust and a soft, moist interior',
      'Rich buttery flavor with delicate hints of vanilla and dried fruit',
      'Perfect for coffee ceremonies, tea breaks, and family gatherings',
    ],
  },
  {
    id: 'cake-02-cinnamon-roll',
    name: '02. Cinnamon Roll',
    category: 'cakes-pastries',
    categoryLabel: 'Cakes & Pastries',
    description:
      'Freshly baked cinnamon rolls rolled with aromatic cinnamon, brown sugar, and rich butter, then finished with a smooth, sweet glaze. Soft, fluffy, and fragrant, each bite delivers a comforting blend of warm spice and sweet pastry. Perfect for morning coffee, afternoon tea, office meetings, and special treats.',
    image: cinnamonRollImg,
    imageAlt: '02. Cinnamon Roll',
    priceBirr: 250,
    priceLabel: 'Price',
    hideUnitSuffix: true,
    highlights: [
      'Freshly baked rolls with a soft, fluffy texture and golden-baked edges',
      'Generously layered with rich butter, fragrant cinnamon, and brown sugar',
      'Finished with a smooth glaze for the perfect touch of sweetness',
    ],
  },
  {
    id: 'cake-03-waffle',
    name: '03. Waffle',
    category: 'cakes-pastries',
    categoryLabel: 'Cakes & Pastries',
    description:
      'Crispy on the outside, light and fluffy on the inside, freshly made waffles prepared to golden perfection. With deep pockets designed to hold butter, maple syrup, honey, fresh fruits, or whipped cream, these waffles make a delightful breakfast, brunch, or dessert treat.',
    image: waffleImg,
    imageAlt: '03. Waffle',
    priceBirr: 250,
    priceLabel: 'Price',
    hideUnitSuffix: true,
    highlights: [
      'Freshly baked waffles with a crisp golden exterior and fluffy center',
      'Deep pocketed grid pattern perfect for holding delicious toppings',
      'Pairs wonderfully with honey, maple syrup, chocolate drizzle, or fresh fruit',
    ],
  },
  {
    id: 'cake-04-cupcake',
    name: '04. Cupcake',
    category: 'cakes-pastries',
    categoryLabel: 'Cakes & Pastries',
    description:
      'Individually baked, soft, and moist cupcakes crowned with smooth frosting and delightful toppings. Available in classic flavors like vanilla, chocolate, and strawberry, these cupcakes make every celebration colorful, fun, and easy to share.',
    image: cupcakeImg,
    imageAlt: '04. Cupcake',
    priceBirr: 200,
    priceLabel: 'Price',
    hideUnitSuffix: true,
    highlights: [
      'Freshly baked cupcakes with a soft, moist crumb and light golden finish',
      'Generously topped with creamy frosting and decorative touches',
      'Perfect for birthday parties, school events, office celebrations, and dessert tables',
    ],
  },
  {
    id: 'cake-05-croissant',
    name: '05. Croissant',
    category: 'cakes-pastries',
    categoryLabel: 'Cakes & Pastries',
    description:
      'Classic French-style croissants baked with rich butter and layered to golden, flaky perfection. With a delicate crisp exterior and a light, airy, honeycomb interior, each bite melts with rich buttery flavor.',
    image: croissantPackedImg,
    imageAlt: '05. Croissant',
    priceBirr: 200,
    priceLabel: 'Price',
    hideUnitSuffix: true,
    highlights: [
      'Freshly baked croissants with a crisp, golden crust and airy, layered interior',
      'Rich buttery aroma and melt-in-the-mouth texture',
      'Perfect for breakfast, brunch, coffee breaks, and light sandwiches',
    ],
  },
  {
    id: 'cake-06-croissant-chocolate',
    name: '06. Croissant with Chocolate',
    category: 'cakes-pastries',
    categoryLabel: 'Cakes & Pastries',
    description:
      'A decadent twist on the classic French pastry, these croissants feature flaky, golden layers of buttery dough filled with rich, velvety chocolate. Light and crisp on the outside with a warm, melt-in-your-mouth chocolate center, this pastry is an irresistible treat for any time of the day.',
    image: croissantChocImg,
    imageAlt: '06. Croissant with Chocolate',
    priceBirr: 250,
    priceLabel: 'Price',
    hideUnitSuffix: true,
    highlights: [
      'Freshly baked croissants with a flaky, golden exterior and airy, layered interior',
      'Filled with rich, velvety chocolate that melts deliciously with every bite',
      'Perfect for breakfast, afternoon tea, dessert platters, and sweet cravings',
    ],
  },

  // 4. Cookies (Freshly baked, crisp & made to share)
  {
    id: 'cookies-01-orange',
    name: '01. Orange Cookies',
    category: 'cookies-muffins',
    categoryLabel: 'Cookies',
    description:
      'Freshly baked orange cookies infused with the bright, refreshing flavor of orange zest. With a delicate citrus aroma, a lightly golden finish, and a pleasant balance of sweetness and tang, these cookies are a delightful choice for Ethiopian coffee ceremonies, afternoon tea, and everyday treats.',
    image: butterCookiesImg,
    imageAlt: '01. Orange Cookies',
    priceBirr: 1000,
    unit: 'box',
    priceLabel: 'Price (per Box)',
    hideUnitSuffix: true,
    highlights: [
      'Freshly baked cookies with a golden finish and a delicate, crisp texture',
      'Bright orange flavor with a refreshing citrus aroma and balanced sweetness',
      'Perfect for coffee ceremonies, tea breaks, gift boxes, and celebration platters',
    ],
    servesInfo: 'Box of 18 cookies',
  },
  {
    id: 'cookies-02-oat',
    name: '02. Oat Cookies (Ye Aja Cookies)',
    category: 'cookies-muffins',
    categoryLabel: 'Cookies',
    description:
      'Golden cookies made with rolled oats, offering a hearty texture and a naturally warm, nutty flavor.',
    image: oatCookiesImg,
    imageAlt: '02. Oat Cookies (Ye Aja Cookies)',
    priceBirr: 1000,
    unit: 'box',
    priceLabel: 'Price (per Box)',
    hideUnitSuffix: true,
    highlights: [
      'Toasted oat flavor with a satisfying crunch',
      'Balanced sweetness and a rustic grain character',
      'Ideal for snack boxes, office breaks, and everyday treats',
    ],
    servesInfo: 'Box of 18 cookies',
  },
  {
    id: 'cookies-03-teff',
    name: '03. Teff Cookies',
    category: 'cookies-muffins',
    categoryLabel: 'Cookies',
    description:
      "Inspired by Ethiopia's beloved teff grain, these cookies offer an earthy flavor with subtle toasted notes and a distinctive local character.",
    image: teffCookiesImg,
    imageAlt: '03. Teff Cookies',
    priceBirr: 1000,
    unit: 'box',
    priceLabel: 'Price (per Box)',
    hideUnitSuffix: true,
    highlights: [
      'Distinctive teff flavor with a roasted aroma',
      'Delicate texture and a satisfying bite',
      'A signature Ethiopian-inspired option for specialty pastry boxes',
    ],
    servesInfo: 'Box of 18 cookies',
  },
  {
    id: 'cookies-04-barley',
    name: '04. Barley Cookies (Ye Gebse Cookies)',
    category: 'cookies-muffins',
    categoryLabel: 'Cookies',
    description:
      "Rustic cookies featuring barley's subtle, toasted grain flavor, offering a distinctive alternative to everyday bakery favorites.",
    image: barleyCookiesImg,
    imageAlt: '04. Barley Cookies (Ye Gebse Cookies)',
    priceBirr: 1000,
    unit: 'box',
    priceLabel: 'Price (per Box)',
    hideUnitSuffix: true,
    highlights: [
      'Mild, nutty flavor with a satisfying texture',
      'Lightly crisp and pleasantly rustic',
      'Excellent for coffee service, hospitality trays, and mixed cookie boxes',
    ],
    servesInfo: 'Box of 18 cookies',
  },
  {
    id: 'cookies-05-lemon',
    name: '05. Lemon Cookies',
    category: 'cookies-muffins',
    categoryLabel: 'Cookies',
    description:
      'Freshly baked lemon cookies infused with the refreshing taste of lemon zest. With a delicate citrus aroma, a lightly golden finish, and a balanced sweetness, these cookies offer a bright, refreshing flavor that pairs beautifully with Ethiopian coffee, tea, and everyday treats.',
    image: sugarCookiesImg,
    imageAlt: '05. Lemon Cookies',
    priceBirr: 1000,
    unit: 'box',
    priceLabel: 'Price (per Box)',
    hideUnitSuffix: true,
    highlights: [
      'Freshly baked cookies with a lightly crisp texture and golden finish',
      'Refreshing lemon flavor with a fragrant citrus aroma and gentle sweetness',
      'Perfect for coffee ceremonies, afternoon tea, gift boxes, and celebration platters',
    ],
    servesInfo: 'Box of 18 cookies',
  },
  {
    id: 'cookies-06-cinnamon',
    name: '06. Cinnamon Cookies',
    category: 'cookies-muffins',
    categoryLabel: 'Cookies',
    description:
      'A comforting cookie combining sweet raisins with aromatic cinnamon for a warm, gently spiced flavor.',
    image: cinnamonCookiesImg,
    imageAlt: '06. Cinnamon Cookies',
    priceBirr: 1000,
    unit: 'box',
    priceLabel: 'Price (per Box)',
    hideUnitSuffix: true,
    highlights: [
      'Sweet raisin pieces with fragrant cinnamon',
      'A balance of soft fruit and crisp cookie texture',
      'Ideal for morning refreshments, coffee breaks, and sharing',
    ],
    servesInfo: 'Box of 18 cookies',
  },
  {
    id: 'cookies-07-honey',
    name: '07. Honey Cookies',
    category: 'cookies-muffins',
    categoryLabel: 'Cookies',
    description:
      'Freshly baked honey cookies infused with the warm, natural sweetness of honey. With a golden finish, a delicate texture, and a comforting aroma, these cookies offer a satisfying balance of sweetness and crispness, making them a delightful companion to Ethiopian coffee, tea, and special gatherings.',
    image: gingerSpiceCookiesImg,
    imageAlt: '07. Honey Cookies',
    priceBirr: 1300,
    unit: 'box',
    priceLabel: 'Price (per Box)',
    hideUnitSuffix: true,
    highlights: [
      'Freshly baked cookies with a golden finish and a lightly crisp texture',
      'Warm honey flavor with a delicate aroma and balanced sweetness',
      'Perfect for coffee ceremonies, afternoon tea, gift boxes, and celebration platters',
    ],
    servesInfo: 'Box of 18 cookies',
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
