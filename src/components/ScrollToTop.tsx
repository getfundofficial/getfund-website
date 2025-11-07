import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when the route changes
    const scrollToTop = () => {
      try {
        // Force scroll to top using multiple methods
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Additional method for better browser compatibility
        if (document.scrollingElement) {
          document.scrollingElement.scrollTop = 0;
        }

        // Force repaint to ensure scroll takes effect
        document.documentElement.scrollIntoView({ behavior: 'instant', block: 'start' });
        
        // Focus management to ensure proper scroll position
        document.body.focus();
        
        // Special handling for service pages
        if (pathname.includes('/service/')) {
          const header = document.querySelector('header');
          if (header) {
            header.scrollIntoView({ behavior: 'instant', block: 'start' });
          }
        }
      } catch (error) {
        console.warn('ScrollToTop error:', error);
      }
    };

    // Immediate scroll
    scrollToTop();
    
    // Multiple backup scrolls with different delays for reliability
    const timeouts = [
      setTimeout(scrollToTop, 1),
      setTimeout(scrollToTop, 10),
      setTimeout(scrollToTop, 25),
      setTimeout(scrollToTop, 50),
      setTimeout(scrollToTop, 100),
      setTimeout(scrollToTop, 200),
      setTimeout(scrollToTop, 400)
    ];
    
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;