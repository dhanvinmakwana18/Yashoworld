import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Sparkles, X, ShoppingBag, Heart, ArrowRight } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'cart' | 'wishlist' | 'custom' | 'info';
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <aside aria-label="Notifications" className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-auto w-full p-4 rounded-2xl bg-white/95 dark:bg-[#2A0818]/95 backdrop-blur-xl border border-[#D4AF37]/40 shadow-[0_12px_36px_rgba(102,0,51,0.18)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.6)] flex items-start gap-3.5 relative overflow-hidden"
          >
            {/* Ambient Gold Sheen Corner */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-full blur-xl pointer-events-none" />

            {/* Icon */}
            <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] dark:bg-[#3D0B23] border border-[#D4AF37]/30 flex items-center justify-center shrink-0 text-[#8B5E3C] dark:text-[#F3C06B] shadow-xs">
              {toast.type === 'cart' && <ShoppingBag className="w-4 h-4" />}
              {toast.type === 'wishlist' && <Heart className="w-4 h-4 fill-current text-rose-500" />}
              {toast.type === 'custom' && <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />}
              {toast.type === 'info' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
            </div>

            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-serif-display font-bold text-[#660033] dark:text-[#FAF7F2] tracking-wide">
                {toast.title}
              </h4>
              {toast.description && (
                <p className="text-[11px] text-[#4A3728] dark:text-[#E8D8CD] mt-0.5 line-clamp-2 leading-relaxed">
                  {toast.description}
                </p>
              )}

              {toast.actionLabel && toast.onAction && (
                <button
                  onClick={() => {
                    toast.onAction?.();
                    onDismiss(toast.id);
                  }}
                  className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#8B4513] dark:text-[#F3C06B] hover:text-[#D4AF37] flex items-center gap-1 transition-colors"
                >
                  <span>{toast.actionLabel}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss notification"
              className="p-1 rounded-lg text-[#660033]/60 dark:text-[#FAF7F2]/60 hover:text-[#660033] dark:hover:text-[#FAF7F2] hover:bg-[#FAF7F2] dark:hover:bg-[#3D0B23] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </aside>
  );
};
