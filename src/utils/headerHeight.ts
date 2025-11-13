// Utility to keep a single source of truth for header height.
// Exports an initializer that sets the CSS variable --header-height and
// updates it on resize so CSS (breadcrumbs, scroll-padding) follows JS values.

const HEADER_HEIGHTS = {
  sm: 112, // small screens (px)
  md: 128, // medium screens (px)
  lg: 144, // large screens (px)
};

export function getHeaderHeight(windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0) {
  if (windowWidth >= 1024) return HEADER_HEIGHTS.lg;
  if (windowWidth >= 768) return HEADER_HEIGHTS.md;
  return HEADER_HEIGHTS.sm;
}

export function setHeaderHeightVar(value: number) {
  try {
    document.documentElement.style.setProperty('--header-height', `${value}px`);
  } catch {
    // noop in environments without document
  }
}

let rafId: number | null = null;

export function initHeaderHeight() {
  // Set immediately
  if (typeof window !== 'undefined') {
    setHeaderHeightVar(getHeaderHeight(window.innerWidth));

    const onResize = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setHeaderHeightVar(getHeaderHeight(window.innerWidth));
        rafId = null;
      });
    };

    window.addEventListener('resize', onResize);

    // Return a cleanup function in case caller wants to remove the listener
    return () => window.removeEventListener('resize', onResize);
  }

  return () => {};
}

export default initHeaderHeight;
