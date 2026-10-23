import React, { useState } from 'react';
import { buffetTiers, buffetMenuItems, BuffetTier, MenuItemOption } from '../data/buffetPackages';
import { Button } from './Button';
import {
  Users,
  Check,
  Plus,
  Trash2,
  Sparkles,
  ChefHat,
  ShieldCheck,
  Truck,
  UserCheck,
} from 'lucide-react';

export interface BuffetBuilderSelection {
  tier: BuffetTier;
  guests: number;
  serviceStyle: 'drop-off' | 'full-service';
  selectedEntrees: MenuItemOption[];
  selectedPastas: MenuItemOption[];
  selectedSides: MenuItemOption[];
  selectedSalads: MenuItemOption[];
  selectedDesserts: MenuItemOption[];
  pricePerPerson: number;
  totalEstimated: number;
}

interface BuffetBuilderProps {
  onApplyToQuote: (selection: BuffetBuilderSelection) => void;
}

export const BuffetBuilder: React.FC<BuffetBuilderProps> = ({ onApplyToQuote }) => {
  const [activeTierId, setActiveTierId] = useState<string>('deluxe');
  const [guests, setGuests] = useState<number>(50);
  const [serviceStyle, setServiceStyle] = useState<'drop-off' | 'full-service'>('drop-off');

  // Active category tab for item selection
  const [activeTab, setActiveTab] = useState<'entrees' | 'pastas' | 'sides' | 'salads' | 'desserts'>('entrees');

  // Selections
  const [selectedEntreeIds, setSelectedEntreeIds] = useState<string[]>([
    'entree-chicken-rosemary',
    'entree-braised-beef',
  ]);
  const [selectedPastaIds, setSelectedPastaIds] = useState<string[]>([
    'pasta-penne-pomodoro',
  ]);
  const [selectedSideIds, setSelectedSideIds] = useState<string[]>([
    'side-garlic-mashed',
    'side-roasted-veggies',
  ]);
  const [selectedSaladIds, setSelectedSaladIds] = useState<string[]>([
    'salad-caesar',
  ]);
  const [selectedDessertIds, setSelectedDessertIds] = useState<string[]>([
    'dessert-pastry-platter',
  ]);

  const currentTier = buffetTiers.find((t) => t.id === activeTierId) || buffetTiers[1];

  // Helper to toggle items respecting max counts
  const toggleItem = (
    id: string,
    currentIds: string[],
    setIds: React.Dispatch<React.SetStateAction<string[]>>,
    maxAllowed: number
  ) => {
    if (currentIds.includes(id)) {
      setIds(currentIds.filter((item) => item !== id));
    } else {
      if (currentIds.length < maxAllowed) {
        setIds([...currentIds, id]);
      } else {
        // Replace last item if reached max
        setIds([...currentIds.slice(1), id]);
      }
    }
  };

  // Pricing calculation
  const staffCostPerPerson = serviceStyle === 'full-service' ? 6 : 0;
  
  // Calculate add-on premiums
  const allSelectedItems = buffetMenuItems.filter(
    (item) =>
      selectedEntreeIds.includes(item.id) ||
      selectedPastaIds.includes(item.id) ||
      selectedSideIds.includes(item.id) ||
      selectedSaladIds.includes(item.id) ||
      selectedDessertIds.includes(item.id)
  );

  const premiumAddonsTotal = allSelectedItems.reduce(
    (acc, item) => acc + (item.premiumAddon || 0),
    0
  );

  const finalPricePerPerson = currentTier.basePricePerPerson + staffCostPerPerson + premiumAddonsTotal;
  const finalTotalEstimated = finalPricePerPerson * guests;

  const handleApply = () => {
    const payload: BuffetBuilderSelection = {
      tier: currentTier,
      guests,
      serviceStyle,
      selectedEntrees: buffetMenuItems.filter((i) => selectedEntreeIds.includes(i.id)),
      selectedPastas: buffetMenuItems.filter((i) => selectedPastaIds.includes(i.id)),
      selectedSides: buffetMenuItems.filter((i) => selectedSideIds.includes(i.id)),
      selectedSalads: buffetMenuItems.filter((i) => selectedSaladIds.includes(i.id)),
      selectedDesserts: buffetMenuItems.filter((i) => selectedDessertIds.includes(i.id)),
      pricePerPerson: finalPricePerPerson,
      totalEstimated: finalTotalEstimated,
    };
    onApplyToQuote(payload);
  };

  // Tab configurations
  const tabs = [
    {
      id: 'entrees',
      label: 'Entrees',
      count: `${selectedEntreeIds.length}/${currentTier.maxEntrees}`,
      items: buffetMenuItems.filter((i) => i.category === 'entree'),
      selected: selectedEntreeIds,
      onToggle: (id: string) =>
        toggleItem(id, selectedEntreeIds, setSelectedEntreeIds, currentTier.maxEntrees),
    },
    {
      id: 'pastas',
      label: 'Pastas',
      count: `${selectedPastaIds.length}/${currentTier.maxPastas}`,
      items: buffetMenuItems.filter((i) => i.category === 'pasta'),
      selected: selectedPastaIds,
      onToggle: (id: string) =>
        toggleItem(id, selectedPastaIds, setSelectedPastaIds, currentTier.maxPastas),
    },
    {
      id: 'sides',
      label: 'Sides',
      count: `${selectedSideIds.length}/${currentTier.maxSides}`,
      items: buffetMenuItems.filter((i) => i.category === 'side'),
      selected: selectedSideIds,
      onToggle: (id: string) =>
        toggleItem(id, selectedSideIds, setSelectedSideIds, currentTier.maxSides),
    },
    {
      id: 'salads',
      label: 'Salads',
      count: `${selectedSaladIds.length}/${currentTier.maxSalads}`,
      items: buffetMenuItems.filter((i) => i.category === 'salad'),
      selected: selectedSaladIds,
      onToggle: (id: string) =>
        toggleItem(id, selectedSaladIds, setSelectedSaladIds, currentTier.maxSalads),
    },
    {
      id: 'desserts',
      label: 'Bakery & Sweets',
      count: `${selectedDessertIds.length} added`,
      items: buffetMenuItems.filter((i) => i.category === 'dessert'),
      selected: selectedDessertIds,
      onToggle: (id: string) => {
        if (selectedDessertIds.includes(id)) {
          setSelectedDessertIds(selectedDessertIds.filter((item) => item !== id));
        } else {
          setSelectedDessertIds([...selectedDessertIds, id]);
        }
      },
    },
  ];

  const currentTabObj = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="bg-white dark:bg-[#1E1B18] rounded-3xl border border-[#EDE5D9] dark:border-[#38332E] shadow-xl overflow-hidden transition-colors">
      {/* Header banner */}
      <div className="bg-[#24211E] text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[#34302C]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F28A08]/20 text-[#F28A08] text-xs font-semibold uppercase tracking-wider font-['Lexend'] mb-2">
            <ChefHat className="w-3.5 h-3.5" />
            <span>Interactive Buffet Planner</span>
          </div>
          <h3 className="font-['Lexend'] text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#FFFCF8]">
            Build Your Own Buffet &amp; Instant Estimate
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#EDE5D9]/75 max-w-xl">
            Choose your guest count, select package tier, and customize your hot entrees, savory pastas, and signature bakery treats.
          </p>
        </div>

        {/* Live per-person estimate chip */}
        <div className="bg-[#34302C] px-5 py-3 rounded-2xl border border-white/10 flex flex-col items-end shrink-0">
          <span className="text-[11px] uppercase tracking-wider text-[#A39C93]">
            Estimated From
          </span>
          <div className="flex items-baseline gap-1 text-white">
            <span className="text-3xl font-bold font-['Lexend'] text-[#F28A08]">
              ${finalPricePerPerson}
            </span>
            <span className="text-xs text-[#EDE5D9]/70">/ guest</span>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-10 space-y-10">
        {/* Step 1: Guest Count & Presets */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#F28A08] font-['Lexend'] block">
                STEP 1
              </span>
              <h4 className="font-['Lexend'] text-xl font-bold uppercase text-[#24211E] dark:text-[#F7F4EF] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#F28A08]" />
                How Many Guests Are You Catering For?
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold font-['Lexend'] text-[#24211E] tabular-nums">
                {guests} Guests
              </span>
            </div>
          </div>

          {/* Quick presets */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
            {[25, 50, 75, 100, 150, 200].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setGuests(count)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  guests === count
                    ? 'bg-[#F28A08] text-white shadow-xs'
                    : 'bg-[#FFFCF8] dark:bg-[#282420] border border-[#EDE5D9] dark:border-[#38332E] text-[#24211E] dark:text-[#F7F4EF] hover:border-[#F28A08]'
                }`}
              >
                {count} Guests
              </button>
            ))}
          </div>

          <input
            type="range"
            min="15"
            max="300"
            step="5"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full accent-[#F28A08] cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-[#706A63] dark:text-[#A8A199] mt-1 font-mono">
            <span>15 guests</span>
            <span>150 guests</span>
            <span>300+ guests</span>
          </div>
        </div>

        {/* Step 2: Choose Buffet Tier */}
        <div className="pt-6 border-t border-[#EDE5D9] dark:border-[#38332E]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F28A08] font-['Lexend'] block mb-1">
            STEP 2
          </span>
          <h4 className="font-['Lexend'] text-xl font-bold uppercase text-[#24211E] dark:text-[#F7F4EF] mb-4">
            Select Your Buffet Package Tier
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {buffetTiers.map((tier) => {
              const isSelected = activeTierId === tier.id;
              return (
                <div
                  key={tier.id}
                  onClick={() => setActiveTierId(tier.id)}
                  className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#F28A08] bg-[#FFF8EE] dark:bg-[#2D2115] shadow-sm'
                      : 'border-[#EDE5D9] dark:border-[#38332E] bg-white dark:bg-[#262320] hover:border-[#F28A08]/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-[#F28A08]/15 text-[#F28A08]">
                        {tier.badge}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#F28A08] text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <h5 className="font-['Lexend'] text-lg font-bold uppercase text-[#24211E] dark:text-[#F7F4EF]">
                      {tier.name}
                    </h5>
                    <p className="text-xs text-[#706A63] dark:text-[#A8A199] mt-1 leading-relaxed">
                      {tier.description}
                    </p>

                    <div className="mt-3 text-xs text-[#24211E] dark:text-[#EDE5D9] font-medium space-y-1">
                      <div>• {tier.maxEntrees} Warm Entrees</div>
                      <div>• {tier.maxPastas} Pasta Course</div>
                      <div>• {tier.maxSides} Gourmet Sides &amp; {tier.maxSalads} Salad</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EDE5D9]/80 dark:border-[#38332E] flex items-baseline justify-between">
                    <span className="text-xs text-[#706A63] dark:text-[#A8A199]">Base price</span>
                    <span className="font-['Lexend'] text-xl font-bold text-[#24211E] dark:text-[#F7F4EF]">
                      ${tier.basePricePerPerson}
                      <span className="text-xs font-normal text-[#706A63] dark:text-[#A8A199]"> / guest</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Service Style Selection (Soprano's Style) */}
        <div className="pt-6 border-t border-[#EDE5D9] dark:border-[#38332E]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F28A08] font-['Lexend'] block mb-1">
            STEP 3
          </span>
          <h4 className="font-['Lexend'] text-xl font-bold uppercase text-[#24211E] dark:text-[#F7F4EF] mb-4">
            Choose Service Presentation Style
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setServiceStyle('drop-off')}
              className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-4 ${
                serviceStyle === 'drop-off'
                  ? 'border-[#F28A08] bg-[#FFF8EE] dark:bg-[#2D2115]'
                  : 'border-[#EDE5D9] dark:border-[#38332E] bg-white dark:bg-[#262320] hover:border-[#F28A08]/50'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#F28A08]/15 text-[#F28A08] flex items-center justify-center shrink-0 mt-0.5">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h5 className="font-['Lexend'] text-base font-bold uppercase text-[#24211E]">
                    Drop-Off / Pick-Up Party Pans
                  </h5>
                  <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    Included
                  </span>
                </div>
                <p className="text-xs text-[#706A63] mt-1">
                  Food delivered hot and fresh in disposable catering pans with disposable serving tongs, spoons, and warm chafing racks.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setServiceStyle('full-service')}
              className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-4 ${
                serviceStyle === 'full-service'
                  ? 'border-[#F28A08] bg-[#FFF8EE]'
                  : 'border-[#EDE5D9] bg-white hover:border-[#F28A08]/50'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#F28A08]/15 text-[#F28A08] flex items-center justify-center shrink-0 mt-0.5">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h5 className="font-['Lexend'] text-base font-bold uppercase text-[#24211E]">
                    Full-Service Staffed Buffet
                  </h5>
                  <span className="text-[10px] font-bold uppercase bg-[#F28A08] text-white px-2 py-0.5 rounded">
                    +$6 / guest
                  </span>
                </div>
                <p className="text-xs text-[#706A63] mt-1">
                  Uniformed staff setup the buffet, maintain food temperature, serve your guests, manage cake-cutting, and handle cleanup.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Step 4: Customize Menu Dishes */}
        <div className="pt-6 border-t border-[#EDE5D9] dark:border-[#38332E]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#F28A08] font-['Lexend'] block">
                STEP 4
              </span>
              <h4 className="font-['Lexend'] text-xl font-bold uppercase text-[#24211E] dark:text-[#F7F4EF]">
                Customize Your Dishes &amp; Add Bakery Treats
              </h4>
            </div>
            <span className="text-xs text-[#706A63] dark:text-[#A8A199]">
              Click dishes to add or substitute in your package
            </span>
          </div>

          {/* Navigation Tabs for Dish Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 border-b border-[#EDE5D9] dark:border-[#38332E]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-[#24211E] dark:bg-[#F28A08] text-white shadow-xs'
                    : 'bg-[#FFFCF8] dark:bg-[#282420] text-[#706A63] dark:text-[#A8A199] hover:text-[#24211E] dark:hover:text-white border border-[#EDE5D9] dark:border-[#38332E]'
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 font-mono">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Dish items grid */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentTabObj.items.map((dish) => {
              const isSelected = currentTabObj.selected.includes(dish.id);
              return (
                <div
                  key={dish.id}
                  onClick={() => currentTabObj.onToggle(dish.id)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#F28A08] bg-[#FFF8EE] dark:bg-[#2D2115]'
                      : 'border-[#EDE5D9] dark:border-[#38332E] bg-white dark:bg-[#262320] hover:border-[#F28A08]/40'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h6 className="font-['Lexend'] text-base font-bold uppercase text-[#24211E] dark:text-[#F7F4EF]">
                        {dish.name}
                      </h6>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-[#F28A08] text-white'
                            : 'border border-[#EDE5D9] dark:border-[#38332E] bg-white dark:bg-[#282420] text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <p className="text-xs text-[#706A63] dark:text-[#A8A199] mt-1.5 line-clamp-2">
                      {dish.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#EDE5D9]/60 dark:border-[#38332E] flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      {dish.isVegetarian && (
                        <span className="text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 px-1.5 py-0.5 rounded">
                          Vegetarian
                        </span>
                      )}
                      {dish.isGlutenFree && (
                        <span className="text-amber-700 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300 px-1.5 py-0.5 rounded">
                          Gluten-Free
                        </span>
                      )}
                    </div>
                    {dish.premiumAddon ? (
                      <span className="font-semibold text-[#F28A08]">
                        +${dish.premiumAddon}/pp
                      </span>
                    ) : (
                      <span className="text-[#706A63] dark:text-[#A8A199]">Included in tier</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 5: Summary & Direct Quote Action */}
        <div className="p-6 rounded-2xl bg-[#FFF9F2] dark:bg-[#282420] border border-[#EDE5D9] dark:border-[#38332E] flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-semibold uppercase text-[#F28A08] font-['Lexend']">
              <span>{currentTier.name}</span>
              <span>·</span>
              <span>{guests} Guests</span>
              <span>·</span>
              <span>{serviceStyle === 'full-service' ? 'Full-Service Staffed' : 'Drop-Off Pans'}</span>
            </div>
            <div className="flex items-baseline justify-center lg:justify-start gap-2 text-[#24211E] dark:text-[#F7F4EF]">
              <span className="text-xs uppercase text-[#706A63] dark:text-[#A8A199] font-medium">Estimated Total:</span>
              <span className="font-['Lexend'] text-3xl font-bold text-[#F28A08] tabular-nums">
                ${finalTotalEstimated.toLocaleString()}
              </span>
              <span className="text-xs text-[#706A63] dark:text-[#A8A199]">(${finalPricePerPerson} / guest)</span>
            </div>
            <p className="text-xs text-[#706A63] dark:text-[#A8A199]">
              *Estimate includes food, chafing setup, and bread rolls. Formal quote will confirm local venue delivery &amp; taxes.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleApply}
            className="w-full lg:w-auto shadow-md hover:shadow-lg"
          >
            <span>Request Quote With This Menu</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
