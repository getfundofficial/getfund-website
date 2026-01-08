import { useState, useEffect } from 'react';
import { X, Phone, Mail, MapPin } from 'lucide-react';

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://getfund-cms-backend.vercel.app/api';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: '+233 30 266 4061',
    email: 'info@getfund.gov.gh',
    address: 'GETFund House, Accra',
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/fundraising-contact`);
        if (response.ok) {
          const data = await response.json();
          if (data.phone || data.email || data.address) {
            setContactInfo({
              phone: data.phone || contactInfo.phone,
              email: data.email || contactInfo.email,
              address: data.address || contactInfo.address,
            });
          }
        }
      } catch (error) {
        console.error('Failed to fetch contact info:', error);
      }
    };

    fetchContactInfo();
  }, []);

  // Format phone for tel: link (remove spaces and special chars)
  const phoneLink = contactInfo.phone.replace(/[\s-()]/g, '');

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50">
      {/* Expanded Contact Panel */}
      {isOpen && (
        <div className="absolute right-40 top-1/2 -translate-y-1/2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden animate-scale-in">
          <div className="bg-gradient-to-r from-getfund-primary to-green-600 p-4">
            <h3 className="text-white font-semibold text-lg">Get in Touch</h3>
            <p className="text-green-100 text-sm">We're here to help</p>
          </div>
          <div className="p-4 space-y-3">
            <a
              href={`tel:${phoneLink}`}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors group"
            >
              <div className="w-10 h-10 bg-getfund-primary/10 rounded-full flex items-center justify-center group-hover:bg-getfund-primary/20 transition-colors">
                <Phone className="w-5 h-5 text-getfund-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Call Us</p>
                <p className="text-xs text-gray-500">{contactInfo.phone}</p>
              </div>
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors group"
            >
              <div className="w-10 h-10 bg-getfund-gold/10 rounded-full flex items-center justify-center group-hover:bg-getfund-gold/20 transition-colors">
                <Mail className="w-5 h-5 text-getfund-gold" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Email Us</p>
                <p className="text-xs text-gray-500">{contactInfo.email}</p>
              </div>
            </a>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors group"
            >
              <div className="w-10 h-10 bg-teal-500/10 rounded-full flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
                <MapPin className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Visit Us</p>
                <p className="text-xs text-gray-500">{contactInfo.address}</p>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Floating Glass Circle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-36 h-36 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group ${
          isOpen ? '' : ''
        }`}
        aria-label={isOpen ? 'Close contact panel' : 'Open contact panel'}
      >
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-getfund-primary to-green-500 opacity-80 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-300"></div>

        {/* Glass effect background */}
        <div className={`absolute inset-1 rounded-full backdrop-blur-md border border-white/30 shadow-2xl transition-all duration-300 ${
          isOpen
            ? 'bg-gray-800/90'
            : 'bg-white/20'
        }`}></div>

        {/* Inner gradient ring */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-getfund-primary to-green-600 opacity-90"></div>

        {/* Content */}
        <div className="relative z-10">
          {isOpen ? (
            <X className="w-10 h-10 text-white drop-shadow-lg" />
          ) : (
            <div className="text-center">
              <span className="text-white font-bold text-base leading-tight drop-shadow-lg block">
                GET IN TOUCH
              </span>
              <span className="text-white font-semibold text-sm leading-tight drop-shadow block mt-0.5">
                WITH
              </span>
              <span className="text-white font-bold text-base leading-tight drop-shadow-lg block">
                FUNDRAISING!
              </span>
            </div>
          )}
        </div>

      </button>
    </div>
  );
}
