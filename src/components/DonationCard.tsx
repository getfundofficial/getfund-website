import { Building2, GraduationCap, Utensils, Armchair, BookOpen, Monitor, Droplets, Heart } from 'lucide-react';

interface DonationCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonAction?: () => void;
  className?: string;
}

// Map titles to icons
const getIconForTitle = (title: string) => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('classroom') && titleLower.includes('construction')) return Building2;
  if (titleLower.includes('scholarship')) return GraduationCap;
  if (titleLower.includes('meal')) return Utensils;
  if (titleLower.includes('furniture')) return Armchair;
  if (titleLower.includes('learning material')) return BookOpen;
  if (titleLower.includes('ict') || titleLower.includes('digital')) return Monitor;
  if (titleLower.includes('sanitation') || titleLower.includes('water')) return Droplets;
  return Heart;
};

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
      console.log('Donation action:', title);
    }
  };

  const Icon = getIconForTitle(title);

  return (
    <div
      className={`group bg-white rounded-xl p-4 hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 hover:border-transparent hover:-translate-y-1 ${className}`}
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'rgba(42, 63, 117, 0.1)' }}>
        <Icon className="w-5 h-5" style={{ color: '#2a3f75' }} />
      </div>

      <div className="flex-1">
        <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#2a3f75] transition-colors">{title}</h3>
        <p className="text-gray-600 text-xs leading-relaxed mb-3">{description}</p>
      </div>

      <button
        onClick={handleClick}
        className="w-full py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        style={{ backgroundColor: '#f59e0b', color: '#1e3a5f' }}
        aria-label={buttonText}
      >
        {buttonText}
      </button>
    </div>
  );
}
