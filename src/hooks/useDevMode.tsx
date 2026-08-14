import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DevModeContextType {
  isDevMode: boolean;
  toggleDevMode: () => void;
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export const DevModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDevMode, setIsDevMode] = useState(false);

  const toggleDevMode = () => setIsDevMode((prev) => !prev);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Dev Mode with Ctrl + Shift + D (or Cmd + Shift + D on Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        toggleDevMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <DevModeContext.Provider value={{ isDevMode, toggleDevMode }}>
      {children}
      {isDevMode && (
        <div className="fixed bottom-4 left-4 z-[9999] bg-gradient-to-r from-gray-900 to-black text-white px-4 py-2 rounded-full font-bold shadow-2xl flex items-center gap-2 border border-gray-700 backdrop-blur-md text-xs cursor-pointer hover:bg-gray-800 transition-colors" onClick={toggleDevMode} title="Click to disable Developer Mode">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          Dev Mode
        </div>
      )}
    </DevModeContext.Provider>
  );
};

export const useDevMode = () => {
  const context = useContext(DevModeContext);
  if (!context) {
    return { isDevMode: false, toggleDevMode: () => {} };
  }
  return context;
};
