import { useState } from 'react';
import { HeartHandshake, Shield, User, Mail, Phone, MapPin, FileText, Globe } from 'lucide-react';

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
      <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden ${className}`}>
        {/* Header with gradient */}
        <div
          className="px-5 py-4 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #2a3f75 0%, #1e3a5f 100%)' }}
        >
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white">
              Pledge Your Support
            </h3>
            <p className="text-white/70 text-sm mt-1">Promise to give, we'll follow up</p>
          </div>
          <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/5" />
          <div className="absolute -right-8 top-8 w-16 h-16 rounded-full bg-white/5" />
        </div>

        <div className="p-5">
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg" style={{ backgroundColor: 'rgba(42, 63, 117, 0.1)' }}>
              <svg className="w-8 h-8" style={{ color: '#2a3f75' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Your pledge has been submitted. We'll contact you soon.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md hover:scale-105"
              style={{ backgroundColor: '#f59e0b', color: '#1e3a5f' }}
            >
              Submit Another
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 pt-3">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-xs text-gray-500">SSL Encrypted • Secure</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden ${className}`}>
      {/* Header with gradient */}
      <div
        className="px-5 py-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #2a3f75 0%, #1e3a5f 100%)' }}
      >
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white">
            Pledge Your Support
          </h3>
          <p className="text-white/70 text-sm mt-1">Promise to give, we'll follow up</p>
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

        {/* Vertical Layout */}
        <div className="space-y-4">
          {/* Name Fields Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="first_name" className="block text-sm font-semibold text-gray-800 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="first_name"
                value={formData.first_name}
                onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:border-[#2a3f75] focus:ring-0 font-medium text-gray-700 text-sm"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-semibold text-gray-800 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="last_name"
                value={formData.last_name}
                onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:border-[#2a3f75] focus:ring-0 font-medium text-gray-700 text-sm"
                placeholder="Doe"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:border-[#2a3f75] focus:ring-0 font-medium text-gray-700 text-sm"
              placeholder="john.doe@example.com"
              required
            />
          </div>

          {/* Country & Phone Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="country" className="block text-sm font-semibold text-gray-800 mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                id="country"
                value={formData.country}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:border-[#2a3f75] focus:ring-0 bg-white font-medium text-gray-700 text-sm"
                required
              >
                {COUNTRY_DATA.map(country => (
                  <option key={country.flag} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.phone_country_code}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone_country_code: e.target.value }))}
                  className="w-20 px-2 py-2.5 border border-gray-200 rounded-xl focus:border-[#2a3f75] focus:ring-0 bg-white text-sm font-medium text-gray-700"
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
                  className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl focus:border-[#2a3f75] focus:ring-0 font-medium text-gray-700 text-sm"
                  placeholder="XX XXX XXXX"
                  required
                />
              </div>
            </div>
          </div>

          {/* How to Help */}
          <div>
            <label htmlFor="donation_description" className="block text-sm font-semibold text-gray-800 mb-2">
              How would you like to help? <span className="text-red-500">*</span>
            </label>
            <textarea
              id="donation_description"
              value={formData.donation_description}
              onChange={(e) => setFormData(prev => ({ ...prev, donation_description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:border-[#2a3f75] focus:ring-0 font-medium text-gray-700 text-sm resize-none"
              placeholder="Describe how you would like to support GETFund..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.donation_description.length}/10 min chars
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
          <p className="text-xs text-gray-500 flex-1">
            We'll follow up to discuss your support options.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 rounded-xl font-bold text-base transition-all shadow-md hover:shadow-lg hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            style={{ backgroundColor: '#f59e0b', color: '#1e3a5f' }}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>...</span>
              </>
            ) : (
              'Submit'
            )}
          </button>
        </div>

        {/* Trust Badge */}
        <div className="flex items-center justify-center gap-2 pt-3">
          <Shield className="w-4 h-4 text-green-600" />
          <span className="text-xs text-gray-500">SSL Encrypted • Secure</span>
        </div>
      </form>
    </div>
  );
}
