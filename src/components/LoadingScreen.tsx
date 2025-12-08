import { useState } from 'react';

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = 'Loading content...' }: LoadingScreenProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="relative w-40 h-40 mx-auto mb-8">
          {!imageError ? (
            <img
              src="/images/logos/getfund-cropped-icon.png"
              alt="GETFund Logo"
              className="w-full h-full object-contain animate-spin-slow"
              onError={() => {
                console.error('Failed to load cropped icon, trying main logo');
                setImageError(true);
              }}
              loading="eager"
            />
          ) : (
            <img
              src="/images/logos/getfund-logo.png"
              alt="GETFund Logo"
              className="w-full h-full object-contain animate-spin-slow"
              loading="eager"
            />
          )}
        </div>
        <p className="text-gray-700 text-xl font-semibold">{message}</p>
      </div>
    </div>
  );
}
