import { useRef } from 'react';

interface VideoSectionProps {
  title?: string;
  subtitle?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  provider?: 'youtube' | 'vimeo' | 'upload';
  className?: string;
  autoplay?: boolean;
}

export default function VideoSection({
  title = 'See Our Impact in Action',
  subtitle = 'Watch how GETFund is transforming education across Ghana',
  videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  provider = 'youtube',
  className = '',
  autoplay = true,
}: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Extract video ID from YouTube URL
  const getYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  // Extract video ID from Vimeo URL
  const getVimeoId = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  };

  const renderVideo = () => {
    if (provider === 'youtube') {
      const videoId = getYouTubeId(videoUrl);
      if (!videoId) return null;

      // YouTube embed with autoplay, muted (required for autoplay), loop, and minimal controls
      // Scale up iframe to fill container (simulating object-cover)
      return (
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] min-w-full min-h-full pointer-events-none"
            style={{ aspectRatio: '16/9' }}
          />
        </div>
      );
    }

    if (provider === 'vimeo') {
      const videoId = getVimeoId(videoUrl);
      if (!videoId) return null;

      return (
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            src={`https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&loop=1&background=1`}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] min-w-full min-h-full pointer-events-none"
            style={{ aspectRatio: '16/9' }}
          />
        </div>
      );
    }

    // Uploaded video with autoplay, muted, loop
    return (
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay={autoplay}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  };

  return (
    <section className={`py-8 sm:py-12 md:py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Video Container - Full Width with Rounded Edges */}
        <div className="relative aspect-[16/9] lg:aspect-[21/9] bg-gray-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
          {/* Video */}
          {renderVideo()}

          {/* Video Info Overlay - Bottom left */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
            <div className="max-w-2xl">
              <h2 className="text-white font-bold text-lg sm:text-xl md:text-2xl mb-1">
                {title}
              </h2>
              {subtitle && (
                <p className="text-white/80 text-sm sm:text-base">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
