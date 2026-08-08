import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { openEmailClient } from '../lib/emailUtils';
import {
  Sparkles,
  Instagram,
  MessageCircle,
  Mail,
  Send,
  Clock,
  CheckCircle2,
  Paperclip,
  Upload,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Wedding Garland Preservation',
    message: '',
    attachedFileName: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, attachedFileName: e.target.files[0].name });
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#F5EFE6] dark:bg-[#1C1815]">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold border border-[#D4AF37]/30 mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-semibold tracking-wide text-[#8B5E3C] dark:text-[#E5C158] uppercase">
              Get in Touch
            </span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A2421] dark:text-[#F5EFE6] tracking-tight mb-4">
            Let's Craft Your <span className="italic font-serif-body text-gold-gradient font-normal">Forever Memory</span>
          </h2>
          <p className="text-base text-[#6B5E55] dark:text-[#C4B8AD] max-w-2xl mx-auto">
            Have a custom idea or fresh event flowers coming up? Send us a message or connect directly via WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-white/80 dark:border-[#D4AF37]/25 shadow-xl space-y-6">
              <h3 className="font-serif-display text-2xl font-bold text-[#2A2421] dark:text-[#F5EFE6] mb-6 border-b border-[#D4AF37]/20 pb-4">
                Studio Reach
              </h3>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/pourfection_by_yashvi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-4 p-3 rounded-2xl hover:bg-white/50 dark:hover:bg-[#2A2421]/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif-display text-base font-bold text-[#2A2421] dark:text-[#F5EFE6]">
                    Instagram
                  </h4>
                  <p className="text-xs text-[#8B5E3C] dark:text-[#D4AF37] font-semibold">
                    @pourfection_by_yashvi
                  </p>
                  <span className="text-[11px] text-[#6B5E55] dark:text-[#C4B8AD]">
                    Daily behind-the-scenes resin casting videos & gallery
                  </span>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-4 p-3 rounded-2xl hover:bg-white/50 dark:hover:bg-[#2A2421]/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif-display text-base font-bold text-[#2A2421] dark:text-[#F5EFE6]">
                    WhatsApp Instant Support
                  </h4>
                  <p className="text-xs text-[#8B5E3C] dark:text-[#D4AF37] font-semibold">
                    Instant Chat Assistance
                  </p>
                  <span className="text-[11px] text-[#6B5E55] dark:text-[#C4B8AD]">
                    Immediate assistance & flower packing guidance
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=pourfectionbyyashvi@gmail.com"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  openEmailClient('pourfectionbyyashvi@gmail.com', 'Custom Inquiry - YashoWorld Resin Art');
                }}
                className="flex items-start gap-4 p-3 rounded-2xl hover:bg-white/50 dark:hover:bg-[#2A2421]/50 transition-colors group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#8B5E3C] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif-display text-base font-bold text-[#2A2421] dark:text-[#F5EFE6]">
                    Email Inquiries
                  </h4>
                  <p className="text-xs text-[#8B5E3C] dark:text-[#D4AF37] font-semibold">
                    pourfectionbyyashvi@gmail.com
                  </p>
                  <span className="text-[11px] text-[#6B5E55] dark:text-[#C4B8AD]">
                    Bulk corporate & return favor orders
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Interactive Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/90 dark:border-[#D4AF37]/30 shadow-2xl relative">
              <h3 className="font-serif-display text-2xl font-bold text-[#2A2421] dark:text-[#F5EFE6] mb-2">
                Inquiry
              </h3>
              <p className="text-xs text-[#6B5E55] dark:text-[#C4B8AD] mb-8">
                Fill out your details below and our design team will reply within 2 hours.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-serif-display text-2xl font-bold text-[#2A2421] dark:text-[#F5EFE6]">
                    Inquiry Received with Love
                  </h4>
                  <p className="text-sm text-[#6B5E55] dark:text-[#C4B8AD] max-w-md mx-auto">
                    Thank you, {formData.name}! Our studio team will review your request and send flower preservation guidelines to {formData.email} shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        eventType: 'Wedding Garland Preservation',
                        message: '',
                        attachedFileName: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-white text-xs font-semibold shadow-md hover:bg-[#B8860B] transition-colors"
                  >
                    Send Another Request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold text-[#2A2421] dark:text-[#F5EFE6] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-[#12100E] border border-[#D4AF37]/30 text-sm text-[#2A2421] dark:text-[#F5EFE6] focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold text-[#2A2421] dark:text-[#F5EFE6] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-[#12100E] border border-[#D4AF37]/30 text-sm text-[#2A2421] dark:text-[#F5EFE6] focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-bold text-[#2A2421] dark:text-[#F5EFE6] mb-1.5">
                        WhatsApp Phone *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        placeholder="Enter mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-[#12100E] border border-[#D4AF37]/30 text-sm text-[#2A2421] dark:text-[#F5EFE6] focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-event-type" className="block text-xs font-bold text-[#2A2421] dark:text-[#F5EFE6] mb-1.5">
                        Occasion / Service Type
                      </label>
                      <select
                        id="contact-event-type"
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-[#12100E] border border-[#D4AF37]/30 text-sm text-[#2A2421] dark:text-[#F5EFE6] focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]"
                      >
                        <option value="Wedding Garland Preservation">Wedding Garland Preservation</option>
                        <option value="Baby Milestone Keepsake">Baby Milestone Keepsake</option>
                        <option value="Resin Name Plate">Resin Name Plate</option>
                        <option value="Geode Wall Clock">Geode Wall Clock</option>
                        <option value="Return Favors / Bulk Order">Return Favors / Bulk Order</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold text-[#2A2421] dark:text-[#F5EFE6] mb-1.5">
                      Your Message & Custom Ideas
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="Share your wedding date, flower colors, or custom text..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-[#12100E] border border-[#D4AF37]/30 text-sm text-[#2A2421] dark:text-[#F5EFE6] focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]"
                    />
                  </div>

                  {/* File Upload Simulation */}
                  <div className="border-2 border-dashed border-[#D4AF37]/40 rounded-2xl p-4 text-center hover:bg-white/40 dark:hover:bg-[#12100E]/40 transition-colors relative">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-5 h-5 text-[#D4AF37] mx-auto mb-1" />
                    <span className="text-xs font-semibold text-[#2A2421] dark:text-[#F5EFE6] block">
                      {formData.attachedFileName || 'Attach Reference Photo / Flower Image (Optional)'}
                    </span>
                    <span className="text-[10px] text-[#6B5E55] dark:text-[#C4B8AD]">
                      PNG, JPG up to 10MB
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#AA7C11] to-[#8B5E3C] text-white font-semibold text-sm tracking-wide shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <Sparkles className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Custom Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
