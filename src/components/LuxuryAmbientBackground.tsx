import React from 'react';

export const LuxuryAmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Soft Ambient Radial Light Flares - Pastel Blush, Rose Gold & Soft Lilac */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-[#F8E8EE]/30 via-[#D4A373]/10 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-gradient-to-bl from-[#D8B4E2]/20 via-[#E8EFE6]/15 to-transparent rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-[#E8EFE6]/25 via-[#F8E8EE]/20 to-transparent rounded-full blur-3xl opacity-40 pointer-events-none" />

      {/* Floating Subtle Particles in Rose Gold */}
      <div className="absolute inset-0 opacity-25 dark:opacity-20 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#D4A373] opacity-60"
            style={{
              width: `${(i % 3) * 1.5 + 2}px`,
              height: `${(i % 3) * 1.5 + 2}px`,
              top: `${(i * 8.5) % 95}%`,
              left: `${(i * 12.3) % 95}%`,
            }}
          />
        ))}
      </div>

      {/* Subtle Soft Radial Dot Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#D4A373_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] dark:opacity-[0.05]" />
    </div>
  );
};
