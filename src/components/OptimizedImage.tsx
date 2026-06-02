import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Responsive width ladder (px). MUST match VARIANT_WIDTHS in the CMS backend
 * (lib/image-processing.ts) so we only ever request `-<width>w.webp` files the
 * backend actually generated.
 */
const VARIANT_WIDTHS = [400, 800, 1600];

// Matches the canonical name the backend stores, e.g. ".../1764245664362-photo-1600w.webp".
const VARIANT_NAME = /-(\d+)w\.webp($|\?)/i;

/**
 * Build a `srcset` from a canonical variant URL by swapping the width token.
 * Only emits widths the canonical name guarantees exist (the ladder values below
 * the canonical width, plus the canonical width itself), so there is no 404 risk.
 * Returns `undefined` for any URL that isn't a generated variant (old uploads,
 * /images/* assets, external URLs) — those fall back to a plain <img src>.
 */
function buildSrcSet(src: string): string | undefined {
  const match = src.match(VARIANT_NAME);
  if (!match) return undefined;

  const maxWidth = parseInt(match[1], 10);
  const widths = Array.from(
    new Set([...VARIANT_WIDTHS.filter((w) => w < maxWidth), maxWidth])
  ).sort((a, b) => a - b);

  // A single width offers no responsive benefit.
  if (widths.length < 2) return undefined;

  return widths
    .map((w) => `${src.replace(VARIANT_NAME, `-${w}w.webp$2`)} ${w}w`)
    .join(', ');
}

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallbackSrc?: string;
  priority?: boolean;
  /**
   * The `sizes` attribute describing the slot width at each breakpoint
   * (e.g. "(max-width: 640px) 100vw, 33vw"). Defaults to "100vw". Only used
   * when the image has responsive variants.
   */
  sizes?: string;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  fallbackSrc,
  priority = false,
  sizes = '100vw'
}: OptimizedImageProps) {
  const effectiveSrc = src?.trim() || fallbackSrc || '';
  const [isLoading, setIsLoading] = useState(!!effectiveSrc);
  const [hasError, setHasError] = useState(!effectiveSrc);
  const [currentSrc, setCurrentSrc] = useState(effectiveSrc);
  const imgRef = useRef<HTMLImageElement>(null);

  // Update currentSrc when src prop changes
  useEffect(() => {
    const newSrc = src?.trim() || fallbackSrc || '';
    if (!newSrc) {
      setHasError(true);
      setIsLoading(false);
      return;
    }
    setCurrentSrc(newSrc);
    setIsLoading(true);
    setHasError(false);
  }, [src, fallbackSrc]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setIsLoading(true);
      setHasError(false);
      return;
    }
    setHasError(true);
  }, [fallbackSrc, currentSrc]);

  // Check if image is already loaded (from browser cache).
  // onLoad may not re-fire for cached images, so we check img.complete.
  // Use requestAnimationFrame retry to handle race conditions on refresh.
  useEffect(() => {
    let cancelled = false;

    const checkComplete = () => {
      if (cancelled) return;
      const img = imgRef.current;
      if (img && img.complete) {
        if (img.naturalWidth > 0) {
          setIsLoading(false);
        } else if (currentSrc) {
          handleError();
        }
      }
    };

    // Check immediately, then retry after paint for reliability
    checkComplete();
    requestAnimationFrame(checkComplete);

    // Safety timeout: if still loading after 5s, force reveal the image
    const timeout = setTimeout(() => {
      if (!cancelled) setIsLoading(false);
    }, 5000);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [currentSrc, handleError]);

  // Handle bfcache restoration — re-evaluate image state when page is restored
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        const img = imgRef.current;
        if (img && img.complete && img.naturalWidth > 0) {
          setIsLoading(false);
          setHasError(false);
        }
      }
    };
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, []);

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <div className="text-gray-500 text-center p-4">
          <div className="text-2xl mb-2">🖼️</div>
          <div className="text-sm">Image not available</div>
        </div>
      </div>
    );
  }

  const responsiveSrcSet = buildSrcSet(currentSrc);

  return (
    <div className="relative h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        ref={imgRef}
        src={currentSrc}
        srcSet={responsiveSrcSet}
        sizes={responsiveSrcSet ? sizes : undefined}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={handleLoad}
        onError={handleError}
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ${className}`}
      />
    </div>
  );
}