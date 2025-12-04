import { X, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { paymentService } from '../services/paymentService';

interface PresetAmount {
  value: number;
  label: string;
}

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  amount: number;
  description: string;
  presetAmounts?: PresetAmount[];
}

export default function DonationModal({ isOpen, onClose, title, amount, description, presetAmounts: customPresetAmounts }: DonationModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | 'other'>(amount);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [showNoteField, setShowNoteField] = useState(false);
  const [showHonorField, setShowHonorField] = useState(false);
  const [note, setNote] = useState('');
  const [honorName, setHonorName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  // Use custom preset amounts from CMS, or fall back to default calculated amounts
  const presetAmounts = customPresetAmounts && customPresetAmounts.length === 3
    ? customPresetAmounts
    : [
        { value: Math.floor(amount / 2), label: `Buy a girl 1 year's supply of pads` },
        { value: amount, label: `Buy 2 girls 1 year's supply of pads` },
        { value: Math.floor(amount * 1.5), label: `Buy 3 girls 1 year's supply of pads` }
      ];

  const getFinalAmount = (): number => {
    if (selectedAmount === 'other') {
      return parseFloat(customAmount) || 0;
    }
    return selectedAmount;
  };

  const handleDonate = async () => {
    setError('');

    const finalAmount = getFinalAmount();

    // Validate
    if (!finalAmount || finalAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (!customerEmail) {
      setError('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    const validation = paymentService.validateAmount(finalAmount, 'GHS');
    if (!validation.valid) {
      setError(validation.error || 'Invalid amount');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await paymentService.initiatePayment({
        amount: finalAmount,
        currency: 'GHS',
        paymentMethod: 'mobile-money',
        customerEmail,
        customerPhone: '',
        campaignTitle: title,
        donorName: honorName || undefined,
      });

      if (response.success && response.data?.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      } else {
        const errorMsg = response.error || 'Payment initialization failed. Please try again.';
        setError(errorMsg);
        setIsProcessing(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsProcessing(false);
      console.error('Payment error:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900">Choose amount</h3>
          </div>

          {/* Preset Amounts */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {presetAmounts.map((preset, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedAmount(preset.value);
                  setError('');
                }}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  selectedAmount === preset.value
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-bold text-gray-900 mb-1 text-sm">GH₵{preset.value}</div>
                <div className="text-xs text-gray-600 leading-tight">{preset.label}</div>
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="mb-4">
            <button
              onClick={() => setSelectedAmount('other')}
              className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                selectedAmount === 'other'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">GH₵ Other</span>
                <span className="text-sm text-gray-500">GHS</span>
              </div>
            </button>

            {selectedAmount === 'other' && (
              <input
                type="number"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setError('');
                }}
                className="w-full mt-2 px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-green-500"
                autoFocus
              />
            )}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={customerEmail}
              onChange={(e) => {
                setCustomerEmail(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-green-500"
              disabled={isProcessing}
              required
            />
          </div>

          {/* Add Note/Comment */}
          <div className="mb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showNoteField}
                onChange={(e) => setShowNoteField(e.target.checked)}
                className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700 flex items-center gap-1">
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Add note/comment
              </span>
            </label>
            {showNoteField && (
              <textarea
                placeholder="Enter comment for Kenya Education Fund..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                className="w-full mt-2 px-3 py-2 border-2 border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-500"
              />
            )}
          </div>

          {/* Give in Honor/Memory */}
          <div className="mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showHonorField}
                onChange={(e) => setShowHonorField(e.target.checked)}
                className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">Give in honor/memory</span>
            </label>
            {showHonorField && (
              <input
                type="text"
                placeholder="Name of person"
                value={honorName}
                onChange={(e) => setHonorName(e.target.value)}
                className="w-full mt-2 px-3 py-2 border-2 border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-500"
              />
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Continue Button */}
          <button
            onClick={handleDonate}
            disabled={isProcessing || !customerEmail}
            className="w-full bg-orange-400 hover:bg-orange-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              'Continue'
            )}
          </button>

          {/* Powered by Givebutter */}
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Powered by Givebutter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
