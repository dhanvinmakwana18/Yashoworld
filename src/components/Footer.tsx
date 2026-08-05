import React from 'react';
import { Sparkles, Heart, Instagram, MessageCircle, Mail, MapPin, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#1C1815] text-[#F5EFE6] pt-20 pb-12 border-t border-[#D4AF37]/30 overflow-hidden">
      {/* Golden Accent Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#D4AF37]/20">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full glass-gold flex items-center justify-center border border-[#D4AF37]/50 shadow-md">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <span className="font-serif-display text-2xl font-bold tracking-tight text-white">
                Yasho<span className="text-gold-gradient">World</span>
              </span>
            </a>

            <p className="text-xs text-[#C4B8AD] leading-relaxed max-w-sm">
              Handcrafted resin art startup preserving life’s most emotional memories forever. From sacred wedding garlands to baby footprints, encapsulated in crystal optical resin.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2A2421] hover:bg-[#D4AF37] hover:text-white text-[#D4AF37] flex items-center justify-center transition-colors shadow-sm"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2A2421] hover:bg-emerald-600 hover:text-white text-emerald-400 flex items-center justify-center transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@yashoworld.com"
                className="w-9 h-9 rounded-full bg-[#2A2421] hover:bg-[#D4AF37] hover:text-white text-[#D4AF37] flex items-center justify-center transition-colors shadow-sm"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif-display text-base font-bold text-white mb-4">
              Explore Collection
            </h4>
            <ul className="space-y-2 text-xs text-[#C4B8AD]">
              <li><a href="#products" className="hover:text-[#D4AF37] transition-colors">Bridal Garland Frames</a></li>
              <li><a href="#products" className="hover:text-[#D4AF37] transition-colors">Flower Preservation</a></li>
              <li><a href="#products" className="hover:text-[#D4AF37] transition-colors">Baby Memory Keepsakes</a></li>
              <li><a href="#products" className="hover:text-[#D4AF37] transition-colors">Resin Wall Clocks</a></li>
              <li><a href="#products" className="hover:text-[#D4AF37] transition-colors">Custom Entrance Name Plates</a></li>
              <li><a href="#products" className="hover:text-[#D4AF37] transition-colors">Festival Pooja Trays</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-serif-display text-base font-bold text-white mb-4">
              Studio & Service
            </h4>
            <ul className="space-y-2 text-xs text-[#C4B8AD]">
              <li><a href="#story" className="hover:text-[#D4AF37] transition-colors">The YashoWorld Story</a></li>
              <li><a href="#process" className="hover:text-[#D4AF37] transition-colors">Flower Packing Guide</a></li>
              <li><a href="#customizer" className="hover:text-[#D4AF37] transition-colors">3D Customizer Tool</a></li>
              <li><a href="#faq" className="hover:text-[#D4AF37] transition-colors">Yellowing & UV Protection</a></li>
              <li><a href="#testimonials" className="hover:text-[#D4AF37] transition-colors">Verified Customer Reviews</a></li>
              <li><a href="#contact" className="hover:text-[#D4AF37] transition-colors">Studio Location & Contact</a></li>
            </ul>
          </div>

          {/* Newsletter Perk */}
          <div className="space-y-3">
            <h4 className="font-serif-display text-base font-bold text-white">
              Stay Connected
            </h4>
            <p className="text-xs text-[#C4B8AD]">
              Subscribe for memory preservation tips, seasonal flower care guides, and 10% off your first frame.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#2A2421] border border-[#D4AF37]/30 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#B8860B] text-white text-xs font-bold transition-colors shadow-sm"
              >
                Get 10% Off Code
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C4B8AD]">
          <p>© 2026 YashoWorld. All Rights Reserved. Preserving Memories Forever.</p>
          <div className="flex items-center gap-4">
            <span>Made with <Heart className="w-3.5 h-3.5 text-[#D4AF37] inline fill-current" /> by YashoWorld</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#2A2421] hover:bg-[#D4AF37] text-white transition-colors"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
