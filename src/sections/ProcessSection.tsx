import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { FileText, MessageSquareHeart, CheckCircle } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Tell Us About Your Event',
      description:
        'Share your occasion, preferred date, approximate guest count, and catering requirements through our quick inquiry form.',
      icon: FileText,
    },
    {
      number: '02',
      title: 'Discuss Your Options',
      description:
        'Tell us what you’re looking for so our culinary team can propose suitable food selections, custom cakes, and service arrangements.',
      icon: MessageSquareHeart,
    },
    {
      number: '03',
      title: 'Finalize Your Request',
      description:
        'Review the proposed details with the Perry Foods team, refine dietary adjustments, and confirm your event arrangement directly.',
      icon: CheckCircle,
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#FFF9F2] border-t border-[#EDE5D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="HOW CATERING WORKS"
          title="Let's Plan Something Delicious"
          description="A clear, personalized path from your initial idea to a beautifully executed food experience."
          align="center"
        />

        <div className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-[#EDE5D9] -translate-y-6 z-0" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative z-10 flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-[#EDE5D9] shadow-xs hover:shadow-md transition-shadow"
              >
                {/* Step Marker */}
                <div className="w-14 h-14 rounded-2xl bg-[#FFF8EE] border border-[#F28A08]/30 text-[#F28A08] flex items-center justify-center font-['Lexend'] text-xl font-bold mb-6 shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>

                <span className="font-mono text-xs font-semibold tracking-wider text-[#F28A08] mb-1">
                  STEP {step.number}
                </span>

                <h3 className="font-['Lexend'] text-2xl font-bold uppercase tracking-tight text-[#24211E]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm text-[#706A63] leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
