import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://getfund-cms-backend.vercel.app/api';

interface PledgeToSupportFormProps {
  className?: string;
}

// Country data with codes
const COUNTRY_DATA = [
  { name: 'Ghana', code: '+233', flag: 'GH' },
  { name: 'Nigeria', code: '+234', flag: 'NG' },
  { name: 'United States', code: '+1', flag: 'US' },
  { name: 'United Kingdom', code: '+44', flag: 'GB' },
  { name: 'South Africa', code: '+27', flag: 'ZA' },
  { name: 'Kenya', code: '+254', flag: 'KE' },
  { name: 'Germany', code: '+49', flag: 'DE' },
  { name: 'Canada', code: '+1', flag: 'CA' },
  { name: 'France', code: '+33', flag: 'FR' },
  { name: 'Netherlands', code: '+31', flag: 'NL' },
  { name: 'Australia', code: '+61', flag: 'AU' },
  { name: 'India', code: '+91', flag: 'IN' },
  { name: 'China', code: '+86', flag: 'CN' },
  { name: 'Japan', code: '+81', flag: 'JP' },
  { name: 'Brazil', code: '+55', flag: 'BR' },
  { name: 'Italy', code: '+39', flag: 'IT' },
  { name: 'Spain', code: '+34', flag: 'ES' },
  { name: 'United Arab Emirates', code: '+971', flag: 'AE' },
  { name: 'Saudi Arabia', code: '+966', flag: 'SA' },
  { name: 'Egypt', code: '+20', flag: 'EG' },
];

export default function PledgeToSupportForm({ className = '' }: PledgeToSupportFormProps) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_country_code: '+233',
    phone_number: '',
    country: 'Ghana',
    donation_description: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleCountryChange = (countryName: string) => {
    const country = COUNTRY_DATA.find(c => c.name === countryName);
    setFormData(prev => ({
      ...prev,
      country: countryName,
      phone_country_code: country?.code || prev.phone_country_code
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Basic validation
    if (!formData.first_name || !formData.last_name || !formData.email ||
        !formData.phone_number || !formData.country || !formData.donation_description) {
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    // Phone validation
    if (formData.phone_number.length < 5) {
      setError('Phone number must be at least 5 digits');
      setIsSubmitting(false);
      return;
    }

    // Description validation
    if (formData.donation_description.length < 10) {
      setError('Donation description must be at least 10 characters');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/pledges`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone_country_code: '+233',
          phone_number: '',
          country: 'Ghana',
          donation_description: '',
          address: ''
        });
      } else {
        setError(data.error || 'Failed to submit pledge. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting pledge:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            Your pledge to support has been submitted successfully. We will contact you soon.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="px-6 py-2 bg-getfund-primary text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Submit Another Pledge
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Pledge to Support</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="first_name"
              value={formData.first_name}
              onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-getfund-primary focus:border-transparent"
              placeholder="John"
              required
            />
          </div>
          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="last_name"
              value={formData.last_name}
              onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-getfund-primary focus:border-transparent"
              placeholder="Doe"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-getfund-primary focus:border-transparent"
            placeholder="john.doe@example.com"
            required
          />
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country <span className="text-red-500">*</span>
          </label>
          <select
            id="country"
            value={formData.country}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-getfund-primary focus:border-transparent bg-white"
            required
          >
            {COUNTRY_DATA.map(country => (
              <option key={country.flag} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* Phone with Country Code */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <select
              value={formData.phone_country_code}
              onChange={(e) => setFormData(prev => ({ ...prev, phone_country_code: e.target.value }))}
              className="w-24 px-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-getfund-primary focus:border-transparent bg-white text-sm"
            >
              {COUNTRY_DATA.map(country => (
                <option key={`${country.flag}-code`} value={country.code}>
                  {country.code}
                </option>
              ))}
            </select>
            <input
              type="tel"
              id="phone"
              value={formData.phone_number}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setFormData(prev => ({ ...prev, phone_number: value }));
              }}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-getfund-primary focus:border-transparent"
              placeholder="XX XXX XXXX"
              required
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-getfund-primary focus:border-transparent"
            placeholder="Your address (optional)"
          />
        </div>

        {/* Donation Description */}
        <div>
          <label htmlFor="donation_description" className="block text-sm font-medium text-gray-700 mb-1">
            Donation Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="donation_description"
            value={formData.donation_description}
            onChange={(e) => setFormData(prev => ({ ...prev, donation_description: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-getfund-primary focus:border-transparent"
            placeholder="Describe how you would like to support GETFund..."
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.donation_description.length}/10 minimum characters
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-getfund-primary text-white py-3 rounded-md font-semibold hover:bg-green-700 transition-colors focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            'Submit Pledge'
          )}
        </button>
      </form>
    </div>
  );
}
