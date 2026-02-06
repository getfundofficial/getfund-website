import { Link } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cmsApi } from '../services/cmsApi';

interface ArrowProps {
  onClick?: () => void;
}

function NextArrow(props: ArrowProps) {
  const { onClick } = props;
  return (
    <button
      type="button"
      className="hero-nav-arrow absolute top-1/2 right-4 sm:right-6 md:right-8 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white/80 hover:text-white shadow-lg transition-all duration-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 touch-manipulation flex items-center justify-center opacity-0 group-hover:opacity-100"
      onClick={onClick}
      aria-label="Next slide"
    >
      <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" strokeWidth={2.5} />
    </button>
  );
}

function PrevArrow(props: ArrowProps) {
  const { onClick } = props;
  return (
    <button
      type="button"
      className="hero-nav-arrow absolute top-1/2 left-4 sm:left-6 md:left-8 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white/80 hover:text-white shadow-lg transition-all duration-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 touch-manipulation flex items-center justify-center opacity-0 group-hover:opacity-100"
      onClick={onClick}
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" strokeWidth={2.5} />
    </button>
  );
}
import OptimizedImage from './OptimizedImage';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type FontSize = 'small' | 'medium' | 'large' | 'xlarge';
type GradientDirection = 'to right' | 'to bottom' | 'to bottom right' | 'to top right';

interface SlideOverlay {
  tintColor?: string;
  tintColor2?: string;
  useGradient?: boolean;
  gradientDirection?: GradientDirection;
  tintOpacity?: number;
}

interface BlueBoxSettings {
  text?: string;
  color?: string;
  opacity?: number;
}

interface HeroSlide {
  src: string;
  alt: string;
  headline: string;
  description: string;
  cta: boolean;
  ctaText?: string;
  ctaLink?: string;
  titleFontSize?: FontSize;
  subtitleFontSize?: FontSize;
  overlay?: SlideOverlay;
  blueBoxText?: string; // Optional blue label text above headline (legacy)
  blueBox?: BlueBoxSettings; // New blue box settings with color/opacity
  mediaType?: 'image' | 'video'; // Type of media
  videoUrl?: string; // Video URL (YouTube, Vimeo, or direct mp4/webm)
}

interface CMSSlide {
  image: string;
  headline: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  titleFontSize?: FontSize;
  subtitleFontSize?: FontSize;
  overlay?: SlideOverlay;
  blueBoxText?: string;
  blueBox?: BlueBoxSettings;
  mediaType?: 'image' | 'video';
  videoUrl?: string;
}

// Default overlay settings
const defaultOverlay: SlideOverlay = {
  tintColor: '#059669', // green-600
  tintColor2: '#0d9488', // teal-600
  useGradient: true,
  gradientDirection: 'to bottom',
  tintOpacity: 60,
};

// Default blue box settings
const defaultBlueBox: BlueBoxSettings = {
  color: '#2a3f75',
  opacity: 100,
};

// Helper to generate blue box style
function getBlueBoxStyle(blueBox?: BlueBoxSettings): React.CSSProperties {
  const settings = { ...defaultBlueBox, ...blueBox };
  const opacity = (settings.opacity ?? 100) / 100;

  return {
    backgroundColor: settings.color || '#2a3f75',
    opacity: opacity,
  };
}

// Helper to generate overlay style - supports both solid and gradient (CMS-controllable)
function getOverlayStyle(overlay?: SlideOverlay): React.CSSProperties {
  const settings = { ...defaultOverlay, ...overlay };
  const opacity = (settings.tintOpacity ?? 60) / 100;

  if (settings.useGradient && settings.tintColor2) {
    return {
      background: `linear-gradient(${settings.gradientDirection || 'to bottom'}, ${settings.tintColor}${Math.round(opacity * 0.6 * 255).toString(16).padStart(2, '0')}, ${settings.tintColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}, ${settings.tintColor2}${Math.round(opacity * 255).toString(16).padStart(2, '0')})`,
    };
  }

  return {
    backgroundColor: settings.tintColor,
    opacity: opacity,
  };
}

