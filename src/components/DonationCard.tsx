interface DonationCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonAction?: () => void;
  className?: string;
}

export default function DonationCard({
  title,
  description,
  buttonText,
  buttonAction,
  className = '',
}: DonationCardProps) {
  const handleClick = () => {
    if (buttonAction) {
      buttonAction();
    } else {
      // Placeholder action - scroll to donation interface or navigate
      console.log('Donation action:', title);
    }
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-200 flex flex-col h-full hover:border-getfund-gold/30 ${className}`}
    >
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-700 leading-relaxed mb-6">{description}</p>
      </div>
      <button
        onClick={handleClick}
        className="w-full bg-getfund-gold text-white py-3 px-6 rounded-xl font-semibold hover:bg-yellow-600 transition-all duration-200 focus:ring-4 focus:ring-yellow-300 hover:shadow-lg hover:shadow-yellow-500/20"
        aria-label={buttonText}
      >
        {buttonText}
      </button>
    </div>
  );
}
