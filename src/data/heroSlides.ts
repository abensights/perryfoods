import lunchBoxImg from '../assets/Lunch Box.jpg';
import breadImg from '../assets/Bread Catering.jpg';
import ambashaImg from '../assets/Ambasha Catering.jpg';
import eventImg from '../assets/Event Catering.jpg';
import cookieImg from '../assets/Cookie Catering.jpg';
import cakeImg from '../assets/Cake catering.jpg';

export interface HeroSlide {
  id: string;
  category: string;
  eyebrow: string;
  header: string;
  title: string;
  description: string;
  imageFileName: string;
  imageUrl: string;
  altText: string;
}

export const heroSlidesData: HeroSlide[] = [
  {
    id: 'lunchbox',
    category: '1. LUNCHBOX CATERING',
    eyebrow: 'WELCOME TO PERRY FOODS',
    header: 'Welcome to\nPerry Foods',
    title: 'Fresh Flavors, Packed for Your Day',
    description:
      "Make every meal convenient, satisfying, and delicious with Perry Foods lunchbox catering. Whether you're organizing a corporate meeting, hosting a training session, planning a gathering, or arranging meals for a team, our lunchbox options bring together tasty food and convenient presentation. From workplace lunches to special occasions, we help make feeding your guests simple and enjoyable.",
    imageFileName: 'Lunch Box.jpg',
    imageUrl: lunchBoxImg,
    altText: 'Perry Foods Lunchbox Catering with freshly prepared artisan meal box',
  },
  {
    id: 'bread',
    category: '2. BREAD CATERING',
    eyebrow: 'WELCOME TO PERRY FOODS',
    header: 'Welcome to\nPerry Foods',
    title: 'Fresh Bread. Beautiful Moments.',
    description:
      'Bring warmth to your table with Perry Foods bread catering. Perfect for gatherings, meetings, celebrations, and everyday hospitality, our bread selections add a comforting touch to any occasion. Whether served alongside a meal or shared with family, friends, colleagues, and guests, bread is a simple pleasure that brings people together.',
    imageFileName: 'Bread Catering.jpg',
    imageUrl: breadImg,
    altText: 'Perry Foods Fresh Bread Catering with oven-warm artisan hearth loaves',
  },
  {
    id: 'ambasha',
    category: '3. AMBASHA CATERING',
    eyebrow: 'WELCOME TO PERRY FOODS',
    header: 'Welcome to\nPerry Foods',
    title: 'Tradition Baked Into Every Slice',
    description:
      'Celebrate the warmth of Ethiopian food culture with Perry Foods ambasha catering. Known for its distinctive appearance and place in traditional food gatherings, ambasha brings a special touch to family occasions, cultural celebrations, and community events. Share the experience with freshly presented ambasha, prepared for the moments when good food and togetherness matter most.',
    imageFileName: 'Ambasha Catering.jpg',
    imageUrl: ambashaImg,
    altText: 'Perry Foods Traditional Ambasha Ethiopian celebration bread',
  },
  {
    id: 'event',
    category: '4. EVENT CATERING',
    eyebrow: 'WELCOME TO PERRY FOODS',
    header: 'Welcome to\nPerry Foods',
    title: 'Great Events Deserve Great Food',
    description:
      'From elegant weddings and memorable celebrations to professional corporate events, Perry Foods helps bring people together through food. Explore catering options designed around your occasion, your guests, and the atmosphere you want to create. Whether you are planning a buffet or arranging food for a special gathering, let us help make your event more memorable with thoughtful food presentation and catering service.',
    imageFileName: 'Event Catering.jpg',
    imageUrl: eventImg,
    altText: 'Perry Foods Grand Celebration Event Catering Buffet',
  },
  {
    id: 'cookie',
    category: '5. COOKIE CATERING',
    eyebrow: 'WELCOME TO PERRY FOODS',
    header: 'Welcome to\nPerry Foods',
    title: 'Sweeten Every Gathering',
    description:
      'Make every gathering a little sweeter with Perry Foods cookie catering. Our cookie selections are perfect for coffee breaks, office meetings, birthdays, family celebrations, parties, and special occasions. From sharing boxes to dessert-table treats, cookies bring a simple, delightful touch to moments worth enjoying together.',
    imageFileName: 'Cookie Catering.jpg',
    imageUrl: cookieImg,
    altText: 'Perry Foods Assorted Cookie Catering Box',
  },
  {
    id: 'cake',
    category: '6. CAKE CATERING',
    eyebrow: 'WELCOME TO PERRY FOODS',
    header: 'Welcome to\nPerry Foods',
    title: 'Every Celebration Deserves a Cake',
    description:
      'Make birthdays, anniversaries, weddings, and special milestones even more memorable with Perry Foods cake catering. Whether you are planning an intimate gathering or a larger celebration, discover cake options that bring sweetness and a beautiful finishing touch to your occasion. Tell us what you are celebrating, and let Perry Foods help you plan the perfect addition to your special day.',
    imageFileName: 'Cake catering.jpg',
    imageUrl: cakeImg,
    altText: 'Perry Foods Bespoke Celebration Cake Catering',
  },
];
