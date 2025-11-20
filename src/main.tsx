import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';
import initHeaderHeight from './utils/headerHeight';

// Service worker registration temporarily disabled for debugging blank page / asset loading issues

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>
);

// Initialize header height CSS variable so breadcrumb and anchor offsets
// use the same runtime value as the header component.
initHeaderHeight();
