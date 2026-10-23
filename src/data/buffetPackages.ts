export interface BuffetTier {
  id: string;
  name: string;
  badge: string;
  basePricePerPerson: number;
  maxEntrees: number;
  maxPastas: number;
  maxSides: number;
  maxSalads: number;
  description: string;
  includedFeatures: string[];
}

export interface MenuItemOption {
  id: string;
  name: string;
  category: 'entree' | 'pasta' | 'side' | 'salad' | 'dessert';
  description: string;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  premiumAddon?: number;
}

export const buffetTiers: BuffetTier[] = [
  {
    id: 'classic',
    name: 'Classic 2-Entree Buffet',
    badge: 'Popular Choice',
    basePricePerPerson: 22,
    maxEntrees: 2,
    maxPastas: 1,
    maxSides: 2,
    maxSalads: 1,
    description: 'Our most requested buffet package for family gatherings, corporate lunches, and celebrations.',
    includedFeatures: [
      'Freshly baked artisan rolls with herb butter',
      'High-grade disposable plates, cutlery, & napkins',
      'Chafing dishes & serving utensils included',
      'Hot & ready for self-service or buffet staff',
    ],
  },
  {
    id: 'deluxe',
    name: 'Deluxe 3-Entree Buffet',
    badge: 'Great Value',
    basePricePerPerson: 28,
    maxEntrees: 3,
    maxPastas: 1,
    maxSides: 2,
    maxSalads: 2,
    description: 'Expanded variety for weddings, milestone parties, and conferences requiring diverse options.',
    includedFeatures: [
      'Artisan bread basket with garlic herb spreads',
      'Deluxe disposable dinnerware or china upgrade ready',
      'Complete buffet equipment setup',
      'Vegetarian and allergen friendly options included',
    ],
  },
  {
    id: 'executive',
    name: 'Executive Celebration Feast',
    badge: 'Premium Experience',
    basePricePerPerson: 36,
    maxEntrees: 3,
    maxPastas: 2,
    maxSides: 3,
    maxSalads: 2,
    description: 'An abundant culinary showcase featuring prime cuts, specialty pasta, and signature bakery treats.',
    includedFeatures: [
      'Chef-styled buffet presentation with linen accents',
      'Arrival charcuterie display with artisan cheeses & fruit',
      'Custom cake-cutting & dessert table coordination',
      'Dedicated on-site food attendant option available',
    ],
  },
];

export const buffetMenuItems: MenuItemOption[] = [
  // Entrees
  {
    id: 'entree-chicken-rosemary',
    name: 'Rosemary Garlic Roast Chicken',
    category: 'entree',
    description: 'Tender chicken marinated in fresh rosemary, garlic, white wine, and slow-roasted to golden perfection.',
    isGlutenFree: true,
  },
  {
    id: 'entree-braised-beef',
    name: 'Slow-Braised Beef with Rich Gravy',
    category: 'entree',
    description: 'Melt-in-your-mouth braised beef cooked in rich stock with caramelized onions and wild herbs.',
    isGlutenFree: true,
  },
  {
    id: 'entree-baked-salmon',
    name: 'Herb-Crusted Atlantic Salmon',
    category: 'entree',
    description: 'Pan-seared salmon fillet finished with lemon dill glaze and toasted herb breadcrumbs.',
    premiumAddon: 4,
  },
  {
    id: 'entree-parmigiana',
    name: 'Classic Eggplant Parmigiana',
    category: 'entree',
    description: 'Layered oven-baked eggplant, rich house marinara sauce, fresh basil, and melted mozzarella.',
    isVegetarian: true,
  },
  {
    id: 'entree-roast-pork',
    name: 'Spiced Roast Pork Tenderloin',
    category: 'entree',
    description: 'Herb-rubbed sliced pork loin with sweet apple chutney and pan jus.',
    isGlutenFree: true,
  },

  // Pastas
  {
    id: 'pasta-penne-pomodoro',
    name: 'Penne Pomodoro & Basil',
    category: 'pasta',
    description: 'Al dente penne in a slow-simmered San Marzano tomato sauce, sweet basil, and aged parmesan.',
    isVegetarian: true,
  },
  {
    id: 'pasta-baked-lasagna',
    name: 'Homestyle Meat Lasagna',
    category: 'pasta',
    description: 'Classic layered pasta with seasoned beef, ricotta, mozzarella, and savory bolognese sauce.',
  },
  {
    id: 'pasta-alfredo',
    name: 'Fettuccine Creamy Alfredo',
    category: 'pasta',
    description: 'Rich cream and aged parmesan sauce tossed with ribbon pasta and cracked black pepper.',
    isVegetarian: true,
  },

  // Sides
  {
    id: 'side-garlic-mashed',
    name: 'Garlic Butter Mashed Potatoes',
    category: 'side',
    description: 'Yukon Gold potatoes whipped with sweet cream butter, roasted garlic, and chives.',
    isVegetarian: true,
    isGlutenFree: true,
  },
  {
    id: 'side-roasted-veggies',
    name: 'Tuscan Herb Roasted Vegetables',
    category: 'side',
    description: 'Zucchini, sweet bell peppers, red onion, and carrots roasted with extra virgin olive oil.',
    isVegetarian: true,
    isGlutenFree: true,
  },
  {
    id: 'side-rice-pilaf',
    name: 'Wild Rice Pilaf with Herbs',
    category: 'side',
    description: 'Fluffy seasoned wild rice simmered with garden herbs and toasted slivered almonds.',
    isVegetarian: true,
    isGlutenFree: true,
  },
  {
    id: 'side-green-beans',
    name: 'Haricots Verts with Crispy Shallots',
    category: 'side',
    description: 'Crisp green beans sautéed in butter with sea salt and crispy fried shallots.',
    isVegetarian: true,
  },

  // Salads
  {
    id: 'salad-caesar',
    name: 'Crisp Caesar Salad',
    category: 'salad',
    description: 'Fresh romaine lettuce, shaved parmesan, garlic herb croutons, and creamy house Caesar dressing.',
  },
  {
    id: 'salad-garden',
    name: 'Perry Signature Garden Salad',
    category: 'salad',
    description: 'Mixed greens, cherry tomatoes, cucumbers, shredded carrots, and house Italian vinaigrette.',
    isVegetarian: true,
    isGlutenFree: true,
  },
  {
    id: 'salad-greek',
    name: 'Mediterranean Greek Salad',
    category: 'salad',
    description: 'Crisp lettuce, kalamata olives, feta cheese, red onions, cucumbers, and Greek oregano dressing.',
    isVegetarian: true,
    isGlutenFree: true,
  },

  // Bakery & Dessert Add-ons (Perry Foods Specialty)
  {
    id: 'dessert-celebration-cake',
    name: 'Perry Signature Celebration Cake',
    category: 'dessert',
    description: 'Tiered artisan cake with vanilla buttercream and fresh berries, custom designed for your event.',
    premiumAddon: 4,
  },
  {
    id: 'dessert-pastry-platter',
    name: 'Assorted Celebration Pastry Platter',
    category: 'dessert',
    description: 'Mini fruit tartlets, Belgian chocolate eclairs, and French macarons.',
    premiumAddon: 3,
  },
  {
    id: 'dessert-muffin-basket',
    name: 'Freshly Baked Muffin & Pastry Basket',
    category: 'dessert',
    description: 'Warm blueberry muffins, cinnamon swirls, and golden croissants baked fresh daily.',
    premiumAddon: 2.5,
  },
];
