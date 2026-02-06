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
  const [donorName, setDonorName] = useState<string>('');
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
        donorName: donorType === 'Corporate' ? companyName || 'Anonymous Organization' : donorName || 'Anonymous Donor',
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
        className="px-5 py-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #2a3f75 0%, #1e3a5f 100%)' }}
      >
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white">
            Make a Donation
          </h3>
          <p className="text-white/70 text-sm mt-1">Your generosity transforms lives</p>
        </div>
        {/* Decorative circles */}
        <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/5" />
        <div className="absolute -right-8 top-8 w-16 h-16 rounded-full bg-white/5" />
      </div>

      <form onSubmit={handleSubmit} className="p-5">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        {/* Vertical Layout for compact card */}
        <div className="space-y-4">
          {/* All fields in single column */}
          <div className="space-y-4">
            {/* Frequency Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Giving Frequency
              </label>
              <div className="grid grid-cols-5 gap-1 bg-gray-100 rounded-xl p-1">
                {frequencyOptions.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFrequency(value)}
                    className={`py-2 px-1 rounded-lg font-medium transition-all text-xs ${
                      frequency === value
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    aria-pressed={frequency === value}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
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
                    className={`py-2.5 px-2 rounded-xl font-bold text-sm transition-all ${
                      amount === amt
                        ? 'text-white shadow-md'
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
                  className={`py-2.5 px-2 rounded-xl font-bold text-sm transition-all ${
                    amount === 'other'
                      ? 'text-white shadow-md'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                  style={amount === 'other' ? { backgroundColor: '#2a3f75' } : {}}
                  aria-pressed={amount === 'other'}
                >
                  Any Amount
                </button>
              </div>
              {amount === 'other' && (
                <div className="mt-2">
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
                      className="w-full pl-14 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-[#2a3f75] focus:ring-0 text-base font-bold text-gray-800"
                      placeholder="Enter amount"
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Payment Method
              </label>
              <div className="flex gap-2">
                {paymentOptions.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPaymentMethod(value)}
                    className={`flex-1 py-2 px-2 rounded-xl font-medium transition-all flex items-center justify-center gap-1.5 text-xs ${
                      paymentMethod === value
                        ? 'bg-amber-50 border-2 border-amber-400 text-amber-700'
                        : 'bg-gray-50 border-2 border-transparent text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Donor Type & Name in row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="donorType" className="block text-sm font-semibold text-gray-800 mb-2">
                  Donating as
                </label>
                <select
                  id="donorType"
                  value={donorType}
                  onChange={(e) => setDonorType(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:border-[#2a3f75] focus:ring-0 bg-white font-medium text-gray-700 text-sm"
                >
                  <option value="Individual">Individual</option>
                  <option value="Corporate">Corporate</option>
                  <option value="GETFund Beneficiary">Beneficiary</option>
                </select>
              </div>
              <div>
                <label htmlFor="donorName" className="block text-sm font-semibold text-gray-800 mb-2">
                  {donorType === 'Corporate' ? 'Company' : 'Name'} <span className="text-gray-400 font-normal">(opt)</span>
                </label>
                <input
                  type="text"
                  id="donorName"
                  value={donorType === 'Corporate' ? companyName : donorName}
                  onChange={(e) => donorType === 'Corporate' ? setCompanyName(e.target.value) : setDonorName(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:border-[#2a3f75] focus:ring-0 font-medium text-gray-700 text-sm"
                  placeholder={donorType === 'Corporate' ? 'Company' : 'Your name'}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                Email <span className="text-gray-400 font-normal">(optional, for receipt)</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:border-[#2a3f75] focus:ring-0 font-medium text-gray-700 text-sm"
                placeholder="your@email.com"
              />
            </div>
          </div>
        </div>

        {/* Amount Display & Submit */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between gap-4">
            <div className="rounded-xl p-3 flex-1" style={{ backgroundColor: 'rgba(42, 63, 117, 0.05)' }}>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Total</span>
                <span className="text-xl font-bold" style={{ color: '#2a3f75' }}>{getDisplayAmount()}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 rounded-xl font-bold text-base transition-all shadow-md hover:shadow-lg hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              style={{ backgroundColor: '#f59e0b', color: '#1e3a5f' }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>...</span>
                </>
              ) : (
                'Donate'
              )}
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 pt-3">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-xs text-gray-500">SSL Encrypted • Secure</span>
          </div>
        </div>
      </form>
    </div>
  );
}
