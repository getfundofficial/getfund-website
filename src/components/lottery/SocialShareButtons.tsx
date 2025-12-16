import React from 'react';
import { Facebook, Linkedin, Share2 } from 'lucide-react';

// Custom X (Twitter) icon
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Custom WhatsApp icon
const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.007-.372-.009-.571-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.366.71.306 1.263.489 1.695.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.007-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.546 20.2a.5.5 0 0 0 .64.64l3.032-.892A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
  </svg>
);

interface SocialShareButtonsProps {
  shareText: string;
  shareUrl?: string;
  hashtags?: string;
  vertical?: boolean;
}

export const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  shareText,
  shareUrl = typeof window !== 'undefined' ? window.location.href : '',
  hashtags = 'GETFund,EducationGhana',
  vertical = false,
}) => {
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);
  const hashtagArray = hashtags.split(',').map(h => h.trim());

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'GETFund Scholarship Lottery',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    }
  };

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      color: 'bg-[#1877F2] hover:bg-[#166FE5]',
    },
    {
      name: 'X (Twitter)',
      icon: XIcon,
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=${hashtagArray.join(',')}`,
      color: 'bg-black hover:bg-gray-800',
    },
    {
      name: 'WhatsApp',
      icon: WhatsappIcon,
      url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      color: 'bg-[#25D366] hover:bg-[#20BD5A]',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'bg-[#0A66C2] hover:bg-[#095196]',
    },
  ];

  if (vertical) {
    return (
      <div className="flex flex-col items-center gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} text-white p-2.5 rounded-full transition-all duration-200 hover:scale-110 shadow-md`}
            aria-label={`Share on ${link.name}`}
            title={`Share on ${link.name}`}
          >
            <link.icon className="w-5 h-5" />
          </a>
        ))}

        {/* Native share button (mobile) */}
        {typeof navigator !== 'undefined' && navigator.share && (
          <button
            onClick={handleNativeShare}
            className="bg-getfund-primary hover:bg-green-700 text-white p-2.5 rounded-full transition-all duration-200 hover:scale-110 shadow-md"
            aria-label="Share"
            title="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-sm font-medium text-gray-600">Share this lottery:</span>
      <div className="flex gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} text-white p-2.5 rounded-full transition-all duration-200 hover:scale-110 shadow-md`}
            aria-label={`Share on ${link.name}`}
            title={`Share on ${link.name}`}
          >
            <link.icon className="w-5 h-5" />
          </a>
        ))}

        {/* Native share button (mobile) */}
        {typeof navigator !== 'undefined' && navigator.share && (
          <button
            onClick={handleNativeShare}
            className="bg-getfund-primary hover:bg-green-700 text-white p-2.5 rounded-full transition-all duration-200 hover:scale-110 shadow-md"
            aria-label="Share"
            title="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SocialShareButtons;
