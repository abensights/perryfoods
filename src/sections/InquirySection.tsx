import React, { useState } from 'react';
import { Mail, Phone, Clock, MapPin, Send, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { foodImages } from '../data/images';
import { SafeImage } from '../components/SafeImage';

interface InquirySectionProps {
  selectedService?: string;
  selectedEventType?: 'Wedding' | 'Corporate Event' | 'Birthday' | 'Family Gathering' | 'Other';
  selectedNotes?: string;
  selectedGuests?: number | string;
}

export const InquirySection: React.FC<InquirySectionProps> = ({
  selectedService,
  selectedEventType,
  selectedNotes,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(() => {
    if (selectedNotes) return selectedNotes;
    if (selectedService || selectedEventType) {
      return `Hi Perry Foods team, I am interested in ${selectedService || ''} for a ${selectedEventType || 'catering event'}.`;
    }
    return '';
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    const subject = encodeURIComponent(`Catering Inquiry - ${fullName.trim()}`);
    const bodyLines = [
      `Name: ${fullName.trim()}`,
      `Email: ${email.trim()}`,
      phone.trim() ? `Phone: ${phone.trim()}` : null,
      selectedService ? `Selected Service: ${selectedService}` : null,
      selectedEventType ? `Event Type: ${selectedEventType}` : null,
      '',
      'Message:',
      message.trim() || 'No additional message provided.',
    ].filter(Boolean);

    const mailtoUrl = `mailto:Perryfoods@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

    // Open user's email client
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <section
      id="inquiry"
      className="min-h-[90vh] sm:min-h-screen flex flex-col justify-center py-16 sm:py-24 bg-[#FFFCF8] dark:bg-[#171513] scroll-mt-20 border-b border-[#EDE5D9] dark:border-[#2E2A26] transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple Clean Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-['Lexend'] text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#24211E] dark:text-[#FFFCF8]">
            Contact
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#706A63] dark:text-[#A8A199] leading-relaxed">
            Have questions about our catering, buffet banquets, or artisan bakes? Reach out directly or send us a message.
          </p>
        </div>

        {/* Minimalist Split Contact Card matching Pinterest design */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Let's Talk Food card with image background adhering to dark and light mode */}
          <div
            className={`lg:col-span-5 relative overflow-hidden rounded-3xl p-7 sm:p-9 shadow-xl border transition-colors flex flex-col justify-between ${
              isDark
                ? 'bg-[#1C1917] border-[#38332E] text-[#FFFCF8]'
                : 'bg-[#FAF6F0] border-[#EDE5D9] text-[#24211E]'
            }`}
          >
            {/* Background food catering photography under adaptive light/dark mode scrim */}
            <div className="absolute inset-0 pointer-events-none">
              <SafeImage
                src={foodImages.hero.spread}
                alt="Perry Foods catering banquet"
                className="w-full h-full object-cover"
              />
              {/* Adaptive scrim conforming strictly to light and dark mode rules */}
              <div
                className={`absolute inset-0 transition-colors ${
                  isDark
                    ? 'bg-gradient-to-br from-[#1A1715]/95 via-[#1E1B18]/92 to-[#141210]/96'
                    : 'bg-gradient-to-br from-[#FFFDF9]/95 via-[#FAF6F0]/92 to-[#F5ECE1]/96'
                }`}
              />
              {/* Brand warm orange glowing accent blobs */}
              <div className="absolute -top-12 -right-12 w-60 h-60 bg-[#F28A08]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#F28A08]/10 rounded-full blur-2xl pointer-events-none" />
            </div>

            <div className="relative z-10">
              <h3
                className={`font-['Lexend'] text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-4 ${
                  isDark ? 'text-[#FFFCF8]' : 'text-[#24211E]'
                }`}
              >
                Let's Talk Food.
              </h3>
              <p
                className={`text-xs sm:text-sm leading-relaxed mb-8 ${
                  isDark ? 'text-[#EDE5D9]/75' : 'text-[#706A63]'
                }`}
              >
                We are here to help make your event effortless and memorable with authentic Ethiopian catering and fresh artisan treats.
              </p>

              {/* Verified Contact Details adhering to Light & Dark mode */}
              <div className="flex flex-col gap-4">
                {/* Book a meeting */}
                <a
                  href="mailto:Perryfoods@gmail.com?subject=Book%20a%20Meeting%20with%20Perry%20Foods"
                  className={`group flex items-start gap-3.5 p-3 rounded-2xl border transition-all ${
                    isDark
                      ? 'bg-white/5 hover:bg-white/10 border-white/10'
                      : 'bg-white/80 hover:bg-white border-[#EDE5D9] shadow-sm'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F28A08] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span
                      className={`block text-[11px] uppercase tracking-wider font-semibold font-['Lexend'] ${
                        isDark ? 'text-[#EDE5D9]/60' : 'text-[#706A63]'
                      }`}
                    >
                      Book a meeting
                    </span>
                    <span
                      className={`block text-sm sm:text-base font-semibold truncate group-hover:text-[#F28A08] transition-colors ${
                        isDark ? 'text-[#FFFCF8]' : 'text-[#24211E]'
                      }`}
                    >
                      Perryfoods
                    </span>
                  </div>
                </a>

                {/* Phone Number */}
                <a
                  href="tel:+251911458705"
                  className={`group flex items-start gap-3.5 p-3 rounded-2xl border transition-all ${
                    isDark
                      ? 'bg-white/5 hover:bg-white/10 border-white/10'
                      : 'bg-white/80 hover:bg-white border-[#EDE5D9] shadow-sm'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F28A08] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span
                      className={`block text-[11px] uppercase tracking-wider font-semibold font-['Lexend'] ${
                        isDark ? 'text-[#EDE5D9]/60' : 'text-[#706A63]'
                      }`}
                    >
                      Phone Number
                    </span>
                    <span
                      className={`block text-sm sm:text-base font-semibold truncate group-hover:text-[#F28A08] transition-colors ${
                        isDark ? 'text-[#FFFCF8]' : 'text-[#24211E]'
                      }`}
                    >
                      +251911458705
                    </span>
                  </div>
                </a>

                {/* Hours of Operation */}
                <div
                  className={`flex items-start gap-3.5 p-3 rounded-2xl border transition-all ${
                    isDark
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white/80 border-[#EDE5D9] shadow-sm'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F28A08] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span
                      className={`block text-[11px] uppercase tracking-wider font-semibold font-['Lexend'] ${
                        isDark ? 'text-[#EDE5D9]/60' : 'text-[#706A63]'
                      }`}
                    >
                      Hours of Operation
                    </span>
                    <span
                      className={`block text-sm sm:text-base font-semibold ${
                        isDark ? 'text-[#FFFCF8]' : 'text-[#24211E]'
                      }`}
                    >
                      2:00 - 12:00
                    </span>
                  </div>
                </div>

                {/* Kitchen Address / Locate Us */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Arbegnoch+St,+Addis+Ababa"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Locate Perry Foods on Google Maps"
                  className={`group flex items-start gap-3.5 p-3 rounded-2xl border transition-all ${
                    isDark
                      ? 'bg-white/5 hover:bg-white/10 border-white/10'
                      : 'bg-white/80 hover:bg-white border-[#EDE5D9] shadow-sm'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F28A08] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span
                      className={`block text-[11px] uppercase tracking-wider font-semibold font-['Lexend'] ${
                        isDark ? 'text-[#EDE5D9]/60' : 'text-[#706A63]'
                      }`}
                    >
                      Kitchen Address
                    </span>
                    <span
                      className={`block text-sm sm:text-base font-semibold truncate group-hover:text-[#F28A08] transition-colors ${
                        isDark ? 'text-[#FFFCF8]' : 'text-[#24211E]'
                      }`}
                    >
                      Arbegnoch St, Addis Ababa
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Simple Form linked to Email */}
          <div
            className={`lg:col-span-7 p-7 sm:p-9 rounded-3xl border shadow-sm transition-colors flex flex-col justify-between ${
              isDark
                ? 'bg-[#201D1A] border-[#38332E]'
                : 'bg-white border-[#EDE5D9]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#EDE5D9] dark:border-[#38332E] mb-6">
                <div>
                  <h3 className="font-['Lexend'] text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#24211E] dark:text-[#FFFCF8]">
                    Send a Message
                  </h3>
                  <p className="text-xs text-[#706A63] dark:text-[#A8A199] mt-0.5">
                    Fill out the form below to email us your request.
                  </p>
                </div>
              </div>

              {submitted ? (
                <div className="py-8 px-6 text-center flex flex-col items-center gap-4 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-['Lexend'] text-lg font-bold text-[#24211E] dark:text-white">
                    Email Client Opened
                  </h4>
                  <p className="text-xs sm:text-sm text-[#706A63] dark:text-[#A8A199] max-w-md">
                    Your default email application was prompted with your message pre-filled to{' '}
                    <strong className="text-[#F28A08]">Perryfoods@gmail.com</strong>.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                    <a
                      href="mailto:Perryfoods@gmail.com"
                      className="px-4 py-2 rounded-xl bg-[#F28A08] text-white text-xs font-semibold hover:bg-[#DB7A04] transition-colors"
                    >
                      Email Perryfoods@gmail.com Again
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 rounded-xl border border-[#EDE5D9] dark:border-[#38332E] text-xs font-semibold text-[#706A63] dark:text-[#A8A199] hover:text-[#24211E] dark:hover:text-white transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSendEmail} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#706A63] dark:text-[#A8A199] mb-1.5 font-['Lexend']">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Almaz Tadesse"
                        className="w-full px-4 py-3 text-sm rounded-xl bg-[#FFFCF8] dark:bg-[#171513] border border-[#EDE5D9] dark:border-[#38332E] text-[#24211E] dark:text-white placeholder-[#706A63]/50 focus:outline-none focus:border-[#F28A08] focus:ring-1 focus:ring-[#F28A08] transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#706A63] dark:text-[#A8A199] mb-1.5 font-['Lexend']">
                        Your Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. almaz@example.com"
                        className="w-full px-4 py-3 text-sm rounded-xl bg-[#FFFCF8] dark:bg-[#171513] border border-[#EDE5D9] dark:border-[#38332E] text-[#24211E] dark:text-white placeholder-[#706A63]/50 focus:outline-none focus:border-[#F28A08] focus:ring-1 focus:ring-[#F28A08] transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#706A63] dark:text-[#A8A199] mb-1.5 font-['Lexend']">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+251 91 123 4567"
                      className="w-full px-4 py-3 text-sm rounded-xl bg-[#FFFCF8] dark:bg-[#171513] border border-[#EDE5D9] dark:border-[#38332E] text-[#24211E] dark:text-white placeholder-[#706A63]/50 focus:outline-none focus:border-[#F28A08] focus:ring-1 focus:ring-[#F28A08] transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#706A63] dark:text-[#A8A199] mb-1.5 font-['Lexend']">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your event, date, expected guests, or any specific requirements..."
                      className="w-full px-4 py-3 text-sm rounded-xl bg-[#FFFCF8] dark:bg-[#171513] border border-[#EDE5D9] dark:border-[#38332E] text-[#24211E] dark:text-white placeholder-[#706A63]/50 focus:outline-none focus:border-[#F28A08] focus:ring-1 focus:ring-[#F28A08] transition-all resize-y"
                    />
                  </div>

                  {/* Submit button linked to email */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-[#F28A08] hover:bg-[#DB7A04] shadow-md shadow-[#F28A08]/20 transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
