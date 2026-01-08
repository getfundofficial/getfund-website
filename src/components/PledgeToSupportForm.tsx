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
      <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ${className}`}>
        {/* Header */}
        <div className="px-6 py-5" style={{ backgroundColor: '#2a3f75' }}>
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <HeartHandshake className="w-6 h-6" />
            Pledge Your Support
          </h3>
          <p className="text-white/80 text-sm mt-1">Promise to give, we'll follow up</p>
        </div>

        <div className="p-6">
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ backgroundColor: 'rgba(42, 63, 117, 0.1)' }}>
              <svg className="w-10 h-10" style={{ color: '#2a3f75' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
              Your pledge to support has been submitted successfully. Our team will contact you soon.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="px-8 py-3 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg"
              style={{ backgroundColor: '#1e3a5f', boxShadow: '0 10px 15px -3px rgba(30, 58, 95, 0.3)' }}
            >
              Submit Another Pledge
            </button>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-100 mt-4">
            <Shield className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">Secure & Encrypted</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-6 py-5" style={{ backgroundColor: '#2a3f75' }}>
        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
          <HeartHandshake className="w-6 h-6" />
          Pledge Your Support
        </h3>
        <p className="text-white/80 text-sm mt-1">Promise to give, we'll follow up</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="first_name" className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="first_name"
              value={formData.first_name}
              onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 transition-all font-medium"
              style={{ '--tw-ring-color': '#2a3f75' } as React.CSSProperties}
              placeholder="John"
              required
            />
          </div>
          <div>
            <label htmlFor="last_name" className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="last_name"
              value={formData.last_name}
              onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 transition-all font-medium"
              style={{ '--tw-ring-color': '#2a3f75' } as React.CSSProperties}
              placeholder="Doe"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" />
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 transition-all font-medium"
            style={{ '--tw-ring-color': '#2a3f75' } as React.CSSProperties}
            placeholder="john.doe@example.com"
            required
          />
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-400" />
            Country <span className="text-red-500">*</span>
          </label>
          <select
            id="country"
            value={formData.country}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 bg-white transition-all cursor-pointer font-medium"
            style={{ '--tw-ring-color': '#2a3f75' } as React.CSSProperties}
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
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400" />
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <select
              value={formData.phone_country_code}
              onChange={(e) => setFormData(prev => ({ ...prev, phone_country_code: e.target.value }))}
              className="w-24 px-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 bg-white text-sm font-medium"
              style={{ '--tw-ring-color': '#2a3f75' } as React.CSSProperties}
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
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 transition-all font-medium"
              style={{ '--tw-ring-color': '#2a3f75' } as React.CSSProperties}
              placeholder="XX XXX XXXX"
              required
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            Address <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 transition-all font-medium"
            style={{ '--tw-ring-color': '#2a3f75' } as React.CSSProperties}
            placeholder="Your address"
          />
        </div>

        {/* Donation Description */}
        <div>
          <label htmlFor="donation_description" className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400" />
            How would you like to help? <span className="text-red-500">*</span>
          </label>
          <textarea
            id="donation_description"
            value={formData.donation_description}
            onChange={(e) => setFormData(prev => ({ ...prev, donation_description: e.target.value }))}
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 transition-all font-medium resize-none"
            style={{ '--tw-ring-color': '#2a3f75' } as React.CSSProperties}
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
          className="w-full text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
          style={{ backgroundColor: '#1e3a5f', boxShadow: '0 10px 15px -3px rgba(30, 58, 95, 0.3)' }}
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

        {/* Trust Badge */}
        <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-100 mt-2">
          <Shield className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-500">Secure & Encrypted</span>
        </div>
      </form>
    </div>
  );
}
