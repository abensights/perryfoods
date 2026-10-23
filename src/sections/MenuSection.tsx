import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { FoodCard } from '../components/FoodCard';
import { ComingSoonMenuCard } from '../components/ComingSoonMenuCard';
import { MyOrderSection, OrderItemEntry, BankOption } from '../components/MyOrderSection';
import { menuCategories, menuItemsData } from '../data/menu';
import { MenuCategoryFilter, MenuItem } from '../types';
import { ShoppingBag } from 'lucide-react';

import corpDiplomaticImg from '../assets/Menu/Corp Diplomatic.jpg';
import midFastingAgelgelImg from '../assets/Menu/MID Fasting Agelgel.jpg';
import lunchBoxImg from '../assets/Lunch Box.jpg';

export const COMING_SOON_DATA = {
  agelgel: {
    category: 'agelgel' as const,
    categoryLabel: 'Agelgel',
    header: 'Coming Soon',
    body: 'Experience the tradition of Ethiopian shared dining. Our upcoming Agelgel packages will feature authentic Ethiopian dishes served on traditional platters, with fasting and non-fasting options for family gatherings, celebrations, and special occasions.',
    image: midFastingAgelgelImg,
    alt: 'Perry Foods Authentic Ethiopian Agelgel Platter',
  },
  buffet: {
    category: 'buffet' as const,
    categoryLabel: 'Buffet Packages',
    header: 'Coming Soon',
    body: 'Make every occasion special with thoughtfully curated buffet experiences. From traditional Ethiopian feasts to corporate events, weddings, and family celebrations, our upcoming buffet packages will feature authentic flavors and menus tailored to your event.',
    image: corpDiplomaticImg,
    alt: 'Perry Foods Curated Buffet Catering Experience',
  },
  'lunch-box': {
    category: 'lunch-box' as const,
    categoryLabel: 'Lunch Box',
    header: 'Coming Soon',
    body: 'A taste of Ethiopia, packed for your day. Our upcoming lunchbox collection will feature delicious Ethiopian meals, with fasting and non-fasting options for work, school, business meetings, and everyday dining.',
    image: lunchBoxImg,
    alt: 'Perry Foods Ethiopian Lunchbox Collection',
  },
};

