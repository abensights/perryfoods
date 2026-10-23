import React, { useState, useEffect } from 'react';
import { InquiryFormData, InquirySubmissionResult } from '../types';
import { siteConfig } from '../config/siteConfig';
import { submitCateringInquiry } from '../services/inquiryService';
import { Button } from './Button';
import {
  CheckCircle2,
  AlertCircle,
  Calendar,
  Users,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';

interface QuoteFormProps {
  initialService?: string;
  initialEventType?: 'Wedding' | 'Corporate Event' | 'Birthday' | 'Family Gathering' | 'Other';
  initialNotes?: string;
  initialGuests?: number | string;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  initialService,
  initialEventType,
  initialNotes,
  initialGuests,
}) => {
  // Today's ISO date string YYYY-MM-DD for min date attribute
  const todayStr = new Date().toISOString().split('T')[0];

  // Restore filled Contact Us fields across reloads
  const savedContactData = React.useMemo(() => {
    try {
      const saved = localStorage.getItem('perry_contact_form_data');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  }, []);

  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: savedContactData?.fullName || '',
    email: savedContactData?.email || '',
    phone: savedContactData?.phone || '',
    preferredContact: savedContactData?.preferredContact || 'email',
    eventType: savedContactData?.eventType || initialEventType || 'Corporate Event',
    eventDate: savedContactData?.eventDate || '',
    estimatedGuests: savedContactData?.estimatedGuests || initialGuests || '',
    venueLocation: savedContactData?.venueLocation || '',
    servicesRequired:
      savedContactData?.servicesRequired && savedContactData.servicesRequired.length > 0
        ? savedContactData.servicesRequired
        : initialService
        ? [initialService]
        : ['Build-Your-Own Buffet Packages'],
    budgetRange: savedContactData?.budgetRange || '',
    dietaryPreferences: savedContactData?.dietaryPreferences || '',
    additionalMessage: savedContactData?.additionalMessage || initialNotes || '',
    consent: savedContactData?.consent !== undefined ? savedContactData.consent : true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<InquirySubmissionResult | null>(null);

  // Sync formData to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem('perry_contact_form_data', JSON.stringify(formData));
    } catch {
      // ignore
    }
  }, [formData]);

  // Update if props change dynamically
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => {
        if (!prev.servicesRequired.includes(initialService)) {
          return {
            ...prev,
            servicesRequired: [...prev.servicesRequired, initialService],
          };
        }
        return prev;
      });
    }
  }, [initialService]);

  useEffect(() => {
    if (initialEventType) {
      setFormData((prev) => ({ ...prev, eventType: initialEventType }));
    }
  }, [initialEventType]);

  useEffect(() => {
    if (initialGuests !== undefined && initialGuests !== '') {
      setFormData((prev) => ({ ...prev, estimatedGuests: initialGuests }));
    }
  }, [initialGuests]);

  useEffect(() => {
    if (initialNotes) {
      setFormData((prev) => ({
        ...prev,
        additionalMessage: initialNotes,
      }));
    }
  }, [initialNotes]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.preferredContact === 'email' || formData.email.trim()) {
      if (!formData.email.trim()) {
        errs.email = 'Email is required when email is the preferred contact method.';
      } else if (!emailRegex.test(formData.email.trim())) {
        errs.email = 'Please provide a valid email address (e.g. name@domain.com).';
      }
    }

    if (formData.preferredContact === 'phone' || formData.phone.trim()) {
      const cleanPhone = formData.phone.replace(/[\s()-]/g, '');
      if (!formData.phone.trim()) {
        errs.phone = 'Phone number is required when phone is the preferred contact method.';
      } else if (cleanPhone.length < 7) {
        errs.phone = 'Please enter a valid telephone number.';
      }
    }

    if (!formData.eventDate) {
      errs.eventDate = 'Please select a planned event date.';
    } else if (formData.eventDate < todayStr) {
      errs.eventDate = 'Event date cannot be in the past.';
    }

    if (!formData.estimatedGuests) {
      errs.estimatedGuests = 'Please indicate estimated guest count.';
    } else if (Number(formData.estimatedGuests) < 1) {
      errs.estimatedGuests = 'Guest count must be at least 1.';
    }

    if (formData.servicesRequired.length === 0) {
      errs.servicesRequired = 'Please select at least one catering service.';
    }

    if (!formData.consent) {
      errs.consent = 'Please confirm that we may contact you regarding this inquiry.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleToggleService = (serviceName: string) => {
    setFormData((prev) => {
      const exists = prev.servicesRequired.includes(serviceName);
      const updated = exists
        ? prev.servicesRequired.filter((s) => s !== serviceName)
        : [...prev.servicesRequired, serviceName];
      return { ...prev, servicesRequired: updated };
    });
    if (errors.servicesRequired) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.servicesRequired;
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      const result = await submitCateringInquiry(formData);
      setSubmissionResult(result);
      if (result.success) {
        try {
          localStorage.removeItem('perry_contact_form_data');
        } catch {
          // ignore
        }
      }
    } catch (err) {
      console.error(err);
      setSubmissionResult({
        success: false,
        message: 'An unexpected error occurred while preparing your inquiry. Please try again.',
        isDemoMode: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      preferredContact: 'email',
      eventType: 'Corporate Event',
      eventDate: '',
      estimatedGuests: '',
      venueLocation: '',
      servicesRequired: ['Buffet & Catering Packages'],
      budgetRange: '',
      dietaryPreferences: '',
      additionalMessage: '',
      consent: true,
    });
    setErrors({});
    setSubmissionResult(null);
    try {
      localStorage.removeItem('perry_contact_form_data');
    } catch {
      // ignore
    }
  };

  return (
    <div className="bg-white dark:bg-[#1E1B18] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#EDE5D9] dark:border-[#38332E] shadow-sm transition-colors">
      {submissionResult && submissionResult.success ? (
        <div className="flex flex-col items-center text-center py-8 px-4 max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-5">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-semibold uppercase tracking-widest text-[#F28A08] font-['Lexend']">
            Inquiry Registered
          </span>

          <h3 className="font-['Lexend'] text-3xl font-bold uppercase tracking-tight text-[#24211E] dark:text-[#F7F4EF] mt-1">
            Thank You, {formData.fullName.split(' ')[0]}!
          </h3>

          {submissionResult.referenceNumber && (
            <div className="mt-4 px-4 py-1.5 bg-[#FFFCF8] dark:bg-[#282420] border border-[#EDE5D9] dark:border-[#38332E] rounded-lg text-xs font-mono text-[#24211E] dark:text-[#F7F4EF]">
              Reference: <span className="font-bold text-[#F28A08]">{submissionResult.referenceNumber}</span>
            </div>
          )}

          <p className="mt-4 text-sm sm:text-base text-[#706A63] dark:text-[#A8A199] leading-relaxed">
            {submissionResult.message}
          </p>

          {/* Honest Demo Mode Explanation notice */}
          {submissionResult.isDemoMode && (
            <div className="mt-6 p-4 rounded-xl bg-[#FFF8EE] dark:bg-[#2D2115] border border-[#F28A08]/30 text-left text-xs text-[#706A63] dark:text-[#EDE5D9]/80 flex gap-3">
              <Sparkles className="w-5 h-5 text-[#F28A08] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#24211E] dark:text-[#F7F4EF] mb-1">
                  Preview Environment Notice
                </p>
                <p>
                  This inquiry has been verified with full client-side validation. In staging preview, inquiries are safely captured without mock-sending emails. To link directly to your catering inbox or CRM, set your endpoint in <code className="bg-white dark:bg-[#1E1B18] px-1 py-0.5 rounded border border-[#EDE5D9] dark:border-[#38332E]">siteConfig.ts</code>.
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-4">
            <Button variant="secondary" size="md" onClick={handleReset}>
              Submit Another Inquiry
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          {/* Section 1: Contact Details */}
          <div>
            <h3 className="font-['Lexend'] text-xl font-bold uppercase tracking-tight text-[#24211E] dark:text-[#F7F4EF] flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-[#F28A08] text-white text-xs flex items-center justify-center font-sans font-bold">
                1
              </span>
              Your Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="fullName"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#24211E] dark:text-[#F7F4EF] mb-1.5"
                >
                  Full Name <span className="text-[#F28A08]">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) {
                      setErrors((prev) => ({ ...prev, fullName: '' }));
                    }
                  }}
                  placeholder="e.g. Eleanor Vance"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm text-[#24211E] dark:text-[#F7F4EF] bg-[#FFFCF8] dark:bg-[#282420] placeholder-[#706A63]/50 focus:bg-white dark:focus:bg-[#2E2822] focus:outline-none focus:ring-2 focus:ring-[#F28A08] transition-all ${
                    errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-[#EDE5D9] dark:border-[#38332E]'
                  }`}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                />
                {errors.fullName && (
                  <p id="fullName-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Preferred Contact Method */}
              <div className="sm:col-span-2">
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#24211E] mb-2">
                  Preferred Contact Method
                </span>
                <div className="flex items-center gap-6 text-sm text-[#24211E]">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="email"
                      checked={formData.preferredContact === 'email'}
                      onChange={() => setFormData({ ...formData, preferredContact: 'email' })}
                      className="text-[#F28A08] focus:ring-[#F28A08]"
                    />
                    <span>Email response</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="phone"
                      checked={formData.preferredContact === 'phone'}
                      onChange={() => setFormData({ ...formData, preferredContact: 'phone' })}
                      className="text-[#F28A08] focus:ring-[#F28A08]"
                    />
                    <span>Phone call / WhatsApp</span>
                  </label>
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#24211E] mb-1.5"
                >
                  Email Address{' '}
                  {formData.preferredContact === 'email' ? (
                    <span className="text-[#F28A08]">*</span>
                  ) : (
                    <span className="text-xs text-[#706A63] font-normal lowercase">(optional)</span>
                  )}
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: '' }));
                    }
                  }}
                  placeholder="name@company.com"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm text-[#24211E] bg-[#FFFCF8] placeholder-[#706A63]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F28A08] transition-all ${
                    errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-[#EDE5D9]'
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#24211E] mb-1.5"
                >
                  Phone Number{' '}
                  {formData.preferredContact === 'phone' ? (
                    <span className="text-[#F28A08]">*</span>
                  ) : (
                    <span className="text-xs text-[#706A63] font-normal lowercase">(optional)</span>
                  )}
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) {
                      setErrors((prev) => ({ ...prev, phone: '' }));
                    }
                  }}
                  placeholder="+1 (555) 000-0000"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm text-[#24211E] bg-[#FFFCF8] placeholder-[#706A63]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F28A08] transition-all ${
                    errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-[#EDE5D9]'
                  }`}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Event Specifics */}
          <div className="pt-6 border-t border-[#EDE5D9]">
            <h3 className="font-['Lexend'] text-xl font-bold uppercase tracking-tight text-[#24211E] flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-[#F28A08] text-white text-xs flex items-center justify-center font-sans font-bold">
                2
              </span>
              Event Specifics
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Event Type */}
              <div>
                <label
                  htmlFor="eventType"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#24211E] mb-1.5"
                >
                  Event Type <span className="text-[#F28A08]">*</span>
                </label>
                <select
                  id="eventType"
                  value={formData.eventType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      eventType: e.target.value as InquiryFormData['eventType'],
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-[#EDE5D9] text-sm text-[#24211E] bg-[#FFFCF8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F28A08] transition-all"
                >
                  {siteConfig.eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Event Date (min prevented in past) */}
              <div>
                <label
                  htmlFor="eventDate"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#24211E] mb-1.5 flex items-center gap-1"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#F28A08]" />
                  Event Date <span className="text-[#F28A08]">*</span>
                </label>
                <input
                  type="date"
                  id="eventDate"
                  min={todayStr}
                  value={formData.eventDate}
                  onChange={(e) => {
                    setFormData({ ...formData, eventDate: e.target.value });
                    if (errors.eventDate) {
                      setErrors((prev) => ({ ...prev, eventDate: '' }));
                    }
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm text-[#24211E] bg-[#FFFCF8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F28A08] transition-all ${
                    errors.eventDate ? 'border-red-500 ring-1 ring-red-500' : 'border-[#EDE5D9]'
                  }`}
                  aria-invalid={!!errors.eventDate}
                  aria-describedby={errors.eventDate ? 'eventDate-error' : undefined}
                />
                {errors.eventDate && (
                  <p id="eventDate-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.eventDate}</span>
                  </p>
                )}
              </div>

              {/* Guest Count */}
              <div>
                <label
                  htmlFor="estimatedGuests"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#24211E] mb-1.5 flex items-center gap-1"
                >
                  <Users className="w-3.5 h-3.5 text-[#F28A08]" />
                  Estimated Guests <span className="text-[#F28A08]">*</span>
                </label>
                <input
                  type="number"
                  id="estimatedGuests"
                  min="1"
                  max="2000"
                  value={formData.estimatedGuests}
                  onChange={(e) => {
                    setFormData({ ...formData, estimatedGuests: e.target.value });
                    if (errors.estimatedGuests) {
                      setErrors((prev) => ({ ...prev, estimatedGuests: '' }));
                    }
                  }}
                  placeholder="e.g. 50"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm text-[#24211E] bg-[#FFFCF8] placeholder-[#706A63]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F28A08] transition-all ${
                    errors.estimatedGuests ? 'border-red-500 ring-1 ring-red-500' : 'border-[#EDE5D9]'
                  }`}
                  aria-invalid={!!errors.estimatedGuests}
                  aria-describedby={errors.estimatedGuests ? 'guests-error' : undefined}
                />
                {errors.estimatedGuests && (
                  <p id="guests-error" className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.estimatedGuests}</span>
                  </p>
                )}
              </div>

              {/* Location or Venue */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="venueLocation"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#24211E] mb-1.5 flex items-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#F28A08]" />
                  Event Location or Venue
                </label>
                <input
                  type="text"
                  id="venueLocation"
                  value={formData.venueLocation}
                  onChange={(e) => setFormData({ ...formData, venueLocation: e.target.value })}
                  placeholder="City, venue name, or private residence address"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#EDE5D9] text-sm text-[#24211E] bg-[#FFFCF8] placeholder-[#706A63]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F28A08] transition-all"
                />
              </div>

              {/* Budget Range (optional) */}
              <div>
                <label
                  htmlFor="budgetRange"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#24211E] mb-1.5"
                >
                  Budget Range <span className="text-xs text-[#706A63] font-normal lowercase">(optional)</span>
                </label>
                <input
                  type="text"
                  id="budgetRange"
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  placeholder="e.g. $1,000 - $2,500"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#EDE5D9] text-sm text-[#24211E] bg-[#FFFCF8] placeholder-[#706A63]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F28A08] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Services Required Checkboxes */}
          <div className="pt-6 border-t border-[#EDE5D9]">
            <div className="mb-3">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#24211E] mb-1">
                Services Required <span className="text-[#F28A08]">*</span>
              </span>
              <p className="text-xs text-[#706A63]">
                Select all food categories that apply to your event plan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {siteConfig.serviceCategories.map((serviceName) => {
                const isChecked = formData.servicesRequired.includes(serviceName);
                return (
                  <label
                    key={serviceName}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'border-[#F28A08] bg-[#FFF8EE] text-[#24211E]'
                        : 'border-[#EDE5D9] bg-[#FFFCF8] hover:bg-white text-[#706A63]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggleService(serviceName)}
                      className="mt-0.5 rounded text-[#F28A08] focus:ring-[#F28A08]"
                    />
                    <span className="text-xs font-medium leading-snug">{serviceName}</span>
                  </label>
                );
              })}
            </div>
            {errors.servicesRequired && (
              <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.servicesRequired}</span>
              </p>
            )}
          </div>

          {/* Section 4: Dietary & Additional Notes */}
          <div className="pt-6 border-t border-[#EDE5D9] grid grid-cols-1 gap-5">
            <div>
              <label
                htmlFor="dietaryPreferences"
                className="block text-xs font-semibold uppercase tracking-wider text-[#24211E] mb-1.5"
              >
                Dietary Preferences or Special Requirements <span className="text-xs text-[#706A63] font-normal lowercase">(optional)</span>
              </label>
              <input
                type="text"
                id="dietaryPreferences"
                value={formData.dietaryPreferences}
                onChange={(e) => setFormData({ ...formData, dietaryPreferences: e.target.value })}
                placeholder="e.g. Vegetarian options, gluten-free, nut allergies, halal"
                className="w-full px-4 py-2.5 rounded-lg border border-[#EDE5D9] text-sm text-[#24211E] bg-[#FFFCF8] placeholder-[#706A63]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F28A08] transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="additionalMessage"
                className="block text-xs font-semibold uppercase tracking-wider text-[#24211E] mb-1.5"
              >
                Additional Event Details or Questions <span className="text-xs text-[#706A63] font-normal lowercase">(optional)</span>
              </label>
              <textarea
                id="additionalMessage"
                rows={3}
                value={formData.additionalMessage}
                onChange={(e) => setFormData({ ...formData, additionalMessage: e.target.value })}
                placeholder="Share any other thoughts, schedule details, or questions for our catering team..."
                className="w-full px-4 py-2.5 rounded-lg border border-[#EDE5D9] text-sm text-[#24211E] bg-[#FFFCF8] placeholder-[#706A63]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F28A08] transition-all"
              />
            </div>

            {/* Consent Checkbox */}
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#706A63]">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => {
                    setFormData({ ...formData, consent: e.target.checked });
                    if (errors.consent) {
                      setErrors((prev) => ({ ...prev, consent: '' }));
                    }
                  }}
                  className="mt-0.5 rounded text-[#F28A08] focus:ring-[#F28A08]"
                />
                <span>
                  I agree that Perry Foods may contact me via my preferred method regarding this catering inquiry.
                </span>
              </label>
              {errors.consent && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.consent}</span>
                </p>
              )}
            </div>
          </div>

          {/* Submission Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#706A63] flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#F28A08]" />
              <span>Typical response time: Within 24 business hours</span>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full sm:w-auto min-w-[200px]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Preparing Inquiry...</span>
                </div>
              ) : (
                'Send Catering Inquiry'
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