// Helper to get headline font size classes - fixed sizes that don't scale on large screens
function getHeadlineSizeClasses(size?: FontSize): string {
  switch (size) {
    case 'small':
      return 'text-xl sm:text-2xl md:text-3xl';
    case 'large':
      return 'text-3xl sm:text-4xl md:text-5xl';
    case 'xlarge':
      return 'text-4xl sm:text-5xl md:text-6xl';
    case 'medium':
    default:
      return 'text-2xl sm:text-3xl md:text-4xl';
  }
}

// Helper to get description font size classes - fixed sizes that don't scale on large screens
function getDescriptionSizeClasses(size?: FontSize): string {
  switch (size) {
    case 'small':
      return 'text-sm md:text-base';
    case 'large':
      return 'text-lg md:text-xl';
    case 'xlarge':
      return 'text-xl md:text-2xl';
    case 'medium':
    default:
      return 'text-base md:text-lg';
  }
}

// Helper to detect if URL is a video
function isVideoUrl(url: string): boolean {
  if (!url) return false;
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
  const lowerUrl = url.toLowerCase();
  return videoExtensions.some(ext => lowerUrl.includes(ext)) ||
    lowerUrl.includes('youtube.com') ||
    lowerUrl.includes('youtu.be') ||
    lowerUrl.includes('vimeo.com');
}

// Helper to extract YouTube video ID
function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
}

