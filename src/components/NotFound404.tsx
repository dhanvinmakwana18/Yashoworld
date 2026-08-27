import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, SearchX } from 'lucide-react';
import { motion } from 'motion/react';

export const NotFound404: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#120D10] text-[#2A0818] dark:text-[#FAF7F2] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      <Helmet>
        <title>Page Not Found | YashoWorld</title>
      </Helmet>

      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-[#D4AF37] to-transparent blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tl from-[#8B5E3C] to-transparent blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center max-w-md text-center"
      >
        <div className="mb-6 p-4 rounded-full bg-[#FAF7F2] dark:bg-[#2A0818] shadow-xl border border-[#D4AF37]/30">
          <SearchX className="w-12 h-12 text-[#8B5E3C] dark:text-[#D4AF37]" />
        </div>
        
        <h1 className="font-serif-display text-5xl md:text-7xl font-bold mb-4 tracking-tight text-[#660033] dark:text-[#FAF7F2]">
          404
        </h1>
        
        <h2 className="text-xl md:text-2xl font-semibold mb-3 tracking-wide text-[#8B4513] dark:text-[#D4AF37]">
          Page Not Found
        </h2>
        
        <p className="text-sm md:text-base opacity-80 mb-10 leading-relaxed font-light">
          The artisan piece or page you are looking for does not exist or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <a
            href="/"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#8B5E3C] to-[#660033] dark:from-[#D4AF37] dark:to-[#AA7C11] text-white dark:text-[#2A0818] font-bold text-xs uppercase tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 dark:focus:ring-offset-[#120D10]"
            aria-label="Return to Homepage"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </a>
          <a
            href="/#products"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white dark:bg-[#2A0818] text-[#8B4513] dark:text-[#D4AF37] border border-[#D4AF37]/50 font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg hover:bg-[#FAF7F2] dark:hover:bg-[#3D0B23] transition-all focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 dark:focus:ring-offset-[#120D10]"
            aria-label="Browse the Gallery"
          >
            Browse Products
          </a>
        </div>
      </motion.div>
    </div>
  );
};
