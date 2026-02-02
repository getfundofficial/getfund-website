import { X } from 'lucide-react';
import { useEffect } from 'react';

interface GalleryItem {
  name: string;
  title: string;
  image: string;
  dateRange?: string;
}

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  image?: string;
  type: 'individual' | 'group' | 'gallery';
  galleryItems?: GalleryItem[];
}

export default function TeamMemberModal({ isOpen, onClose, title, content, image, type, galleryItems }: TeamMemberModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className="relative bg-white/95 backdrop-blur-md rounded-xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-gray-700 transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Individual Profile Layout */}
        {type === 'individual' && (
          <div className="flex flex-col md:flex-row">
            {/* Image Side */}
            {image && (
              <div className="md:w-2/5 bg-gray-100">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-64 md:h-full object-cover object-top"
                />
              </div>
            )}
            {/* Content Side */}
            <div className="flex-1 p-8 md:p-10 overflow-y-auto max-h-[60vh] md:max-h-[85vh]">
              <h2 id="modal-title" className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {title}
              </h2>
              <div
                className="text-gray-600 leading-relaxed prose prose-sm max-w-none prose-ul:list-none prose-ul:pl-0 prose-li:pl-0"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        )}

        {/* Group Layout (Board of Directors) */}
        {type === 'group' && (
          <div className="overflow-y-auto max-h-[85vh]">
            {/* Header with Image */}
            {image && (
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <h2 id="modal-title" className="absolute bottom-6 left-8 right-8 text-3xl md:text-4xl font-bold text-white">
                  {title}
                </h2>
              </div>
            )}
            {/* Content */}
            <div className="p-8 md:p-10">
              {!image && (
                <h2 id="modal-title" className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  {title}
                </h2>
              )}
              <div
                className="text-gray-600 leading-relaxed prose max-w-none prose-ul:list-none prose-ul:pl-0 prose-li:pl-0"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        )}

        {/* Gallery Layout (Past Administrators) */}
        {type === 'gallery' && (
          <div className="overflow-y-auto max-h-[85vh]">
            {/* Header */}
            <div className="p-8 pb-4 border-b border-gray-100">
              <h2 id="modal-title" className="text-2xl md:text-3xl font-bold text-gray-900">
                {title}
              </h2>
              <div
                className="text-gray-600 mt-2"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>

            {/* Gallery Grid */}
            {galleryItems && galleryItems.length > 0 && (
              <div className="p-8 pt-6 grid grid-cols-2 md:grid-cols-3 gap-5">
                {galleryItems.map((item, index) => (
                  <div key={index} className="group">
                    <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-top transition-transform duration-300 scale-105 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>
                    <div className="pt-3">
                      <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.title}</p>
                      {item.dateRange && (
                        <p className="text-xs text-getfund-primary font-medium mt-1">{item.dateRange}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        /* Remove all native list styling */
        .prose ul,
        .prose ol {
          list-style: none !important;
          padding-left: 0 !important;
          margin-left: 0 !important;
        }

        .prose li {
          padding-left: 0 !important;
          margin-left: 0 !important;
        }

        .prose li::before,
        .prose li::marker {
          display: none !important;
          content: none !important;
        }
      `}</style>
    </div>
  );
}
