import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DevModeProvider } from './hooks/useDevMode';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from './components/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <DevModeProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </DevModeProvider>
    </ErrorBoundary>
  </StrictMode>,
);
