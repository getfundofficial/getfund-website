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
      className={`group bg-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100 hover:border-transparent hover:-translate-y-1 ${className}`}
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'rgba(42, 63, 117, 0.1)' }}>
        <Icon className="w-7 h-7" style={{ color: '#2a3f75' }} />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#2a3f75] transition-colors">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-5">{description}</p>
      </div>

      <button
        onClick={handleClick}
        className="w-full text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        style={{ backgroundColor: '#1e3a5f' }}
        aria-label={buttonText}
      >
        {buttonText}
      </button>
    </div>
  );
}
