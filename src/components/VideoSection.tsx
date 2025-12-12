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
    <section className={`py-16 sm:py-20 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Video Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
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

                {/* Video Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-semibold text-lg sm:text-xl">
                    {title}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
