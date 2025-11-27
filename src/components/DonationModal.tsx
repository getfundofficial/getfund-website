import { X } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  amount: number;
  description: string;
}

export default function DonationModal({ isOpen, onClose, title, amount, description }: DonationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        
        <div className="bg-gradient-to-r from-getfund-primary to-blue-700 text-white rounded-lg p-6 mb-4 text-center">
          <p className="text-sm uppercase tracking-wide mb-2">Suggested Donation</p>
          <p className="text-4xl font-bold">GH₵ {amount.toLocaleString()}</p>
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>

        <div className="space-y-3">
          <button
            onClick={() => {
              // Handle donation action
              onClose();
            }}
            className="w-full bg-getfund-gold hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Donate GH₵ {amount.toLocaleString()}
          </button>
          
          <button
            onClick={onClose}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-colors"
          >
            Choose Different Amount
          </button>
        </div>
      </div>
    </div>
  );
}