interface MenuSectionProps {
  onPlaceOrder?: (item: MenuItem, quantity: number, totalBirr: number) => void;
  onInquireItem?: (itemName: string, category: string) => void;
  onOrderSubmitted?: (details: {
    items: OrderItemEntry[];
    totalBirr: number;
    customerName: string;
    phone: string;
    date: string;
    remark: string;
    selectedBank: BankOption | null;
    paymentSms: string;
  }) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onPlaceOrder,
  onInquireItem,
  onOrderSubmitted,
}) => {
  const [activeFilter, setActiveFilter] = useState<MenuCategoryFilter>(() => {
    try {
      const saved = localStorage.getItem('perry_menu_filter');
      if (
        saved &&
        [
          'all',
          'traditional-bread',
          'cookies-muffins',
          'cakes-pastries',
          'agelgel',
          'buffet',
          'lunch-box',
        ].includes(saved)
      ) {
        return saved as MenuCategoryFilter;
      }
    } catch {
      // ignore
    }
    return 'all';
  });

  // Load persisted order items or start empty
  const [orderItems, setOrderItems] = useState<OrderItemEntry[]>(() => {
    try {
      const saved = localStorage.getItem('perry_order_items');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);

  // Save active filter
  React.useEffect(() => {
    try {
      localStorage.setItem('perry_menu_filter', activeFilter);
    } catch {
      // ignore
    }
  }, [activeFilter]);

  // Listen to category shortcuts dispatched from Header side menu
  React.useEffect(() => {
    const handleCategoryChange = (e: Event) => {
      const custom = e as CustomEvent<string>;
      if (custom.detail) {
        setActiveFilter(custom.detail as MenuCategoryFilter);
      }
    };
    window.addEventListener('perry_change_menu_category', handleCategoryChange);
    return () => {
      window.removeEventListener('perry_change_menu_category', handleCategoryChange);
    };
  }, []);

  // Save order items
  React.useEffect(() => {
    try {
      localStorage.setItem('perry_order_items', JSON.stringify(orderItems));
    } catch {
      // ignore
    }
  }, [orderItems]);

  // Active categories with live orderable food cards in user requested order:
  // 2. Traditional bread, 3. Cookies, 4. Cakes & Pastries
  const sampleCategories = [
    'traditional-bread',
    'cookies-muffins',
    'cakes-pastries',
  ] as const;

  const isAllView = activeFilter === 'all';

  const filteredItems = isAllView
    ? sampleCategories
        .map((cat) => menuItemsData.find((item) => item.category === cat))
        .filter((item): item is MenuItem => Boolean(item))
    : menuItemsData.filter((item) => item.category === activeFilter);

  const navigateToCheckout = () => {
    const el = document.querySelector('#my-order');
    if (el) {
      const headerOffset = window.innerWidth < 768 ? 80 : 96;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  };

  const handlePlaceOrder = (item: MenuItem, quantity: number, totalBirr: number) => {
    setIsOrderSubmitted(false);
    const minGuests = item.category === 'buffet' ? (item.minGuests || 30) : 1;
    const unitPrice = item.priceBirr * minGuests;
    const computedTotal = unitPrice * quantity;

    setOrderItems((prev) => {
      const existing = prev.find((entry) => entry.item.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.item.id === item.id
            ? {
                ...entry,
                quantity: entry.quantity + quantity,
                totalBirr: (entry.quantity + quantity) * unitPrice,
              }
            : entry
        );
      }
      return [...prev, { item, quantity, totalBirr: computedTotal || totalBirr }];
    });

    // NOTE: In-place addition to cart without dragging user away from their current scroll position
    if (onPlaceOrder) {
      onPlaceOrder(item, quantity, computedTotal || totalBirr);
    } else if (onInquireItem) {
      onInquireItem(item.name, item.categoryLabel);
    }
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setOrderItems((prev) =>
      prev.map((entry) => {
        if (entry.item.id !== itemId) return entry;
        const minGuests = entry.item.category === 'buffet' ? (entry.item.minGuests || 30) : 1;
        const unitPrice = entry.item.priceBirr * minGuests;
        return {
          ...entry,
          quantity: newQuantity,
          totalBirr: newQuantity * unitPrice,
        };
      })
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setOrderItems((prev) => prev.filter((entry) => entry.item.id !== itemId));
  };

  const handleClearOrder = () => {
    setOrderItems([]);
    try {
      localStorage.removeItem('perry_order_items');
    } catch {
      // ignore
    }
  };

  const totalCartBirr = orderItems.reduce((acc, curr) => acc + curr.totalBirr, 0);
  const totalCartCount = orderItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <section
      id="menu"
      className="py-20 sm:py-28 bg-[#FFFCF8] dark:bg-[#171513] scroll-mt-20 border-b border-[#EDE5D9] dark:border-[#2E2A26] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Discover Our Food Selection"
          description="Explore the kinds of food and catering options we offer for events, celebrations, and everyday enjoyment."
          align="center"
        />

        {/* Interactive Category Filter Tabs - Wide container so all content is fully visible on desktop */}
        <div className="mt-8 sm:mt-12 w-full flex items-center justify-center">
          <div className="w-full max-w-5xl lg:max-w-6xl overflow-x-auto custom-thin-scrollbar pb-3 px-2 flex justify-start lg:justify-center">
            <div className="inline-flex p-1.5 bg-[#EDE5D9]/50 dark:bg-[#282420] rounded-2xl border border-[#EDE5D9] dark:border-[#38332E] shrink-0 gap-1 sm:gap-1.5">
              {menuCategories.map((cat) => {
                const isActive = activeFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveFilter(cat.id as MenuCategoryFilter)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F28A08] ${
                      isActive
                        ? 'bg-white dark:bg-[#342F2A] text-[#F28A08] font-bold shadow-xs'
                        : 'text-[#706A63] dark:text-[#A8A199] hover:text-[#24211E] dark:hover:text-white'
                    }`}
                    aria-pressed={isActive}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Interactive Content View: If an upcoming category is selected, render the crafted Coming Soon card */}
        {activeFilter === 'agelgel' || activeFilter === 'buffet' || activeFilter === 'lunch-box' ? (
          <div className="mt-8 sm:mt-12 w-full flex justify-center animate-in fade-in zoom-in-98 duration-300">
            <ComingSoonMenuCard
              {...COMING_SOON_DATA[activeFilter]}
              isHero
            />
          </div>
        ) : (
          /* Food Cards Grid */
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                onPlaceOrder={handlePlaceOrder}
                isSampleView={isAllView}
                onExploreCategory={(cat) => setActiveFilter(cat as MenuCategoryFilter)}
              />
            ))}

            {/* In 'All sections' view: append the 3 upcoming categories' Coming Soon cards in the exact user sequence: 5. Agelgel, 6. Buffet Packages, 7. Lunch Box */}
            {isAllView && (
              <>
                <ComingSoonMenuCard {...COMING_SOON_DATA.agelgel} />
                <ComingSoonMenuCard {...COMING_SOON_DATA.buffet} />
                <ComingSoonMenuCard {...COMING_SOON_DATA['lunch-box']} />
              </>
            )}
          </div>
        )}

        {/* Floating Cart Quick Access Pill: adheres to light and dark mode rules (removed once order is submitted and success screen is displayed) */}
        {totalCartCount > 0 && !isOrderSubmitted && (
          <aside
            aria-label="Current Cart and Checkout"
            className="fixed bottom-5 right-4 sm:right-8 z-40 animate-in slide-in-from-bottom-5 fade-in duration-300"
          >
            <div className="flex items-center gap-3 p-2.5 sm:p-3 pl-3.5 sm:pl-4 rounded-2xl bg-[#FFFCF8]/95 dark:bg-[#1E1B18]/95 text-[#24211E] dark:text-[#F7F4EF] shadow-xl dark:shadow-2xl border border-[#EDE5D9] dark:border-[#38332E] backdrop-blur-md transition-colors duration-300">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-[#F28A08]/15 dark:bg-[#F28A08]/25 text-[#F28A08] flex items-center justify-center shadow-xs">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#F28A08] text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#FFFCF8] dark:border-[#1E1B18] shadow-xs">
                    {totalCartCount}
                  </span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase tracking-wider text-[#706A63] dark:text-[#A8A199] font-semibold font-['Lexend']">
                    Cart ({totalCartCount} {totalCartCount === 1 ? 'item' : 'items'})
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#F28A08] tabular-nums font-['Lexend']">
                    {totalCartBirr.toLocaleString()} Birr
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={navigateToCheckout}
                className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wide bg-[#F28A08] hover:bg-[#DB7A04] text-white transition-all shadow-md hover:shadow-lg cursor-pointer shrink-0 font-['Lexend']"
              >
                <span>Checkout</span>
              </button>
            </div>
          </aside>
        )}

        {/* My Order Section under menu (reference: Pinterest food app UI) */}
        <MyOrderSection
          orderItems={orderItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearOrder={handleClearOrder}
          onOrderSubmittedStateChange={(submitted) => setIsOrderSubmitted(submitted)}
          onConfirmOrderSubmit={(details) => {
            if (onOrderSubmitted) {
              onOrderSubmitted(details);
            }
          }}
        />
      </div>
    </section>
  );
};
