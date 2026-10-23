import lunchboxImg from '../assets/Lunchbox.jpg';
import breadImg from '../assets/Bread.jpg';
import eventImg from '../assets/Event.jpg';
import cookieImg from '../assets/Cookie.jpg';
import cakeImg from '../assets/Cake.jpg';

export interface ServiceCategory {
  id: string;
  category: string;
  tabLabel: string;
  tagline: string;
  title: string;
  description: string;
  imageUrl: string;
  altText: string;
}

export const serviceCategoriesData: ServiceCategory[] = [
  {
    id: 'bread',
    category: '01. BREAD CATERING',
    tabLabel: 'BREAD CATERING',
    tagline: 'FRESH FROM THE TABLE, ROOTED IN TRADITION',
    title: 'Bring Everyone Together with the Taste of Tradition',
    description:
      'There is something special about sharing freshly baked bread. At Perry Foods, our traditional bread,hibest and ambasha catering brings warmth, flavor, and a touch of Ethiopian food culture to every gathering. From family celebrations and cultural occasions to workplace meetings and special events, our selection adds a comforting, memorable touch to your table. Whether served alongside a meal or shared as a centerpiece, every slice is an invitation to connect, celebrate, and enjoy good food together.',
    imageUrl: breadImg,
    altText: 'Perry Foods Traditional Bread, Hibest and Ambasha Catering',
  },
  {
    id: 'cookie',
    category: '02. COOKIE CATERING',
    tabLabel: 'COOKIE CATERING',
    tagline: 'FRESHLY BAKED, PERFECTLY CRISP & MADE TO SHARE',
    title: 'Cookies & Muffins · ኩኪስ እና ማፊን',
    description:
      'From classic butter cookies to rich chocolate creations and Ethiopian grain-inspired favorites, Perry Foods offers a delicious assortment for every taste and occasion. Perfect alongside Ethiopian coffee, served during office breaks, arranged on celebration tables, or packed into thoughtful gift boxes, our cookies and muffins bring a little sweetness to every gathering.',
    imageUrl: cookieImg,
    altText: 'Perry Foods Cookies and Muffins Catering',
  },
  {
    id: 'cake',
    category: '03. CAKE CATERING',
    tabLabel: 'CAKE CATERING',
    tagline: 'MAKE THE MOMENT SWEETER',
    title: 'Every Celebration Has a Cake-Worthy Moment',
    description:
      'Birthdays, anniversaries, weddings, and milestones deserve something memorable. Perry Foods cake catering helps add a sweet finishing touch to the occasions you treasure. Whether you are organizing a small gathering or planning a bigger celebration, tell us about your event and explore cake options that suit your special moment.',
    imageUrl: cakeImg,
    altText: 'Perry Foods Cake Catering for celebrations and milestones',
  },
  {
    id: 'lunchbox',
    category: '04. LUNCHBOX CATERING',
    tabLabel: 'LUNCHBOX CATERING',
    tagline: 'GOOD FOOD, READY WHEN YOU ARE',
    title: 'A Delicious Break in Every Box',
    description:
      "Make every meal convenient, satisfying, and delicious with Perry Foods lunchbox catering. From office lunches and business meetings to workshops, training sessions, and group gatherings, we bring together convenient fasting and non-fasting meals with satisfying flavors.",
    imageUrl: lunchboxImg,
    altText: 'Perry Foods Lunchbox Catering with delicious fasting and non-fasting options',
  },
  {
    id: 'event',
    category: '05. EVENT CATERING',
    tabLabel: 'EVENT CATERING',
    tagline: 'YOUR OCCASION, OUR PASSION FOR FOOD',
    title: 'Make Every Event a Feast to Remember',
    description:
      'The best gatherings bring people together and great food makes those moments even better. Perry Foods provides catering options for weddings, corporate events, celebrations, and special gatherings. From buffet style arrangements to diverse food selections, we help you plan a dining experience suited to your occasion and your guests.',
    imageUrl: eventImg,
    altText: 'Perry Foods Event Catering for weddings and corporate gatherings',
  },
];
