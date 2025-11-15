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

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;

      // Check if scrolled past threshold
      setIsScrolled(scrollY > threshold);
      setScrollY(scrollY);

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      setScrollDirection(scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { scrollDirection, scrollY, isScrolled };
};
