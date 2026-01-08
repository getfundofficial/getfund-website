import { useState } from 'react';

export default function LoadingScreen() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="relative w-40 h-40 mx-auto">
          {!imageError ? (
            <img
              src="/images/logos/getfund-cropped-icon.png"
              alt="Loading"
              className="w-full h-full object-contain animate-spin-slow"
              onError={() => setImageError(true)}
              loading="eager"
            />
          ) : (
            <img
              src="/images/logos/getfund-logo.png"
              alt="Loading"
              className="w-full h-full object-contain animate-spin-slow"
              loading="eager"
            />
          )}
        </div>
      </div>
    </div>
  );
}
