import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoSectionProps {
  title?: string;
  subtitle?: string;
  videoUrl?: string; // YouTube URL or uploaded video URL
  thumbnailUrl?: string; // For uploaded videos
  provider?: 'youtube' | 'vimeo' | 'upload';
  className?: string;
}

export default function VideoSection({
  title = 'See Our Impact in Action',
  subtitle = 'Watch how GETFund is transforming education across Ghana',
  videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Default placeholder
  thumbnailUrl,
  provider = 'youtube',
  className = '',
}: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

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

      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      );
    }

    if (provider === 'vimeo') {
      const videoId = getVimeoId(videoUrl);
      if (!videoId) return null;

      return (
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?autoplay=1`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      );
    }

    // Uploaded video
    return (
      <video
        src={videoUrl}
        controls
        autoPlay
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  };

  const renderThumbnail = () => {
    if (provider === 'youtube') {
      const videoId = getYouTubeId(videoUrl);
      const thumb = thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      return thumb;
    }
    return thumbnailUrl || '/images/video-placeholder.jpg';
  };

  return (
    <section className={`py-12 sm:py-16 md:py-20 bg-white ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Video Container - Immersive Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="relative aspect-[16/9] md:aspect-[21/9] lg:h-[550px] bg-gray-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
            {isPlaying ? (
              renderVideo()
            ) : (
              <>
                {/* Thumbnail */}
                <img
                  src={renderThumbnail()}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  {/* Play Button */}
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="group relative w-20 h-20 sm:w-24 sm:h-24 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl"
                    aria-label="Play video"
                  >
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 text-getfund-primary ml-1" fill="currentColor" />

                    {/* Pulse animation */}
                    <span className="absolute inset-0 rounded-full bg-white/50 animate-ping opacity-75" />
                  </button>
                </div>

                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <div className="max-w-2xl">
                    <h2 className="text-white font-bold text-xl sm:text-2xl md:text-3xl mb-2">
                      {title}
                    </h2>
                    {subtitle && (
                      <p className="text-white/80 text-sm sm:text-base md:text-lg">
                        {subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
