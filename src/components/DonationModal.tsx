import { X, Heart, Info, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  amount: number;
  description: string;
}

export default function DonationModal({ isOpen, onClose, title, amount, description }: DonationModalProps) {
  const [donationAmount, setDonationAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  if (!isOpen) return null;

  // Quick amount selection buttons
  const quickAmounts = [50, 100, 250, 500, 1000];

  const handleQuickAmount = (value: number) => {
    setDonationAmount(value.toString());
  };

  const handleDonate = () => {
    if (!donationAmount || !paymentMethod) {
      alert('Please enter an amount and select a payment method');
      return;
    }
    console.log('Donation:', { amount: donationAmount, method: paymentMethod });
    onClose();
  };

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

        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-6 h-6 text-red-500" />
          <h3 className="text-xl font-bold text-gray-900">Donate to Campaign</h3>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Support "{title}" with your donation.
        </p>

        {/* Quick Amount Selection */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Quick Amount Selection
          </label>
          <div className="grid grid-cols-3 gap-2">
            {quickAmounts.map((value) => (
              <button
                key={value}
                onClick={() => handleQuickAmount(value)}
                className={`py-2 px-4 rounded-lg border-2 font-medium transition-all ${
                  donationAmount === value.toString()
                    ? 'border-getfund-primary bg-green-50 text-getfund-primary'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                GH₵{value}
              </button>
            ))}
          </div>
        </div>

        {/* Donation Amount Input */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Donation Amount (GHS)
          </label>
          <input
            type="number"
            placeholder="Enter amount"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-getfund-primary transition-colors"
          />
        </div>

        {/* Payment Method Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Payment Method
          </label>
          <div className="relative">
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-3 border-2 border-red-400 rounded-lg text-gray-700 appearance-none bg-white focus:outline-none focus:border-red-500 transition-colors cursor-pointer"
            >
              <option value="">Select payment method</option>
              <option value="mobile-money">Mobile Money</option>
              <option value="credit-card">Credit/Debit Card</option>
              <option value="bank-transfer">Bank Transfer</option>
              <option value="paypal">PayPal</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Information Notice */}
        <div className="flex gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
          <Info className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600">
            Your donation will be processed securely. A receipt will be generated upon successful payment.
          </p>
        </div>

        {/* Donate Button */}
        <button
          onClick={handleDonate}
          className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Heart className="w-5 h-5" />
          Donate GHS {donationAmount || '0'}
        </button>
      </div>
    </div>
  );
}