// Helper to get YouTube embed URL - uses nocookie domain for cleaner appearance
function getYouTubeEmbedUrl(url: string, loop: boolean = false): string | null {
  const videoId = getYouTubeVideoId(url);
  if (videoId) {
    // Use youtube-nocookie.com for enhanced privacy mode (less branding)
    // enablejsapi=1 allows us to detect when video ends via postMessage
    // widget_referrer helps with cross-origin communication
    const loopParams = loop ? `&loop=1&playlist=${videoId}` : '';
    const origin = encodeURIComponent(window.location.origin);
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1${loopParams}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${origin}&widget_referrer=${origin}&iv_load_policy=3&fs=0&disablekb=1`;
  }
  return null;
}

// Helper to get Vimeo video ID
function getVimeoVideoId(url: string): string | null {
  const regExp = /vimeo\.com\/(\d+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

// Helper to get Vimeo embed URL
function getVimeoEmbedUrl(url: string, loop: boolean = false): string | null {
  const videoId = getVimeoVideoId(url);
  if (videoId) {
    const loopParam = loop ? '&loop=1' : '';
    return `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1${loopParam}&background=1&dnt=1`;
  }
  return null;
}

// Helper to get proper video source
function getVideoSource(url: string, loop: boolean = false): { type: 'youtube' | 'vimeo' | 'direct'; src: string; videoId?: string } {
  const youtubeId = getYouTubeVideoId(url);
  if (youtubeId) {
    const embedUrl = getYouTubeEmbedUrl(url, loop);
    return { type: 'youtube', src: embedUrl!, videoId: youtubeId };
  }

  const vimeoId = getVimeoVideoId(url);
  if (vimeoId) {
    const embedUrl = getVimeoEmbedUrl(url, loop);
    return { type: 'vimeo', src: embedUrl!, videoId: vimeoId };
  }

  // Direct video file
  return { type: 'direct', src: url };
}


interface HeroProps {
  slides?: CMSSlide[];
}

// Buffer time before video ends to switch slides (in seconds)
const VIDEO_END_BUFFER = 5;
// Minimum video duration to apply buffer (in seconds)
const MIN_VIDEO_DURATION_FOR_BUFFER = 10;
// Fallback duration if we can't detect video length (in seconds)
const FALLBACK_VIDEO_DURATION = 30;

export default function Hero({ slides: propSlides }: HeroProps = {}) {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hideTextBoxForSlide, setHideTextBoxForSlide] = useState<number | null>(null);
  const [videoDurations, setVideoDurations] = useState<{ [key: number]: number }>({});
  const sliderRef = useRef<Slider>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const iframeRefs = useRef<{ [key: number]: HTMLIFrameElement | null }>({});
  const videoTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Use prop slides or fetch from CMS
  useEffect(() => {
    // If slides are provided as props, use them
    if (propSlides && propSlides.length > 0) {
      const transformedSlides: HeroSlide[] = propSlides.map(slide => {
        // Detect media type from URL if not explicitly set
        const detectedMediaType = slide.mediaType || (slide.videoUrl && isVideoUrl(slide.videoUrl) ? 'video' : 'image');

        return {
          src: slide.image,
          alt: slide.headline,
          headline: slide.headline,
          description: slide.description,
          cta: !!slide.ctaText && !!slide.ctaLink,
          ctaText: slide.ctaText,
          ctaLink: slide.ctaLink,
          titleFontSize: slide.titleFontSize || 'medium',
          subtitleFontSize: slide.subtitleFontSize || 'medium',
          overlay: slide.overlay,
          blueBoxText: slide.blueBoxText,
          blueBox: slide.blueBox,
          mediaType: detectedMediaType,
          videoUrl: slide.videoUrl,
        };
      });
      setSlides(transformedSlides);
      setIsLoading(false);
      return;
    }

    // Otherwise fetch from CMS
    const fetchHeroSlides = async () => {
      try {
        const cmsSlides = await cmsApi.getHeroSlides();

        if (cmsSlides.length > 0) {
          // Transform CMS slides to component format
          const transformedSlides: HeroSlide[] = cmsSlides.map(slide => ({
            src: slide.image,
            alt: slide.title,
            headline: slide.title,
            description: slide.subtitle,
            cta: !!slide.buttonText && !!slide.buttonLink,
            ctaText: slide.buttonText,
            ctaLink: slide.buttonLink,
            titleFontSize: slide.titleFontSize || 'medium',
            subtitleFontSize: slide.subtitleFontSize || 'medium',
            blueBoxText: slide.blueBoxText,
            blueBox: slide.blueBox,
          }));

          setSlides(transformedSlides);
        } else {
          setSlides([]);
        }
      } catch {
        setSlides([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroSlides();
  }, [propSlides]);

  // Go to next slide
  const goToNextSlide = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  }, []);

  // Handle video end for direct videos (fallback if timer doesn't trigger)
  const handleVideoEnded = useCallback(() => {
    goToNextSlide();
  }, [goToNextSlide]);

  // Handle direct video metadata loaded - get duration
  const handleVideoLoadedMetadata = useCallback((idx: number, video: HTMLVideoElement) => {
    const duration = video.duration;
    if (duration && !isNaN(duration) && isFinite(duration)) {
      setVideoDurations(prev => ({ ...prev, [idx]: duration }));
    }
  }, []);

  // Track if we've already triggered slide change to prevent duplicates
  const hasTriggeredEndRef = useRef<{ [key: number]: boolean }>({});

  // Reset the triggered flag when slide changes
  useEffect(() => {
    hasTriggeredEndRef.current = {};
  }, [currentSlide]);

  // Handle YouTube/Vimeo iframe messages for video duration and end detection
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // YouTube sends messages when video state changes
      if (event.origin.includes('youtube')) {
        try {
          const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

          // Capture duration from YouTube info delivery
          if (data.event === 'infoDelivery' && data.info) {
            // Duration comes in various formats
            const duration = data.info.duration || data.info.videoDuration;
            if (duration && !isNaN(duration) && duration > 0) {
              setVideoDurations(prev => {
                if (!prev[currentSlide]) {
                  return { ...prev, [currentSlide]: duration };
                }
                return prev;
              });
            }
          }

          // Prevent duplicate triggers for end detection
          if (hasTriggeredEndRef.current[currentSlide]) return;

          // Check various YouTube message formats for ended state (playerState: 0)
          let isEnded = false;

          // Format 1: onStateChange event with info as state value
          if (data.event === 'onStateChange' && data.info === 0) {
            isEnded = true;
          }
          // Format 2: infoDelivery with nested playerState
          if (data.event === 'infoDelivery' && data.info && data.info.playerState === 0) {
            isEnded = true;
          }
          // Format 3: Direct playerState in data
          if (data.playerState === 0) {
            isEnded = true;
          }
          // Format 4: Check for 'ended' in event name
          if (data.event === 'ended' || data.info === 'ended') {
            isEnded = true;
          }

          if (isEnded) {
            hasTriggeredEndRef.current[currentSlide] = true;
            goToNextSlide();
          }
        } catch {
          // Ignore parse errors
        }
      }

      // Vimeo sends messages when video ends or provides duration
      if (event.origin.includes('vimeo')) {
        try {
          const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

          // Capture duration from Vimeo
          if (data.event === 'ready' || data.method === 'getDuration') {
            const duration = data.value || data.duration;
            if (duration && !isNaN(duration) && duration > 0) {
              setVideoDurations(prev => {
                if (!prev[currentSlide]) {
                  return { ...prev, [currentSlide]: duration };
                }
                return prev;
              });
            }
          }

          // Prevent duplicate triggers
          if (hasTriggeredEndRef.current[currentSlide]) return;

          if (data.event === 'ended' || data.method === 'ended') {
            hasTriggeredEndRef.current[currentSlide] = true;
            goToNextSlide();
          }
        } catch {
          // Ignore parse errors
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [goToNextSlide, currentSlide]);

  // Initialize YouTube iframe API event listening when iframe loads
  const handleYouTubeIframeLoad = useCallback((iframe: HTMLIFrameElement) => {
    if (iframe && iframe.contentWindow) {
      // Subscribe to YouTube events using multiple methods for compatibility

      // Method 1: Widget API listening command
      iframe.contentWindow.postMessage(JSON.stringify({
        event: 'listening',
        id: 1,
        channel: 'widget'
      }), '*');

      // Method 2: addEventListener command
      iframe.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: 'addEventListener',
        args: ['onStateChange']
      }), '*');

      // Method 3: Older format
      setTimeout(() => {
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage('{"event":"listening"}', '*');
          // Also request video info which includes duration
          iframe.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: 'getVideoData',
            args: []
          }), '*');
          iframe.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: 'getDuration',
            args: []
          }), '*');
        }
      }, 500);

      // Request duration after a delay to ensure video is loaded
      setTimeout(() => {
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: 'getDuration',
            args: []
          }), '*');
        }
      }, 2000);
    }
  }, []);

  // Subscribe to Vimeo events when iframe loads
  const handleVimeoIframeLoad = useCallback((iframe: HTMLIFrameElement) => {
    if (iframe && iframe.contentWindow) {
      // Subscribe to Vimeo events
      iframe.contentWindow.postMessage(JSON.stringify({
        method: 'addEventListener',
        value: 'ended'
      }), '*');

      // Request duration
      iframe.contentWindow.postMessage(JSON.stringify({
        method: 'getDuration'
      }), '*');

      // Request duration after a delay to ensure video is loaded
      setTimeout(() => {
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage(JSON.stringify({
            method: 'getDuration'
          }), '*');
        }
      }, 2000);
    }
  }, []);

  // Handle autoplay and video timing
  // For video slides: pause autoplay and use custom timer based on video duration
  // For image slides: use normal autoplay
  useEffect(() => {
    if (slides.length === 0 || !sliderRef.current) return;

    const slide = slides[currentSlide];
    const isVideo = slide?.mediaType === 'video' && slide?.videoUrl;

    // Clear any existing video timer
    if (videoTimerRef.current) {
      clearTimeout(videoTimerRef.current);
      videoTimerRef.current = null;
    }

    if (isVideo) {
      // Pause slider autoplay for video slides - we control timing manually
      sliderRef.current.slickPause();

      // Get the video duration (if we've detected it)
      const duration = videoDurations[currentSlide];

      // Calculate when to switch (duration - buffer, minimum 5 seconds)
      let switchDelay: number;

      if (duration && duration > MIN_VIDEO_DURATION_FOR_BUFFER) {
        // Switch 5 seconds before video ends
        switchDelay = Math.max((duration - VIDEO_END_BUFFER) * 1000, 5000);
      } else if (duration) {
        // Short video - switch at 80% of duration or after 3 seconds minimum
        switchDelay = Math.max(duration * 0.8 * 1000, 3000);
      } else {
        // No duration detected yet - use fallback, but set up a re-check
        switchDelay = (FALLBACK_VIDEO_DURATION - VIDEO_END_BUFFER) * 1000;
      }

      // Set timer to advance slide
      videoTimerRef.current = setTimeout(() => {
        if (!hasTriggeredEndRef.current[currentSlide]) {
          hasTriggeredEndRef.current[currentSlide] = true;
          goToNextSlide();
        }
      }, switchDelay);

    } else {
      // Image slide - use normal autoplay
      sliderRef.current.slickPlay();
    }

    // Cleanup timer on unmount or slide change
    return () => {
      if (videoTimerRef.current) {
        clearTimeout(videoTimerRef.current);
        videoTimerRef.current = null;
      }
    };
  }, [currentSlide, slides, videoDurations, goToNextSlide]);

  // Re-trigger timer when video duration becomes available
  useEffect(() => {
    if (slides.length === 0 || !sliderRef.current) return;

    const slide = slides[currentSlide];
    const isVideo = slide?.mediaType === 'video' && slide?.videoUrl;
    const duration = videoDurations[currentSlide];

    // If we're on a video slide and just got the duration, update the timer
    if (isVideo && duration && videoTimerRef.current) {
      // Clear existing timer
      clearTimeout(videoTimerRef.current);

      // Calculate new switch delay based on actual duration
      let switchDelay: number;
      if (duration > MIN_VIDEO_DURATION_FOR_BUFFER) {
        switchDelay = Math.max((duration - VIDEO_END_BUFFER) * 1000, 5000);
      } else {
        switchDelay = Math.max(duration * 0.8 * 1000, 3000);
      }

      // Set new timer (accounting for time already elapsed - approximate)
      videoTimerRef.current = setTimeout(() => {
        if (!hasTriggeredEndRef.current[currentSlide]) {
          hasTriggeredEndRef.current[currentSlide] = true;
          goToNextSlide();
        }
      }, switchDelay);
    }
  }, [videoDurations, currentSlide, slides, goToNextSlide]);

  // Handle text box fade for video slides only
  useEffect(() => {
    if (slides.length === 0) return;

    // Reset text box visibility when slide changes
    setHideTextBoxForSlide(null);

    const slide = slides[currentSlide];
    const isVideo = slide?.mediaType === 'video' && slide?.videoUrl;

    // Only fade out text box on video slides
    if (!isVideo) return;

    // Fade out text box after 5 seconds on video slides
    const slideIndex = currentSlide;
    const timerId = setTimeout(() => {
      setHideTextBoxForSlide(slideIndex);
    }, 5000);

    // Cleanup timer on unmount or slide change
    return () => {
      clearTimeout(timerId);
    };
  }, [currentSlide, slides]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    fade: true,
    cssEase: 'ease-out',
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // We control this dynamically via slickPause/slickPlay
    autoplaySpeed: 5000,
    arrows: true,
    pauseOnHover: false, // We handle pausing manually for videos
    waitForAnimate: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_current: number, next: number) => {
      setCurrentSlide(next);
    },
    afterChange: (current: number) => {
      // Ensure state is synced after change
      setCurrentSlide(current);
    },
    appendDots: (dots: React.ReactNode) => (
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <ul className="flex gap-2 justify-center items-center">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <button className="w-3 h-3 rounded-full bg-white/70 hover:bg-white/90 border border-white/80 transition-colors"></button>
    ),
  };

  // Don't render anything while loading or if no slides
  if (isLoading) {
    return null;
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <section className="group relative bg-transparent text-white overflow-hidden mt-[80px]">
      {/* Carousel Background */}
      <Slider ref={sliderRef} {...settings} className="w-full">
        {slides.map((slide, idx) => {
          const isVideo = slide.mediaType === 'video' && slide.videoUrl;
          const videoSource = isVideo ? getVideoSource(slide.videoUrl!, false) : null; // No loop - we control advancement

          return (
            <div key={idx}>
              <div
                className="relative h-[calc(100vh-80px)] w-full flex items-center justify-center"
              >
                {/* Video or Image Background */}
                {isVideo && videoSource ? (
                  videoSource.type === 'youtube' || videoSource.type === 'vimeo' ? (
                    // YouTube/Vimeo - use wrapper div for full-screen cover effect
                    <div className="absolute inset-0 overflow-hidden bg-black">
                      <iframe
                        ref={(el) => { iframeRefs.current[idx] = el; }}
                        src={videoSource.src}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[100%] min-h-[100%] w-[177.78vh] h-[56.25vw]"
                        style={{ border: 'none', pointerEvents: 'none' }}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={slide.alt}
                        onLoad={(e) => {
                          if (videoSource.type === 'youtube') {
                            handleYouTubeIframeLoad(e.currentTarget);
                          } else if (videoSource.type === 'vimeo') {
                            handleVimeoIframeLoad(e.currentTarget);
                          }
                        }}
                      />
                    </div>
                  ) : (
                    // Direct video file - full screen cover
                    <div className="absolute inset-0 overflow-hidden bg-black">
                      <video
                        ref={(el) => { videoRefs.current[idx] = el; }}
                        autoPlay
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        onEnded={handleVideoEnded}
                        onLoadedMetadata={(e) => handleVideoLoadedMetadata(idx, e.currentTarget)}
                      >
                        <source src={videoSource.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )
                ) : (
                  // Image - full screen cover
                  <div className="absolute inset-0 overflow-hidden">
                    <OptimizedImage
                      src={slide.src}
                      alt={slide.alt}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      width={1920}
                      height={1080}
                      priority={idx === 0}
                    />
                  </div>
                )}
                {/* Dynamic overlay - customizable per slide */}
                <div
                  className="absolute inset-0 z-10"
                  style={getOverlayStyle(slide.overlay)}
                />


                {/* Blue Content Box - Bottom Left - Fixed size */}
                <div
                  className="absolute inset-0 z-20 flex items-end justify-start px-4 sm:px-8 md:px-12 pb-12 sm:pb-16 md:pb-20 transition-opacity duration-1000"
                  style={{ opacity: hideTextBoxForSlide === idx ? 0 : 1 }}
                >
                  <div
                    className="slide-content pointer-events-auto p-6 sm:p-8 md:p-10 max-w-xl"
                    style={getBlueBoxStyle(slide.blueBox)}
                  >
                    {(slide.blueBox?.text || slide.blueBoxText) && (
                      <span className="inline-block text-sm text-blue-200 mb-2 uppercase tracking-wider font-medium">
                        {slide.blueBox?.text || slide.blueBoxText}
                      </span>
                    )}
                    <h1 className={`${getHeadlineSizeClasses(slide.titleFontSize)} font-bold mb-4 leading-tight text-white`}>
                      {slide.headline}
                    </h1>
                    <p className={`${getDescriptionSizeClasses(slide.subtitleFontSize)} mb-5 text-gray-200 leading-relaxed`}>
                      {slide.description}
                    </p>
                    {slide.cta && (
                      <Link
                        to={slide.ctaLink || "/scholarship-apply"}
                        className="inline-flex items-center gap-2 text-white text-base uppercase tracking-wider font-semibold hover:text-blue-200 transition-colors group"
                        aria-label={slide.ctaText || "Apply for GETFund scholarship program"}
                      >
                        {slide.ctaText || "Apply Now"}
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </section>
  );
}
