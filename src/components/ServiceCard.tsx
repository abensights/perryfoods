import React from 'react';
import { ServiceItem } from '../types';
import { SafeImage } from './SafeImage';
import { Button } from './Button';
import { Check } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
  onSelectService?: (serviceTitle: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onSelectService,
}) => {
  const handleCta = () => {
    if (onSelectService) {
      onSelectService(service.title);
    }
    const target = document.querySelector('#inquiry');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#EDE5D9] shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Visual Photography Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#EDE5D9]/30">
        <SafeImage
          src={service.image}
          alt={service.imageAlt}
          fallbackTitle={service.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
      </div>

      {/* Content Container */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-6">
        <div>
          <h3 className="font-['Lexend'] text-2xl font-bold uppercase tracking-tight text-[#24211E] group-hover:text-[#F28A08] transition-colors">
            {service.title}
          </h3>
          <p className="mt-2.5 text-sm text-[#706A63] leading-relaxed">
            {service.shortDescription}
          </p>

          {/* Key Capabilities */}
          <ul className="mt-5 space-y-2 border-t border-[#EDE5D9]/60 pt-4">
            {service.features.map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-[#24211E]/80"
              >
                <div className="w-4 h-4 rounded-full bg-[#F28A08]/15 text-[#F28A08] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="pt-2">
          <Button
            variant="secondary"
            size="md"
            onClick={handleCta}
            className="w-full justify-center hover:border-[#F28A08] hover:text-[#F28A08]"
          >
            <span>{service.ctaText}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
