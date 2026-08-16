import React from 'react';
import { motion } from 'motion/react';
import { Instagram, MessageCircle, Mail, ArrowUp } from 'lucide-react';
import { openEmailClient } from '../lib/emailUtils';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="footer" className="relative z-10 w-full h-screen min-h-[600px] flex flex-col justify-end snap-start bg-[#120D10]">
      {/* Refined Gold Accent Divider Line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent absolute top-0" />

      <motion.footer
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative text-[#F5EFE6] pt-20 pb-12 overflow-hidden w-full"
      >
        {/* Golden Ambient Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#D4AF37]/15 via-[#8B5E3C]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#D4AF37]/20">
            {/* Brand Info */}
            <div className="lg:col-span-2 space-y-4">
              <a href="#" className="flex items-center gap-3 group cursor-pointer">
                <img
                  src="/images/logo.png"
                  alt="YashoWorld Logo"
                  className="w-10 h-10 object-contain rounded-full border border-[#D4AF37]/40 shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
                <h1 className="font-serif-display text-2xl font-bold tracking-widest text-[#FAF7F2]">
                  YASHO<span className="text-[#D4AF37]">WORLD</span>
                </h1>
              </a>

              <p className="text-xs text-[#C4B8AD] leading-relaxed max-w-sm font-light">
                Preserving life’s most cherished emotional memories forever. From sacred wedding garlands to baby keepsakes, encapsulated in optical-grade crystal resin.
              </p>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://www.instagram.com/pourfection_by_yashvi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-[#241F1C] border border-[#D4AF37]/20 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white text-[#D4AF37] flex items-center justify-center transition-all shadow-sm"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-full bg-[#241F1C] border border-emerald-500/20 hover:border-emerald-500 hover:bg-emerald-600 hover:text-white text-emerald-400 flex items-center justify-center transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=pourfectionbyyashvi@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    openEmailClient('pourfectionbyyashvi@gmail.com', 'Inquiry - YashoWorld Resin Art');
                  }}
                  aria-label="Email Us"
                  className="w-9 h-9 rounded-full bg-[#241F1C] border border-[#D4AF37]/20 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white text-[#D4AF37] flex items-center justify-center transition-all shadow-sm cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-serif-display text-base font-bold text-white mb-4 tracking-wide">
                Explore Collection
              </h4>
              <ul className="space-y-2.5 text-xs text-[#C4B8AD] font-light">
                <li><a href="#products" className="hover:text-[#D4AF37] transition-colors">Bridal Garland Frames</a></li>
                <li><a href="#products" className="hover:text-[#D4AF37] transition-colors">Flower Preservation</a></li>
                <li><a href="#products" className="hover:text-[#D4AF37] transition-colors">Baby Memory Keepsakes</a></li>
                <li><a href="#products" className="hover:text-[#D4AF37] transition-colors">Resin Wall Clocks</a></li>
                <li><a href="#products" className="hover:text-[#D4AF37] transition-colors">Custom Entrance Name Plates</a></li>
                <li><a href="#products" className="hover:text-[#D4AF37] transition-colors">Festival Pooja Trays</a></li>
              </ul>
            </div>

            {/* Studio & Service */}
            <div>
              <h4 className="font-serif-display text-base font-bold text-white mb-4 tracking-wide">
                Studio & Service
              </h4>
              <ul className="space-y-2.5 text-xs text-[#C4B8AD] font-light">
                <li><a href="#story" className="hover:text-[#D4AF37] transition-colors">The YashoWorld Story</a></li>
                <li><a href="#process" className="hover:text-[#D4AF37] transition-colors">Flower Packing Guide</a></li>
                <li><a href="#customizer" className="hover:text-[#D4AF37] transition-colors">3D Customizer Tool</a></li>
                <li><a href="#faq" className="hover:text-[#D4AF37] transition-colors">Yellowing & UV Protection</a></li>
                <li><a href="#testimonials" className="hover:text-[#D4AF37] transition-colors">Verified Customer Reviews</a></li>
                <li><a href="#contact" className="hover:text-[#D4AF37] transition-colors">Inquiry & Contact</a></li>
              </ul>
            </div>

            {/* Newsletter Perk */}
            <div className="space-y-3">
              <h4 className="font-serif-display text-base font-bold text-white tracking-wide">
                Stay Connected
              </h4>
              <p className="text-xs text-[#C4B8AD] font-light leading-relaxed">
                Subscribe for memory preservation tips, flower care guides, and exclusive custom offers.
              </p>

              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2 pt-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#241F1C] border border-[#D4AF37]/30 text-xs text-white placeholder-gray-500 focus:outline-hidden focus:ring-1 focus:ring-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:brightness-110 text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar - Minimal & Luxurious */}
          <div className="pt-8 flex flex-col items-center gap-6 text-xs text-[#C4B8AD] font-light">
            {/* Copyright & Credit Stacked */}
            <div className="flex flex-col items-center gap-1 text-center font-serif-body tracking-wider">
              <p>© 2026 YashoWorld.</p>
              <p>All Rights Reserved.</p>
              <p className="mt-4 text-[10px] text-[#A6998E]">Designed & Developed by</p>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="relative inline-block font-serif-display font-bold tracking-[0.2em] uppercase text-[#E5C158] hover:text-[#D4AF37] transition-all duration-300 group py-1"
              >
                Makwana Industries.
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-[#241F1C] border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-white transition-all shadow-md group"
              title="Scroll to Top"
              aria-label="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

