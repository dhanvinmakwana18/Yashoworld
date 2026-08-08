import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DevModeProvider } from './hooks/useDevMode';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DevModeProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </DevModeProvider>
  </StrictMode>,
);
