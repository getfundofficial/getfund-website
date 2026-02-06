import { useState } from 'react';
import { Heart, RefreshCw, Calendar, Shield, Loader2, CreditCard, Smartphone, Building2 } from 'lucide-react';
import { paymentService } from '../services/paymentService';

interface DonationInterfaceProps {
  className?: string;
}

export default function DonationInterface({ className = '' }: DonationInterfaceProps) {
  const [frequency, setFrequency] = useState<'one-time' | 'daily' | 'weekly' | 'monthly' | 'yearly'>('one-time');
  const [amount, setAmount] = useState<number | 'other'>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorType, setDonorType] = useState<string>('Individual');
  const [companyName, setCompanyName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [donationReason, setDonationReason] = useState<string>('');
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

    // Email is optional - only validate if provided
    if (email && !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await paymentService.initiatePayment({
        amount: finalAmount,
        currency: 'GHS',
        paymentMethod,
        customerEmail: email || 'anonymous@donor.com',
        campaignTitle: 'General Donation',
        donorName: donorType === 'Corporate' ? companyName || 'Anonymous Organization' : donorType,
        donorCategory: donorType as 'Individual' | 'Corporate' | 'GETFund Beneficiary',
        donationType: 'general',
        donationFrequency: frequency,
        donationReason: donationReason || undefined,
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
    { value: 'daily', label: 'Daily', icon: RefreshCw },
    { value: 'weekly', label: 'Weekly', icon: RefreshCw },
    { value: 'monthly', label: 'Monthly', icon: RefreshCw },
    { value: 'yearly', label: 'Yearly', icon: Calendar },
  ] as const;

  const paymentOptions = [
    { value: 'mobile-money', label: 'Mobile Money', icon: Smartphone },
    { value: 'credit-card', label: 'Card', icon: CreditCard },
    { value: 'bank-transfer', label: 'Bank', icon: Building2 },
  ];

  return (
    <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden ${className}`}>
      {/* Header with gradient */}
      <div
        className="px-6 py-5 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #2a3f75 0%, #1e3a5f 100%)' }}
      >
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            Make a Donation
          </h3>
          <p className="text-white/70 text-sm mt-1">Your generosity transforms lives</p>
        </div>
        {/* Decorative circles */}
        <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/5" />
        <div className="absolute -right-8 top-8 w-16 h-16 rounded-full bg-white/5" />
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Frequency Selection - Pill Style */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Giving Frequency
          </label>
          <div className="grid grid-cols-5 gap-1 bg-gray-100 rounded-xl p-1">
            {frequencyOptions.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setFrequency(value)}
                className={`py-2.5 px-1 rounded-lg font-medium transition-all duration-300 flex flex-col items-center justify-center gap-1 text-xs ${
                  frequency === value
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                aria-pressed={frequency === value}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Selection - Modern Grid */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Select Amount
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
                className={`py-3 px-2 rounded-xl font-bold text-sm transition-all duration-300 ${
                  amount === amt
                    ? 'text-white shadow-lg scale-[1.02]'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
                style={amount === amt ? { backgroundColor: '#2a3f75' } : {}}
                aria-pressed={amount === amt}
              >
                GH₵{formatNumberWithCommas(amt)}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setAmount('other')}
              className={`py-3 px-2 rounded-xl font-bold text-sm transition-all duration-300 ${
                amount === 'other'
                  ? 'text-white shadow-lg scale-[1.02]'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
              style={amount === 'other' ? { backgroundColor: '#2a3f75' } : {}}
              aria-pressed={amount === 'other'}
            >
              Custom
            </button>
          </div>
        </div>

        {/* Custom Amount Input */}
        {amount === 'other' && (
          <div className="animate-fadeIn">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">GH₵</span>
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
                className="w-full pl-14 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2a3f75] focus:ring-0 transition-all text-lg font-bold text-gray-800"
                placeholder="Enter amount"
                required
                aria-required="true"
              />
            </div>
          </div>
        )}

        {/* Donor Type - Compact */}
        <div>
          <label htmlFor="donorType" className="block text-sm font-semibold text-gray-800 mb-2">
            Donating as
          </label>
          <select
            id="donorType"
            value={donorType}
            onChange={(e) => setDonorType(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2a3f75] focus:ring-0 bg-white transition-all cursor-pointer font-medium text-gray-700 text-sm"
            aria-label="Select donor type"
          >
            <option value="Individual">An Individual</option>
            <option value="Corporate">A Corporation / Organization</option>
            <option value="GETFund Beneficiary">A GETFund Beneficiary</option>
          </select>
        </div>

        {/* Company Name - Shows when Corporate is selected */}
        {donorType === 'Corporate' && (
          <div className="animate-fadeIn">
            <label htmlFor="companyName" className="block text-sm font-semibold text-gray-800 mb-2">
              Company / Organization Name
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2a3f75] focus:ring-0 transition-all font-medium text-gray-700 text-sm"
              placeholder="Enter your company or organization name"
            />
          </div>
        )}

        {/* Email - Optional */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
            Email Address <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2a3f75] focus:ring-0 transition-all font-medium text-gray-700 text-sm"
            placeholder="For donation receipt"
          />
        </div>

        {/* Donation Reason - Optional */}
        <div>
          <label htmlFor="donationReason" className="block text-sm font-semibold text-gray-800 mb-2">
            Why are you donating? <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="donationReason"
            value={donationReason}
            onChange={(e) => setDonationReason(e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2a3f75] focus:ring-0 transition-all font-medium text-gray-700 text-sm resize-none"
            placeholder="e.g., In memory of..., To support education in my community..."
          />
        </div>

        {/* Payment Method - Icon Pills */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-3">
            Payment Method
          </label>
          <div className="flex gap-2">
            {paymentOptions.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setPaymentMethod(value)}
                className={`flex-1 py-3 px-2 rounded-xl font-medium transition-all duration-300 flex flex-col items-center gap-1 text-xs ${
                  paymentMethod === value
                    ? 'bg-amber-50 border-2 border-amber-400 text-amber-700'
                    : 'bg-gray-50 border-2 border-transparent text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Display & Submit */}
        <div className="pt-2">
          <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: 'rgba(42, 63, 117, 0.05)' }}>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm font-medium">Your donation</span>
              <span className="text-2xl font-bold" style={{ color: '#2a3f75' }}>{getDisplayAmount()}</span>
            </div>
            {frequency !== 'one-time' && (
              <p className="text-xs text-gray-500 mt-1">
                Billed {frequency === 'daily' ? 'every day' : frequency === 'weekly' ? 'every week' : frequency === 'monthly' ? 'every month' : 'once a year'}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            style={{ backgroundColor: '#f59e0b', color: '#1e3a5f' }}
            aria-label="Proceed to donation"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Heart className="w-5 h-5" />
                Donate Now
              </>
            )}
          </button>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-xs text-gray-500">256-bit SSL Encrypted • Secure Payment</span>
          </div>
        </div>
      </form>
    </div>
  );
}
