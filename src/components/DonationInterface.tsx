import { useState } from 'react';
import { Heart, RefreshCw, Calendar, Shield, Loader2 } from 'lucide-react';
import { paymentService } from '../services/paymentService';

interface DonationInterfaceProps {
  className?: string;
}

export default function DonationInterface({ className = '' }: DonationInterfaceProps) {
  const [frequency, setFrequency] = useState<'one-time' | 'monthly' | 'yearly'>('one-time');
  const [amount, setAmount] = useState<number | 'other'>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorType, setDonorType] = useState<string>('Individual');
  const [email, setEmail] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('mobile-money');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const getFinalAmount = (): number => {
    if (amount === 'other') {
      return parseFloat(customAmount.replace(/,/g, '')) || 0;
    }
    return amount;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const finalAmount = getFinalAmount();

    // Validation
    if (finalAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await paymentService.initiatePayment({
        amount: finalAmount,
        currency: 'GHS',
        paymentMethod,
        customerEmail: email,
        campaignTitle: 'General Donation',
        donorName: donorType,
      });

      if (response.success && response.data?.paymentUrl) {
        // Redirect to Xcel payment gateway
        window.location.href = response.data.paymentUrl;
      } else {
        setError(response.error || 'Failed to initiate payment. Please try again.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const frequencyOptions = [
    { value: 'one-time', label: 'One-time', icon: Heart },
    { value: 'monthly', label: 'Monthly', icon: RefreshCw },
    { value: 'yearly', label: 'Yearly', icon: Calendar },
  ] as const;

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-4 py-3" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}>
        <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: '#1e3a5f' }}>
          <Heart className="w-4 h-4" />
          Make a Donation
        </h3>
        <p className="text-xs mt-0.5 text-gray-600">Your generosity transforms lives</p>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-3">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Frequency Selection */}
        <div>
          <label className="block text-xs font-semibold text-gray-800 mb-2">
            How often would you like to give?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {frequencyOptions.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setFrequency(value)}
                className={`relative py-2 px-2 rounded-lg font-medium transition-all duration-200 flex flex-col items-center gap-1 text-sm ${
                  frequency === value
                    ? 'text-white shadow-lg scale-[1.02]'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
                style={frequency === value ? { backgroundColor: '#2a3f75', boxShadow: '0 10px 15px -3px rgba(42, 63, 117, 0.3)' } : {}}
                aria-pressed={frequency === value}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Selection */}
        <div>
          <label className="block text-xs font-semibold text-gray-800 mb-2">
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
                className={`py-2 px-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
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
              className={`py-2 px-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
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
            <label htmlFor="customAmount" className="block text-xs font-semibold text-gray-800 mb-1">
              Enter your amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm">GH₵</span>
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
                className="w-full pl-12 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 transition-all text-base font-medium"
                style={{ '--tw-ring-color': '#2a3f75' } as React.CSSProperties}
                placeholder="0"
                required
                aria-required="true"
              />
            </div>
          </div>
        )}

        {/* Donor Type */}
        <div>
          <label htmlFor="donorType" className="block text-xs font-semibold text-gray-800 mb-1">
            I am donating as
          </label>
          <select
            id="donorType"
            value={donorType}
            onChange={(e) => setDonorType(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 bg-white transition-all cursor-pointer font-medium text-gray-700 text-sm"
            style={{ '--tw-ring-color': '#2a3f75' } as React.CSSProperties}
            aria-label="Select donor type"
          >
            <option value="Individual">An Individual</option>
            <option value="Corporate">A Corporation / Organization</option>
            <option value="GETFund Beneficiary">A GETFund Beneficiary</option>
          </select>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-gray-800 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 transition-all font-medium text-gray-700 text-sm"
            style={{ '--tw-ring-color': '#2a3f75' } as React.CSSProperties}
            placeholder="your@email.com"
            required
          />
        </div>

        {/* Payment Method */}
        <div>
          <label htmlFor="paymentMethod" className="block text-xs font-semibold text-gray-800 mb-1">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 bg-white transition-all cursor-pointer font-medium text-gray-700 text-sm"
            style={{ '--tw-ring-color': '#2a3f75' } as React.CSSProperties}
          >
            <option value="mobile-money">Mobile Money</option>
            <option value="credit-card">Credit/Debit Card</option>
            <option value="bank-transfer">Bank Transfer</option>
          </select>
        </div>

        {/* Amount Display & Submit */}
        <div className="pt-1">
          <div className="bg-gray-50 rounded-lg p-3 mb-3 border border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Your donation</span>
              <span className="text-xl font-bold" style={{ color: '#2a3f75' }}>{getDisplayAmount()}</span>
            </div>
            {frequency !== 'one-time' && (
              <p className="text-xs text-gray-500 mt-1">
                Billed {frequency === 'monthly' ? 'every month' : 'once a year'}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg font-bold text-base transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 bg-amber-500/60 hover:bg-amber-500/80"
            style={{ color: '#1e3a5f' }}
            aria-label="Proceed to donation"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              'Donate Now'
            )}
          </button>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 pt-3 border-t border-gray-100 mt-3">
            <Shield className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">Secure & Encrypted</span>
          </div>
        </div>
      </form>
    </div>
  );
}
