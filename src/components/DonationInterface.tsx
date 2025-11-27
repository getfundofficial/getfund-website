import { useState } from 'react';

interface DonationInterfaceProps {
  className?: string;
}

export default function DonationInterface({ className = '' }: DonationInterfaceProps) {
  const [frequency, setFrequency] = useState<'one-time' | 'monthly' | 'yearly'>('one-time');
  const [amount, setAmount] = useState<number | 'other'>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorType, setDonorType] = useState<string>('Individual');

  const amounts = [50, 100, 200, 500];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for donation submission logic
    console.log('Donation submission:', {
      frequency,
      amount: amount === 'other' ? customAmount : amount,
      donorType,
    });
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">I would like to donate...</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Frequency Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Frequency</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setFrequency('one-time')}
              className={`py-3 px-4 rounded-md font-medium transition-colors ${
                frequency === 'one-time'
                  ? 'bg-getfund-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-pressed={frequency === 'one-time'}
            >
              One-time
            </button>
            <button
              type="button"
              onClick={() => setFrequency('monthly')}
              className={`py-3 px-4 rounded-md font-medium transition-colors ${
                frequency === 'monthly'
                  ? 'bg-getfund-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-pressed={frequency === 'monthly'}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setFrequency('yearly')}
              className={`py-3 px-4 rounded-md font-medium transition-colors ${
                frequency === 'yearly'
                  ? 'bg-getfund-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-pressed={frequency === 'yearly'}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Amount Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Donation amounts</label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {amounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => {
                  setAmount(amt);
                  setCustomAmount('');
                }}
                className={`py-3 px-4 rounded-md font-medium transition-colors ${
                  amount === amt
                    ? 'bg-getfund-gold text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-pressed={amount === amt}
              >
                GH₵{amt}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setAmount('other')}
              className={`py-3 px-4 rounded-md font-medium transition-colors ${
                amount === 'other'
                  ? 'bg-getfund-gold text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-pressed={amount === 'other'}
            >
              Other
            </button>
          </div>
        </div>

        {/* Custom Amount Input */}
        {amount === 'other' && (
          <div>
            <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-2">
              Enter amount (GH₵)
            </label>
            <input
              type="number"
              id="customAmount"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-getfund-primary focus:border-transparent"
              placeholder="Enter amount"
              min="1"
              required
              aria-required="true"
            />
          </div>
        )}

        {/* Donor Type Dropdown */}
        <div>
          <label htmlFor="donorType" className="block text-sm font-medium text-gray-700 mb-2">
            Donor type
          </label>
          <select
            id="donorType"
            value={donorType}
            onChange={(e) => setDonorType(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-getfund-primary focus:border-transparent bg-white"
            aria-label="Select donor type"
          >
            <option value="Individual">Individual</option>
            <option value="Corporate">Corporate</option>
            <option value="GETFund Beneficiary">GETFund Beneficiary</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-getfund-red text-white py-4 rounded-md font-semibold hover:bg-red-700 transition-colors focus:ring-4 focus:ring-red-300"
          aria-label="Proceed to donation"
        >
          Donate Now
        </button>
      </form>
    </div>
  );
}
