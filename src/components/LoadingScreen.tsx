interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = 'Loading content...' }: LoadingScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="relative w-40 h-40 mx-auto mb-8">
          <img
            src="/images/logos/getfund-cropped-icon.png"
            alt="GETFund Logo"
            className="w-full h-full object-contain animate-spin-slow"
            onError={(e) => {
              console.error('Failed to load logo:', e);
              e.currentTarget.src = '/images/logos/getfund-logo.png';
            }}
          />
        </div>
        <p className="text-gray-700 text-xl font-semibold">{message}</p>
      </div>
    </div>
  );
}
