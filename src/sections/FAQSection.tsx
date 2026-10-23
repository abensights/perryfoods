import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { FAQAccordion } from '../components/FAQAccordion';
import { faqData } from '../data/faq';

export const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="py-20 sm:py-24 bg-[#FFFCF8] dark:bg-[#171513] scroll-mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="COMMON QUESTIONS"
          title="Frequently Asked Questions"
          description="Clear answers about catering packages, custom celebration cakes, advance booking, and dietary planning."
          align="center"
        />

        <div className="mt-12 sm:mt-14">
          <FAQAccordion items={faqData} />
        </div>
      </div>
    </section>
  );
};
