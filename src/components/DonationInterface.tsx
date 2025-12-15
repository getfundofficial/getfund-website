import { useState } from 'react';
import { Heart, RefreshCw, Calendar, Shield } from 'lucide-react';

interface DonationInterfaceProps {
  className?: string;
}

export default function DonationInterface({ className = '' }: DonationInterfaceProps) {
  const [frequency, setFrequency] = useState<'one-time' | 'monthly' | 'yearly'>('one-time');
  const [amount, setAmount] = useState<number | 'other'>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorType, setDonorType] = useState<string>('Individual');

  const amounts = [50, 100, 200, 500, 1000];

  const formatNumberWithCommas = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const getDisplayAmount = () => {
    if (amount === 'other') {
      return customAmount ? `GH₵${customAmount}` : 'GH₵0';
    }
    return `GH₵${formatNumberWithCommas(amount)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Donation submission:', {
      frequency,
      amount: amount === 'other' ? customAmount : amount,
      donorType,
    });
  };

  const frequencyOptions = [
    { value: 'one-time', label: 'One-time', icon: Heart },
    { value: 'monthly', label: 'Monthly', icon: RefreshCw },
    { value: 'yearly', label: 'Yearly', icon: Calendar },
  ] as const;

  return (
    <div className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-getfund-primary to-getfund-green px-6 py-5">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
          <Heart className="w-6 h-6" />
          Make a Donation
        </h3>
        <p className="text-white/80 text-sm mt-1">Your generosity transforms lives</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Frequency Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            How often would you like to give?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {frequencyOptions.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setFrequency(value)}
                className={`relative py-3 px-3 rounded-xl font-medium transition-all duration-200 flex flex-col items-center gap-1 ${
                  frequency === value
                    ? 'bg-getfund-primary text-white shadow-lg shadow-getfund-primary/30 scale-[1.02]'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-getfund-primary/30'
                }`}
                aria-pressed={frequency === value}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Select an amount
          </label>
          <div className="grid grid-cols-3 gap-2">
            {amounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => {
                  setAmount(amt);
                  setCustomAmount('');
                }}
                className={`py-3 px-3 rounded-xl font-semibold transition-all duration-200 ${
                  amount === amt
                    ? 'bg-getfund-gold text-white shadow-lg shadow-getfund-gold/30 scale-[1.02]'
                    : 'bg-white text-gray-700 hover:bg-getfund-gold/10 border border-gray-200 hover:border-getfund-gold/50'
                }`}
                aria-pressed={amount === amt}
              >
                GH₵{formatNumberWithCommas(amt)}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setAmount('other')}
              className={`py-3 px-3 rounded-xl font-semibold transition-all duration-200 ${
                amount === 'other'
                  ? 'bg-getfund-gold text-white shadow-lg shadow-getfund-gold/30 scale-[1.02]'
                  : 'bg-white text-gray-700 hover:bg-getfund-gold/10 border border-gray-200 hover:border-getfund-gold/50'
              }`}
              aria-pressed={amount === 'other'}
            >
              Other
            </button>
          </div>
        </div>

        {/* Custom Amount Input */}
        {amount === 'other' && (
          <div className="animate-fadeIn">
            <label htmlFor="customAmount" className="block text-sm font-semibold text-gray-800 mb-2">
              Enter your amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">GH₵</span>
              <input
                type="text"
                id="customAmount"
                value={customAmount}
                onChange={(e) => {
                  const value = e.target.value.replace(/,/g, '');
                  if (value === '' || /^\d+$/.test(value)) {
                    const formatted = value === '' ? '' : formatNumberWithCommas(parseInt(value));
                    setCustomAmount(formatted);
                  }
                }}
                className="w-full pl-14 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-getfund-primary focus:border-getfund-primary transition-all text-lg font-medium"
                placeholder="0"
                required
                aria-required="true"
              />
            </div>
          </div>
        )}

        {/* Donor Type */}
        <div>
          <label htmlFor="donorType" className="block text-sm font-semibold text-gray-800 mb-2">
            I am donating as
          </label>
          <select
            id="donorType"
            value={donorType}
            onChange={(e) => setDonorType(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-getfund-primary focus:border-getfund-primary bg-white transition-all cursor-pointer font-medium text-gray-700"
            aria-label="Select donor type"
          >
            <option value="Individual">An Individual</option>
            <option value="Corporate">A Corporation / Organization</option>
            <option value="GETFund Beneficiary">A GETFund Beneficiary</option>
          </select>
        </div>

        {/* Amount Display & Submit */}
        <div className="pt-2">
          <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Your donation</span>
              <span className="text-2xl font-bold text-getfund-primary">{getDisplayAmount()}</span>
            </div>
            {frequency !== 'one-time' && (
              <p className="text-sm text-gray-500 mt-1">
                Billed {frequency === 'monthly' ? 'every month' : 'once a year'}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-getfund-red to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:scale-[1.01] active:scale-[0.99]"
            aria-label="Proceed to donation"
          >
            Donate Now
          </button>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-100 mt-4">
            <Shield className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">Secure & Encrypted</span>
          </div>
        </div>
      </form>
    </div>
  );
}
