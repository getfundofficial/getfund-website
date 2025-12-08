interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = 'Loading content...' }: LoadingScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <img
            src="/images/logos/getfund-cropped-icon.png"
            alt="GETFund Logo"
            className="w-full h-full object-contain animate-spin-slow"
          />
        </div>
        <p className="text-gray-600 text-lg font-medium">{message}</p>
      </div>
    </div>
  );
}
