// Utility function for smooth scrolling with responsive header offset
export const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    // Calculate responsive offset based on screen size (updated for larger header)
    const getOffset = () => {
      const width = window.innerWidth;
      if (width >= 1024) return 144; // lg screens (36 * 4px)
      if (width >= 768) return 128;  // md screens (32 * 4px)
      if (width >= 640) return 112;  // sm screens (28 * 4px)
      return 96; // mobile screens (24 * 4px)
    };

    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - getOffset();

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Handle anchor links with proper offset
export const handleAnchorClick = (href: string, e?: React.MouseEvent) => {
  if (href.startsWith('#')) {
    e?.preventDefault();
    const elementId = href.substring(1);
    scrollToElement(elementId);
  }
};