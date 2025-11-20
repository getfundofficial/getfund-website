/**
 * Video Section Renderer
 * Displays embedded video (YouTube, Vimeo) or video player
 */

import { PageSection } from '../../../services/cmsApi';

interface VideoSectionProps {
  section: PageSection;
}

export default function VideoSection({ section }: VideoSectionProps) {
  const { url, provider = 'youtube', thumbnail, caption } = section.content;

  const getEmbedUrl = () => {
    if (provider === 'youtube') {
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    } else if (provider === 'vimeo') {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
    }
    return url;
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {section.title && (
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
              {section.title}
            </h2>
          )}

          <div className="aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
            {provider === 'upload' ? (
              <video
                src={url}
                controls
                poster={thumbnail}
                className="w-full h-full"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                src={getEmbedUrl()}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          {caption && (
            <p className="text-center text-gray-600 mt-4">
              {caption}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
