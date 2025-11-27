import { X, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  amount: number;
  description: string;
}

export default function DonationModal({ isOpen, onClose, title, amount, description }: DonationModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(amount);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [addNote, setAddNote] = useState(false);
  const [addHonor, setAddHonor] = useState(false);

  if (!isOpen) return null;

  // Preset amounts based on suggested amount
  const presetAmounts = [
    { value: Math.round(amount * 0.2), label: `GH₵${Math.round(amount * 0.2).toLocaleString()}` },
    { value: Math.round(amount * 0.5), label: `GH₵${Math.round(amount * 0.5).toLocaleString()}` },
    { value: amount, label: `GH₵${amount.toLocaleString()}`, highlighted: true },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-bold text-gray-900">Choose amount</h3>
        </div>

        <p className="text-sm text-gray-600 mb-6">{description}</p>

        {/* Preset Amount Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {presetAmounts.map((preset) => (
            <button
              key={preset.value}
              onClick={() => {
                setSelectedAmount(preset.value);
                setCustomAmount('');
              }}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedAmount === preset.value && !customAmount
                  ? 'border-getfund-primary bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-bold text-lg text-gray-900">{preset.label}</div>
              <div className="text-xs text-gray-600 mt-1">{title}</div>
            </button>
          ))}
        </div>

        {/* Custom Amount Input */}
        <div className="mb-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
              GH₵
            </span>
            <input
              type="number"
              placeholder="Other"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                if (e.target.value) {
                  setSelectedAmount(parseFloat(e.target.value) || 0);
                }
              }}
              className="w-full pl-14 pr-20 py-3 border-2 border-orange-300 rounded-lg text-gray-900 font-medium focus:outline-none focus:border-orange-400"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
              GHC
            </span>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3 mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={addNote}
              onChange={(e) => setAddNote(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Add note/comment</span>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={addHonor}
              onChange={(e) => setAddHonor(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Give in honor/memory</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => {
              // Handle mobile money payment
              console.log('Mobile Money payment:', selectedAmount);
              onClose();
            }}
            className="w-full bg-getfund-gold hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Pay with Mobile Money - GH₵{selectedAmount.toLocaleString()}
          </button>
          
          <button
            onClick={() => {
              // Handle other payment methods
              console.log('Other payment:', selectedAmount);
              onClose();
            }}
            className="w-full bg-getfund-primary hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Continue
          </button>
        </div>

        {/* Powered by text */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">Secure payment processing</p>
        </div>
      </div>
    </div>
  );
}
