import { X } from 'lucide-react';
import { useEffect } from 'react';

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  image?: string;
  type: 'individual' | 'group';
}

export default function TeamMemberModal({ isOpen, onClose, title, content, image, type }: TeamMemberModalProps) {
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
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-12">
          {image && (
            <div className="mb-8 flex justify-center">
              <img
                src={image}
                alt={title}
                className="w-auto max-h-96 shadow-lg object-contain"
              />
            </div>
          )}

          <div className={`${type === 'individual' ? 'bg-gray-900' : 'bg-getfund-primary'} text-white px-6 py-4 rounded-t-lg mb-6`}>
            <h2 id="modal-title" className="text-2xl md:text-3xl font-bold">
              {title}
            </h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <div
              className="text-gray-700 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
