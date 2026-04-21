import { useState, useEffect, useRef, useCallback } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallbackSrc?: string;
  priority?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  fallbackSrc,
  priority = false
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

  return (
    <div className="relative h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        ref={imgRef}
        src={currentSrc}
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