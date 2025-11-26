import { useState, useEffect } from 'react';

interface ScrollDirection {
  scrollDirection: 'up' | 'down' | null;
  scrollY: number;
  isScrolled: boolean;
}

export const useScrollDirection = (threshold: number = 10): ScrollDirection => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    let lastUpdateTime = Date.now();

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const now = Date.now();

      // Check if scrolled past threshold
      setIsScrolled(scrollY > threshold);
      setScrollY(scrollY);

      // Require larger movement and debounce updates to prevent flickering
      const scrollDiff = Math.abs(scrollY - lastScrollY);
      const timeDiff = now - lastUpdateTime;
      
      // Only update direction if: scrolled more than threshold AND
      // either moved significantly (50px) or enough time passed (150ms)
      if (scrollDiff < threshold || (scrollDiff < 50 && timeDiff < 150)) {
        ticking = false;
        return;
      }

      setScrollDirection(scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      lastUpdateTime = now;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { scrollDirection, scrollY, isScrolled };
};
