import React, { useState } from 'react';
import { MenuItem } from '../types';
import { SafeImage } from './SafeImage';
import { Button } from './Button';
import { Check } from 'lucide-react';

interface FoodCardProps {
  item: MenuItem;
  onPlaceOrder: (item: MenuItem, quantity: number, totalBirr: number) => void;
  isSampleView?: boolean;
  onExploreCategory?: (category: string) => void;
  onNavigateToCheckout?: () => void;
  cartQuantity?: number;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  item,
  onPlaceOrder,
  isSampleView = false,
  onExploreCategory,
  onNavigateToCheckout: _onNavigateToCheckout,
  cartQuantity: _cartQuantity = 0,
}) => {
  const [quantity, setQuantity] = useState<number>(1);

  const isBuffet = item.category === 'buffet';
  const minGuests = isBuffet ? (item.minGuests || 30) : 1;
  const unitPrice = isBuffet ? item.priceBirr * minGuests : item.priceBirr;
  const totalBirr = unitPrice * quantity;

  const [added, setAdded] = useState(false);

  const handleOrderClick = () => {
    onPlaceOrder(item, quantity, totalBirr);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="group flex flex-col bg-white dark:bg-[#1E1B18] rounded-2xl overflow-hidden border border-[#EDE5D9] dark:border-[#38332E] shadow-xs hover:shadow-xl transition-all duration-300">
      {/* Photography */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#EDE5D9]/30 dark:bg-[#282420]">
        <SafeImage
          src={item.image}
          alt={item.imageAlt}
          fallbackTitle={item.name}
          className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 ${item.imageClassName || ''}`}
        />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-5">
        <div>
          {/* Metadata without pills */}
          <div className="flex items-center gap-2 text-xs text-[#706A63] dark:text-[#A8A199] mb-1.5 font-medium">
            <span className="text-[#F28A08] uppercase tracking-wider font-semibold">
              {item.categoryLabel}
            </span>
            {/* Minimum scale / Serves info is hidden on the 'All' section as requested */}
            {!isSampleView && item.servesInfo && (
              <>
                <span aria-hidden="true" className="text-[#EDE5D9] dark:text-[#38332E]">
                  ·
                </span>
                <span>{item.servesInfo}</span>
              </>
            )}
          </div>

          <h3 className="font-['Lexend'] text-xl font-bold uppercase tracking-tight text-[#24211E] dark:text-[#F7F4EF] group-hover:text-[#F28A08] transition-colors">
            {item.name}
          </h3>

          <p className={`mt-2 text-xs sm:text-sm text-[#706A63] dark:text-[#A8A199] leading-relaxed whitespace-pre-line ${isSampleView ? 'line-clamp-3' : ''}`}>
            {item.description}
          </p>

          {item.highlights && item.highlights.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-[#706A63] dark:text-[#A8A199]">
              {item.highlights.map((h, i) => (
                <span key={i} className="flex items-center gap-1">
                  <span className="text-[#F28A08]">•</span>
                  <span>{h}</span>
                </span>
              ))}
            </div>
          )}

          {!isSampleView && (item.category === 'agelgel' || item.category === 'buffet') && (
            <div className="mt-3 pt-2.5 border-t border-[#EDE5D9]/50 dark:border-[#38332E]/60 flex flex-col gap-1.5 text-[11px]">
              <div className="flex items-center justify-between text-[#706A63] dark:text-[#A8A199] font-medium">
                <span>Catering Setup &amp; Trays:</span>
                <span className="font-bold text-[#F28A08]">Provided</span>
              </div>
              <span className="inline-flex self-start items-center px-2 py-0.5 rounded-md bg-[#EDE5D9]/50 dark:bg-[#282420] text-[#706A63] dark:text-[#D1C7BA] text-[10px] font-medium border border-[#EDE5D9] dark:border-[#38332E]">
                Delivery charge may apply if requested
              </span>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="pt-4 border-t border-[#EDE5D9]/60 dark:border-[#38332E] flex flex-col gap-3">
          {isSampleView ? (
            /* ON THE ALL SECTION ONLY:
               Single explore button only (no arrow, no price range, no price, no amount gauge, no place order)
            */
            <button
              type="button"
              onClick={() => onExploreCategory && onExploreCategory(item.category)}
              className="w-full inline-flex items-center justify-center px-4 py-2.5 sm:py-3 rounded-xl font-bold text-sm bg-[#F28A08] hover:bg-[#DB7A04] text-white shadow-md shadow-[#F28A08]/20 hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <span>Explore {item.categoryLabel}</span>
            </button>
          ) : (
            /* ON CATEGORY TABS: Normal card with item price, amount gauge, and Place Order */
            <>
              <div className="flex items-center justify-between gap-2">
                {/* Specific item price in Birr */}
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-[#706A63] dark:text-[#A8A199] font-medium">
                    {item.priceLabel
                      ? item.priceLabel
                      : isBuffet
                      ? `Package (${minGuests} min. guests)`
                      : `Price ${item.unit ? `(per ${item.unit})` : ''}`}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg sm:text-xl font-extrabold text-[#24211E] dark:text-[#F7F4EF] tabular-nums">
                      {totalBirr.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-[#F28A08]">
                      Birr {isBuffet ? (quantity > 1 ? `(${quantity} packages)` : '') : (item.hideUnitSuffix ? '' : item.unit ? `/${item.unit}` : '')}
                    </span>
                    {!isBuffet && quantity > 1 && (
                      <span className="text-[10px] text-[#706A63] dark:text-[#A8A199] hidden sm:inline ml-0.5">
                        ({item.priceBirr} ea)
                      </span>
                    )}
                  </div>
                  {isBuffet && (
                    <span className="text-[10px] text-[#706A63] dark:text-[#A8A199] mt-0.5">
                      {item.priceBirr} Birr/guest × {minGuests} guests
                    </span>
                  )}
                </div>

                {/* Amount Setting Gauge */}
                <div className="flex items-center gap-1.5 bg-[#EDE5D9]/50 dark:bg-[#282420] p-1 rounded-xl border border-[#EDE5D9] dark:border-[#38332E]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-white dark:bg-[#342F2A] text-[#24211E] dark:text-white hover:bg-[#F28A08] hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs font-bold text-sm"
                  >
                    −
                  </button>
                  <span className="w-7 text-center text-xs font-bold text-[#24211E] dark:text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                    aria-label="Increase quantity"
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-white dark:bg-[#342F2A] text-[#24211E] dark:text-white hover:bg-[#F28A08] hover:text-white transition-colors cursor-pointer shadow-xs font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                variant="primary"
                size="sm"
                onClick={handleOrderClick}
                className="w-full justify-center transition-all"
              >
                {added ? (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Added to Order ✓</span>
                  </span>
                ) : (
                  <span className="text-xs font-bold">Place Order</span>
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
