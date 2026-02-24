import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface AnnouncementBannerProps {
  title?: string;
  message: string;
  storageKey?: string;
}

export default function AnnouncementBanner({
  title = 'IMPORTANT NOTICE',
  message,
  storageKey = 'announcement-banner-dismissed',
}: AnnouncementBannerProps) {
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem(storageKey) === 'true';
  });

  if (dismissed) return null;

  const handleDismiss = () => {
    localStorage.setItem(storageKey, 'true');
    setDismissed(true);
  };

  return (
    <section className="bg-red-50 border-b-2 border-red-300">
      <div className="container mx-auto px-4 max-w-6xl py-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-bold text-red-800 text-lg mb-1">{title}</h3>
            <p className="text-red-700 leading-relaxed">{message}</p>
          </div>
          <button
            onClick={handleDismiss}
            className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0 p-1"
            aria-label="Dismiss announcement"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
