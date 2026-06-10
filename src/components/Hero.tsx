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
      className="hero-nav-arrow absolute top-1/2 right-2 sm:right-6 md:right-8 -translate-y-1/2 z-20 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white/80 hover:text-white shadow-lg transition-all duration-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 touch-manipulation flex items-center justify-center opacity-0 group-hover:opacity-100"
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
      className="hero-nav-arrow absolute top-1/2 left-2 sm:left-6 md:left-8 -translate-y-1/2 z-20 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white/80 hover:text-white shadow-lg transition-all duration-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 touch-manipulation flex items-center justify-center opacity-0 group-hover:opacity-100"
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
  loop?: boolean; // Whether the video loops continuously (defaults to true)
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
  loop?: boolean;
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
  color: '#064e3b',
  opacity: 100,
};

// Helper to generate blue box style
function getBlueBoxStyle(blueBox?: BlueBoxSettings): React.CSSProperties {
  const settings = { ...defaultBlueBox, ...blueBox };
  const opacity = (settings.opacity ?? 100) / 100;

  return {
    backgroundColor: settings.color || '#064e3b',
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

// Subscribe to a YouTube iframe's player events so it streams back infoDelivery
// messages (currentTime/duration/playerState) that we use to loop the video.
function subscribeToYouTube(win: Window | null) {
  if (!win) return;
  try { win.postMessage('{"event":"listening"}', '*'); } catch { /* cross-origin: ignore */ }
}

// Send a command (e.g. seekTo, playVideo) to a YouTube iframe's player.
function sendYouTubeCommand(win: Window | null, func: string, args: unknown[] = []) {
  if (!win) return;
  try { win.postMessage(JSON.stringify({ event: 'command', func, args }), '*'); } catch { /* cross-origin: ignore */ }
}

// Send a command (e.g. play, setCurrentTime) to a Vimeo iframe's player.
function sendVimeoCommand(win: Window | null, method: string, value?: number) {
  if (!win) return;
  const payload = value === undefined ? { method } : { method, value };
  try { win.postMessage(JSON.stringify(payload), '*'); } catch { /* cross-origin: ignore */ }
}


interface HeroProps {
  slides?: CMSSlide[];
}

// How long each video slide is shown before the carousel advances (in seconds).
// The video loops continuously during this window, so it plays multiple times.
const VIDEO_SLIDE_DISPLAY_DURATION = 18;

// Restart a looping YouTube video this many seconds BEFORE it actually ends, so
// it always replays before YouTube can show its replay/end-screen. Kept generous
// because YouTube's time updates can arrive ~1s apart; tune lower for a tighter
// loop if needed.
const YOUTUBE_LOOP_RESTART_BUFFER = 1.5;

export default function Hero({ slides: propSlides }: HeroProps = {}) {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hideTextBoxForSlide, setHideTextBoxForSlide] = useState<number | null>(null);
  const sliderRef = useRef<Slider>(null);
  const videoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const videoIframeRefs = useRef<{ [key: number]: HTMLIFrameElement | null }>({});
  const directVideoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

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
          loop: slide.loop,
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

  // Track if we've already triggered slide change to prevent duplicates
  const hasTriggeredEndRef = useRef<{ [key: number]: boolean }>({});

  // Reset the triggered flag when slide changes
  useEffect(() => {
    hasTriggeredEndRef.current = {};
  }, [currentSlide]);

  // Robustly loop YouTube videos. The native loop=1&playlist param has "limited
  // support" in IFrame embeds and frequently lets the video stop on the replay
  // end-screen (unrecoverable here because controls are hidden). So we drive the
  // loop via the IFrame postMessage API: seek back to the start just BEFORE the
  // video ends (so the end-screen never renders — seamless), with an ended-state
  // fallback. Each iframe subscribes on load (see the iframe's onLoad below).
  useEffect(() => {
    // Debounce loop restarts per player so the burst of near-end time updates
    // only restarts once (otherwise repeated seekTo calls stutter).
    const lastRestart = new Map<MessageEventSource, number>();

    const handleMessage = (event: MessageEvent) => {
      // Accept both youtube.com and youtube-nocookie.com origins — a nocookie
      // embed sends its messages from the nocookie origin.
      if (!event.origin || !event.origin.includes('youtube')) return;

      let data: { event?: string; info?: number | { currentTime?: number; duration?: number; playerState?: number } };
      try {
        data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }
      if (!data || typeof data !== 'object') return;

      const src = event.source as Window | null;
      const info = data.info;

      // Pre-end watchdog: restart just before the true end so the replay/end
      // screen never appears. infoDelivery streams currentTime/duration. Cap the
      // buffer for short clips so they aren't cut short, and debounce so the
      // burst of near-end updates only restarts once.
      if (
        info && typeof info === 'object' &&
        typeof info.currentTime === 'number' && typeof info.duration === 'number' &&
        info.duration > 0
      ) {
        const buffer = Math.min(YOUTUBE_LOOP_RESTART_BUFFER, info.duration * 0.2);
        const now = Date.now();
        if (
          info.currentTime >= info.duration - buffer &&
          event.source && now - (lastRestart.get(event.source) ?? 0) >= 1000
        ) {
          lastRestart.set(event.source, now);
          sendYouTubeCommand(src, 'seekTo', [0, true]);
        }
      }

      // Fallback: if the video did reach ENDED (playerState 0), force a restart.
      const state = data.event === 'onStateChange'
        ? data.info
        : (info && typeof info === 'object' ? info.playerState : undefined);
      if (state === 0) {
        sendYouTubeCommand(src, 'seekTo', [0, true]);
        sendYouTubeCommand(src, 'playVideo');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Replay the active slide's video from the start whenever the slide changes.
  // In fade mode every video iframe is mounted and playing in the background, so
  // without this a video would resume mid-clip when you navigate to its slide.
  useEffect(() => {
    if (slides.length === 0) return;
    const slide = slides[currentSlide];
    if (!slide || slide.mediaType !== 'video' || !slide.videoUrl) return;

    const source = getVideoSource(slide.videoUrl);
    if (source.type === 'youtube') {
      const win = videoIframeRefs.current[currentSlide]?.contentWindow ?? null;
      subscribeToYouTube(win); // ensure looping watchdog is active for this player
      sendYouTubeCommand(win, 'seekTo', [0, true]);
      sendYouTubeCommand(win, 'playVideo');
    } else if (source.type === 'vimeo') {
      const win = videoIframeRefs.current[currentSlide]?.contentWindow ?? null;
      sendVimeoCommand(win, 'setCurrentTime', 0);
      sendVimeoCommand(win, 'play');
    } else {
      const video = directVideoRefs.current[currentSlide];
      if (video) {
        video.currentTime = 0;
        void video.play().catch(() => { /* autoplay restrictions: ignore */ });
      }
    }
  }, [currentSlide, slides]);

  // Handle autoplay and video timing.
  // Video slides loop continuously, so we pause react-slick autoplay and use a
  // manual timer to advance after VIDEO_SLIDE_DISPLAY_DURATION (the video plays
  // through several times first). Image slides use normal react-slick autoplay.
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
      // Pause slider autoplay for video slides - we control timing manually so
      // the looping video stays on screen for the full display duration.
      sliderRef.current.slickPause();

      videoTimerRef.current = setTimeout(() => {
        if (!hasTriggeredEndRef.current[currentSlide]) {
          hasTriggeredEndRef.current[currentSlide] = true;
          goToNextSlide();
        }
      }, VIDEO_SLIDE_DISPLAY_DURATION * 1000);
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
  }, [currentSlide, slides, goToNextSlide]);

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
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20">
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
          const videoSource = isVideo ? getVideoSource(slide.videoUrl!, slide.loop ?? true) : null; // Loop video unless disabled per-slide in the CMS; carousel advances on a fixed timer

          return (
            <div key={idx}>
              <div
                className="relative w-full h-[50vh] sm:h-[calc(100vh-80px)] flex items-center justify-center"
              >
                {/* Frosted glass background — only for video on mobile */}
                {isVideo && (
                  <div className="absolute inset-0 overflow-hidden sm:hidden bg-gray-400/30 backdrop-blur-sm" aria-hidden="true" />
                )}

                {/* Video or Image Background */}
                {isVideo && videoSource ? (
                  videoSource.type === 'youtube' || videoSource.type === 'vimeo' ? (
                    // YouTube/Vimeo - use wrapper div for full-screen cover effect
                    <div className="absolute inset-0 overflow-hidden">
                      <iframe
                        ref={(el) => { videoIframeRefs.current[idx] = el; }}
                        src={videoSource.src}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[100%] min-h-[100%] w-[177.78vh] h-[56.25vw]"
                        style={{ border: 'none', pointerEvents: 'none' }}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={slide.alt}
                        onLoad={(e) => {
                          // Subscribe so we receive player state/time messages
                          // (used to loop the video). Retry to beat the player's
                          // readiness race. Harmless for non-YouTube embeds.
                          const win = e.currentTarget.contentWindow;
                          subscribeToYouTube(win);
                          [600, 1500, 3000].forEach((delay) => window.setTimeout(() => subscribeToYouTube(win), delay));
                        }}
                      />
                    </div>
                  ) : (
                    // Direct video file
                    <div className="absolute inset-0 overflow-hidden">
                      <video
                        ref={(el) => { directVideoRefs.current[idx] = el; }}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      >
                        <source src={videoSource.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )
                ) : (
                  // Image — contain on mobile (full image visible), cover on desktop
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


                {/* Mobile: gradient overlay at bottom with text (no box) */}
                <div
                  className="sm:hidden absolute inset-x-0 bottom-0 z-20 transition-opacity duration-1000"
                  style={{ opacity: hideTextBoxForSlide === idx ? 0 : 1, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }}
                >
                  <div className="px-5 pb-10 pt-20">
                    <h1 className="font-display text-2xl font-semibold mb-2 text-white line-clamp-2" style={{ letterSpacing: '-0.03em', lineHeight: '1.1' }}>
                      {slide.headline}
                    </h1>
                    <p className="text-sm text-white/80 mb-4 line-clamp-2">
                      {slide.description}
                    </p>
                    {slide.cta && (
                      <Link
                        to={slide.ctaLink || "/scholarship-apply"}
                        className="inline-flex items-center gap-1.5 bg-getfund-gold text-getfund-secondary text-xs font-semibold px-4 py-2 rounded-full group"
                        aria-label={slide.ctaText || "Apply for GETFund scholarship program"}
                      >
                        {slide.ctaText || "Apply Now"}
                        <svg
                          className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform"
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

                {/* Desktop: modern editorial text overlay */}
                <div
                  className="hidden sm:flex absolute inset-0 z-20 items-end justify-start pb-20 md:pb-28 transition-opacity duration-1000"
                  style={{ opacity: hideTextBoxForSlide === idx ? 0 : 1 }}
                >
                  {/* Gradient fade from left for readability, no solid box */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />
                  <div className="slide-content pointer-events-auto relative px-8 md:px-16 lg:px-20 max-w-4xl">
                    {(slide.blueBox?.text || slide.blueBoxText) && (
                      <span className="inline-block text-xs md:text-sm text-getfund-gold mb-5 uppercase font-semibold" style={{ letterSpacing: '0.2em' }}>
                        {slide.blueBox?.text || slide.blueBoxText}
                      </span>
                    )}
                    <h1
                      className={`font-display ${getHeadlineSizeClasses(slide.titleFontSize)} font-semibold mb-5 text-white`}
                      style={{ letterSpacing: '-0.035em', lineHeight: '1.05' }}
                    >
                      {slide.headline}
                    </h1>
                    <p className={`${getDescriptionSizeClasses(slide.subtitleFontSize)} mb-8 text-white/85 leading-relaxed max-w-2xl`}>
                      {slide.description}
                    </p>
                    {slide.cta && (
                      <Link
                        to={slide.ctaLink || "/scholarship-apply"}
                        className="inline-flex items-center gap-2 bg-getfund-gold hover:bg-getfund-gold/90 text-getfund-secondary text-sm md:text-base font-semibold px-6 py-3 rounded-full transition-all duration-200 group shadow-md"
                        aria-label={slide.ctaText || "Apply for GETFund scholarship program"}
                      >
                        {slide.ctaText || "Apply Now"}
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform"
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
